import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.css";

import alex from "../../assets/imgs/alex.png";

import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import NannySearchPanel from "../../components/NannySearchPanel/NannySearchPanel";

import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../../firebase";

// Translation map for days
const daysTranslation = {
  "Δευτέρα": "Monday",
  "Τρίτη": "Tuesday",
  "Τετάρτη": "Wednesday",
  "Πέμπτη": "Thursday",
  "Παρασκευή": "Friday",
  "Σάββατο": "Saturday",
  "Κυριακή": "Sunday"
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get('city');
  
  // Load saved filters from sessionStorage or use defaults
  const getSavedFilters = () => {
    try {
      const saved = sessionStorage.getItem('searchPageFilters');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const savedFilters = getSavedFilters();

  const [experience, setExperience] = useState(savedFilters?.experience ?? 0);
  const [collaborations, setCollaborations] = useState(savedFilters?.collaborations ?? 0);

  const [employment, setEmployment] = useState(savedFilters?.employment ?? "any"); // "any" | "full" | "part"
  const [serviceArea, setServiceArea] = useState(cityParam ?? savedFilters?.serviceArea ?? "");
  const [childAge, setChildAge] = useState(savedFilters?.childAge ?? "");
  const [workingDays, setWorkingDays] = useState(savedFilters?.workingDays ?? []); // Empty by default
  const [education, setEducation] = useState(savedFilters?.education ?? "any");
  const [transport, setTransport] = useState(savedFilters?.transport ?? "any");
  const [hosting, setHosting] = useState(savedFilters?.hosting ?? false);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState(savedFilters?.sortBy ?? "relevance"); // "relevance" | "rating" | "experience" | "newest"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nannySchedules, setNannySchedules] = useState({}); // Store schedules for all nannies

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const dataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(dataArray);
        setFilteredData(dataArray);

        // Fetch schedules for all nannies
        const schedules = {};
        for (const nanny of dataArray) {
          try {
            const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny.id}/schedule`));
            if (!scheduleSnapshot.empty) {
              const scheduleData = scheduleSnapshot.docs[0].data();
              schedules[nanny.id] = scheduleData;
            }
          } catch (scheduleError) {
            console.error(`Error fetching schedule for nanny ${nanny.id}:`, scheduleError);
          }
        }
        setNannySchedules(schedules);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  // Apply filters automatically when data is loaded and there's a city parameter or saved filters
  useEffect(() => {
    if (!loading && data.length > 0 && (cityParam || savedFilters)) {
      applyFilters();
    }
  }, [loading, data, serviceArea]);

  // Save filters to sessionStorage whenever they change
  useEffect(() => {
    const filters = {
      experience,
      collaborations,
      employment,
      serviceArea,
      childAge,
      workingDays,
      education,
      transport,
      hosting,
      sortBy
    };
    sessionStorage.setItem('searchPageFilters', JSON.stringify(filters));
  }, [experience, collaborations, employment, serviceArea, childAge, workingDays, education, transport, hosting, sortBy]);

  const toggleDay = (day) => {
    setWorkingDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  // Check if a nanny is available on specified days based on their schedule
  const isNannyAvailableOnDays = (nannyId, days) => {
    if (days.length === 0) return true; // No days filter applied
    
    const schedule = nannySchedules[nannyId];
    if (!schedule) return false; // No schedule data available
    
    // Check each selected day - return true if available on ANY of them (OR logic)
    for (const greekDay of days) {
      const englishDay = daysTranslation[greekDay];
      if (englishDay && schedule[englishDay]) {
        // Check if any hour slot has value of 1 (available)
        const daySchedule = schedule[englishDay];
        const hasAvailability = Object.values(daySchedule).some(value => value === 1);
        
        if (hasAvailability) return true; // Found at least one matching day
      }
    }
    
    return false; // Not available on any of the selected days
  };

  const applyFilters = () => {
    const filtered = data.filter(user => {
      // employment
      if (employment !== "any") {
        if (!user.employment || user.employment.toLowerCase() !== (employment === "full" ? "full" : "part")) return false;
      }
      // service area (substring match, case-insensitive)
      if (serviceArea.trim() !== "") {
        const area = user.work_area || user.workArea || "";
        if (!area.toLowerCase().includes(serviceArea.trim().toLowerCase())) return false;
      }
      // child age (if nanny declares can_care_ages as {min, max} or array)
      if (childAge !== "") {
        const ageNum = parseInt(childAge, 10);
        if (user.can_care_age_min != null && user.can_care_age_max != null) {
          if (ageNum < user.can_care_age_min || ageNum > user.can_care_age_max) return false;
        } else if (Array.isArray(user.can_care_ages)) {
          if (!user.can_care_ages.includes(ageNum)) return false;
        }
      }
      // working days - check schedule for availability (value = 1)
      if (workingDays.length > 0) {
        if (!isNannyAvailableOnDays(user.id, workingDays)) return false;
      }
      // education
      if (education !== "any") {
        if (!user.education || user.education.toLowerCase() !== education.toLowerCase()) return false;
      }
      // transport
      if (transport !== "any") {
        if (!user.transport || user.transport.toLowerCase() !== transport.toLowerCase()) return false;
      }
      // hosting
      if (hosting) {
        if (!user.hosting) return false;
      }

      // experience & collaborations sliders (existing)
      if (experience && Number(user.years_experience || user.experience || 0) < Number(experience)) return false;
      if (collaborations && Number(user.collaborations || 0) < Number(collaborations)) return false;

      return true;
    });

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setExperience(0);
    setCollaborations(0);
    setEmployment("any");
    setServiceArea("");
    setChildAge("");
    setWorkingDays([]);
    setEducation("any");
    setTransport("any");
    setHosting(false);
    setSortBy("relevance");
    // Clear session storage
    sessionStorage.removeItem('searchPageFilters');
    // Reset to all data
    setFilteredData(data);
  };

  // Επιστρέφει ταξινομημένα δεδομένα χωρίς να αλλάζει το original filteredData
  const getSortedData = () => {
    const items = [...filteredData];
    if (sortBy === "rating") {
      return items.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    }
    if (sortBy === "experience") {
      return items.sort((a, b) => (Number(b.years_experience || b.experience || 0)) - (Number(a.years_experience || a.experience || 0)));
    }
    // διατηρούμε επίσης "newest"
    if (sortBy === "newest") {
      return items.sort((a, b) => (b.createdAt ? b.createdAt.seconds || 0 : 0) - (a.createdAt ? a.createdAt.seconds || 0 : 0));
    }
    return items; // relevance: keep original order
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.outer_container}>
      <Header />
      <Breadcrumbs />
      <div className={styles.filters_area}>
        <div className={styles.filter_container}>
          <h1>Φίλτρα Αναζήτησης</h1>

          <div className={styles.filtersGrid}>
            <div className={styles.controlGroup}>
              <div className={styles.filter}>
                <label>Χρόνος Απασχόλησης</label>
                <div className={styles.inlineRow}>
                  <label>
                    <input type="radio" name="employment" value="any" checked={employment==="any"} onChange={() => setEmployment("any")} /> Οποιοσδήποτε
                  </label>
                  <label>
                    <input type="radio" name="employment" value="full" checked={employment==="full"} onChange={() => setEmployment("full")} /> Πλήρης
                  </label>
                  <label>
                    <input type="radio" name="employment" value="part" checked={employment==="part"} onChange={() => setEmployment("part")} /> Μερική
                  </label>
                </div>
              </div>

              <div className={styles.filter}>
                <label>Περιοχή Εξυπηρέτησης</label>
                <input type="text" placeholder="π.χ. Αθήνα" value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} />
              </div>

              <div className={styles.filter}>
                <label>Ηλικία Παιδιού(σε μήνες)</label>
                <input type="number" placeholder="Ηλικία" value={childAge} onChange={(e) => setChildAge(e.target.value)} min="0" />
              </div>

              <div className={styles.filter}>
                <label>Ημέρες Εργασίας</label>
                <div className={styles.inlineRow}>
                  {["Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο","Κυριακή"].map(d => (
                    <label key={d} style={{marginRight:6}}>
                      <input type="checkbox" checked={workingDays.includes(d)} onChange={() => toggleDay(d)} /> {d}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.filter}>
                <label>Εκπαίδευση</label>
                <select value={education} onChange={(e) => setEducation(e.target.value)}>
                  <option value="any">Οποιαδήποτε</option>
                  <option value="highschool">Λύκειο / Ισοδύναμο</option>
                  <option value="vocational">Επαγγελματική</option>
                  <option value="bachelor">Πτυχίο</option>
                  <option value="master">Μάστερ / Άνω</option>
                </select>
              </div>

              <div className={styles.filter}>
                <label>Μεταφορικό Μέσο</label>
                <select value={transport} onChange={(e) => setTransport(e.target.value)}>
                  <option value="any">Οποιοδήποτε</option>
                  <option value="car">Αυτοκίνητο</option>
                  <option value="motorbike">Μοτοσυκλέτα / Scooter</option>
                  <option value="public">Μέσα Μαζικής Μεταφοράς</option>
                  <option value="walk">Πεζή</option>
                </select>
              </div>

              <div className={styles.filter}>
                <label>Φιλοξενία</label>
                <div className={styles.inlineRow}>
                  <label>
                    <input type="checkbox" checked={hosting} onChange={(e) => setHosting(e.target.checked)} /> Προσφέρει φιλοξενία
                  </label>
                </div>
              </div>

              <div className={styles.filter}>
                <label>Έτη Εμπειρίας</label>
                <div className={styles.slider_container}>
                  <input className={styles.slider} type="range" value={experience} min="0" max="10" onChange={(e) => setExperience(e.target.value)}/>
                  <p>{experience === "10" ? "10+" : experience}</p>
                </div>
              </div>

              <div className={styles.filter}>
                <label>Συνεργασίες</label>
                <div className={styles.slider_container}>
                  <input className={styles.slider} type="range" value={collaborations} min="0" max="15" onChange={(e) => setCollaborations(e.target.value)}/>
                  <p>{collaborations === "15" ? "15+" : collaborations}</p>
                </div>
              </div>

              <button className={styles.fullWidthButton} onClick={applyFilters}>Εφαρμογή</button>
              <button className={styles.clearButton} onClick={clearFilters}>Καθαρισμός Φίλτρων</button>
            </div>
          </div>
        </div>
      </div>

      <main className={styles.search_area} aria-live="polite">
        <div className={styles.results_header}>
          <div className={styles.results_count}>{filteredData.length} αποτελέσματα</div>
          <div className={styles.sort_control}>
            <label htmlFor="sort">Ταξινόμηση:</label>
            <select id="sort" name="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sort_select}>
              <option value="relevance">Συνάφεια</option>
              <option value="rating">Βαθμολογία</option>
              <option value="experience">Εμπειρία</option>
              <option value="newest">Νεότερα</option>
            </select>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className={styles.no_results}>Δεν βρέθηκαν αποτελέσματα με αυτά τα φίλτρα.</div>
        ) : (
          <ul className={styles.results_list}>
            {getSortedData().map((user) => (
              <li key={user.id} className={styles.result_item}>
                <NannySearchPanel
                  id={user.id}
                  profile_picture={user.profileImageUrl}
                  first_name={user.first_name}
                  last_name={user.last_name}
                  work_area={user.work_area}
                  age={user.age}
                  collaborations={user.collaborations}
                  stars={user.stars}
                  half_star={false}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}