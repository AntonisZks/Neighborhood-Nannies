import styles from './CollaborationRequest.module.css';

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, setDoc, getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumb';
import Schedule from '../../components/ScheduleTable/ScheduleTable';
import { useNavigate } from "react-router-dom";

export default function CollaborationRequest() {
  var [schedule, setSchedule] = useState([]);
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [hourlyPay, setHourlyPay] = useState('');
  const navigate = useNavigate();

  
  
  const nanny_id = searchParams.get('nid');
  const step = searchParams.get('step');
  const parent_id = window.localStorage.getItem("parentID");


  useEffect(() => {
  const fetchNannyData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Nannies'));
      const nanniesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const nanny = nanniesArray.find((n) => n.id === nanny_id);
      setNanny(nanny);

      // --- Check for unfinalized declaration first ---
      const savedDeclRef = doc(firestore, `Parents/${parent_id}/unfinalized_declarations/${nanny_id}`);
      const savedDeclSnap = await getDoc(savedDeclRef);

      if (savedDeclSnap.exists()) {
        // Load saved hourly pay (if any)
        const savedData = savedDeclSnap.data();
        if (savedData.hourlyPay) setHourlyPay(savedData.hourlyPay.toString());

        // Load saved schedule
        const savedScheduleSnap = await getDocs(collection(savedDeclRef, 'schedule'));
        if (!savedScheduleSnap.empty) {
          const savedScheduleArray = savedScheduleSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedule(savedScheduleArray);
          setLoading(false);
          return; // ✅ stop here since we loaded from saved declaration
        }
      }

      // --- Fallback: check localStorage ---
      const storedSchedule = localStorage.getItem('schedule');
      if (storedSchedule) {
        setSchedule(JSON.parse(storedSchedule));
      } else if (nanny) {
        // --- Fallback: fetch from nanny schedule ---
        const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/schedule`));
        const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchedule(scheduleArray);
      }

      const storedHourlyPay = localStorage.getItem('hourlyPay');
      if (storedHourlyPay) {
        setHourlyPay(storedHourlyPay);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchNannyData();
}, []);


  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>Error: {error.message}</div>; }
  
  const handleScheduleUpdate = (updatedSchedule) => {
    schedule = updatedSchedule;
    setSchedule(schedule);
  };

  const handleNextStep = () => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    localStorage.setItem('hourlyPay', hourlyPay);
    window.location.href = `collaboration-request?step=2&nid=${nanny_id}`;
  };


  const handleSaveDeclaration = async () => {
  try {

    // Reference: Parents/{parentId}/saved_declarations/{nanny_id}
    const savedRef = doc(firestore, `Parents/${parent_id}/unfinalized_declarations/${nanny_id}`);
    
    await setDoc(savedRef, { 
      hourlyPay: parseFloat(hourlyPay),
      nanny_id: nanny_id,
      savedAt: new Date(),
    });

    const scheduleRef = collection(savedRef, 'schedule');
    await addDoc(scheduleRef, {
        Monday: schedule[0].Monday,
        Tuesday: schedule[0].Tuesday,
        Wednesday: schedule[0].Wednesday,
        Thursday: schedule[0].Thursday,
        Friday: schedule[0].Friday,
        Saturday: schedule[0].Saturday,
        Sunday: schedule[0].Sunday,
    });

    alert('Η δήλωση αποθηκεύτηκε προσωρινά.');
  } catch (error) {
    console.error('Error saving declaration:', error);
    alert('Παρουσιάστηκε σφάλμα κατά την αποθήκευση.');
  }
  navigate(`/p_dashboard?pid=${parent_id}`);
};




  const handleFinalSubmit = async () => {
  try {
    
    // Step 1: reference to nanny’s collaborationRequests subcollection
    const collabRef = doc(firestore, `Nannies/${nanny_id}/collaboration_requests/${parent_id}`);

    // Step 2: create or update a document for this parent
     await setDoc(collabRef, {
      parent_id: parent_id,
      hourlyPay: parseFloat(hourlyPay),
      createdAt: new Date(),
    });

    // Step 3: store the schedule as a subcollection under this collaboration request
    const scheduleRef = collection(collabRef, 'schedule');
    await addDoc(scheduleRef, {
        Monday: schedule[0].Monday,
        Tuesday: schedule[0].Tuesday,
        Wednesday: schedule[0].Wednesday,
        Thursday: schedule[0].Thursday,
        Friday: schedule[0].Friday,
        Saturday: schedule[0].Saturday,
        Sunday: schedule[0].Sunday,
    });

    const finalizedRef = doc(firestore, `Parents/${parent_id}/finalized_declarations/${nanny_id}`);
    await setDoc(finalizedRef, {
      nanny_id: nanny_id,
      accepted: null,
      submittedAt: new Date(),
    });

    alert('Η αίτηση συνεργασίας υποβλήθηκε με επιτυχία!');
  } catch (err) {
    console.error('Error submitting collaboration request:', err);
    alert('Παρουσιάστηκε σφάλμα κατά την υποβολή της αίτησης.');
  }
  window.localStorage.removeItem('schedule');
  window.localStorage.removeItem('hourlyPay');
  navigate(`/p_dashboard?pid=${parent_id}`);
};

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={styles.outer_container}>
        <div className={styles.inner_container}>
          {step === '1' ? (
            <>
              <h1>Αίτηση Συνεργασίας</h1>
              <div className={styles.progress_steps_container}>
                <a className={styles.current_step}>1</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.next_step} href="">2</a>
              </div>
              <h2>Επιλέξτε τις ώρες για τις οποίες επιθυμείτε να συνεργαστείτε</h2>
              <Schedule
                clickable={true}
                monday={schedule[0].Monday}
                tuesday={schedule[0].Tuesday}
                wednesday={schedule[0].Wednesday}
                thursday={schedule[0].Thursday}
                friday={schedule[0].Friday}
                saturday={schedule[0].Saturday}
                sunday={schedule[0].Sunday} 
                onScheduleUpdate={handleScheduleUpdate}
                is_parent={true}
              />
              <h2>Επιλέξτε το ωρομίσθιο</h2>
              <input 
                type="number" 
                placeholder="Ωρομίσθιο" 
                value={hourlyPay}
                onChange={(e) => setHourlyPay(e.target.value)} 
              />
              <div className={styles.buttons_container1}>
                <a onClick={handleSaveDeclaration} className={styles.save_button}>
                  <i className="fa-solid fa-download"></i>
                  Προσωρινή Αποθήκευση
                </a>
                <a onClick={handleNextStep} className={styles.next_button}>
                  Επόμενο
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </>
          ) : (
            <>
              <h1>Οριστική Υποβολή Αίτησης Συνεργασίας</h1>
              <div className={styles.progress_steps_container}>
                <a className={styles.previous_step} href={`/search/nanny-profile-overview/collaboration-request?step=1&nid=${nanny_id}`}>1</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.current_step} href="">2</a>
              </div>
              <div className={styles.main_container}>
                <div className={styles.user_data_container}>
                  <div className={styles.profile_image_name_container}>
                    <img src={nanny.profileImageUrl} alt="" width='40px' />
                    <h1>{nanny.first_name} {nanny.last_name}</h1>
                  </div>
                  <div className={styles.description_container}>
                    <h1>Σύντομη Περιγραφή</h1>
                    { nanny.experience === '' ? (
                      <p className={styles.no_description}>Δεν υπάρχει διαθέσιμη περιγραφή</p>
                     ) : (
                      <p>{nanny.experience}</p>
                    )}
                  </div>
                  <div className={styles.data_container}>
                    <h1>Χαρακτηριστικά</h1>
                    <ul>
                      <li>
                        <i className="fa-solid fa-calendar-days"></i>
                        <p><b>Ηλικία: </b>{nanny.age}</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-graduation-cap"></i>
                        <p><b>Σπουδές: </b>{nanny.education}</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-envelope"></i>
                        <p><b>Email: </b>{nanny.email}</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-phone"></i>
                        <p><b>Τηλέφωνο: </b>{nanny.phone}</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-location-dot"></i>
                        <p><b>Περιοχή Εργασίας: </b>{nanny.work_area}</p>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.payment_info_container}>
                    <h1>Πληροφορίες Πληρωμής</h1>
                    <ul>
                      <li>
                        <i className="fa-solid fa-comments-dollar"></i>
                        <p><b>Δηλωμένο ωρομίσθιο:</b> {hourlyPay ? `${hourlyPay}€` : '—'}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.schedule_container}>
                  <Schedule
                    clickable={false}
                    monday={schedule[0].Monday}
                    tuesday={schedule[0].Tuesday}
                    wednesday={schedule[0].Wednesday}
                    thursday={schedule[0].Thursday}
                    friday={schedule[0].Friday}
                    saturday={schedule[0].Saturday}
                    sunday={schedule[0].Sunday} 
                    onScheduleUpdate={handleScheduleUpdate}
                    is_parent={true}
                  />
                </div>
              </div>
              <div className={styles.buttons_container2}>
                <a href={`collaboration-request?step=1&nid=${nanny_id}`} type="submit" className={styles.previous_button}>
                  <i className="fa-solid fa-arrow-left"></i>
                  Προηγούμενο
                </a>
                <a onClick={handleFinalSubmit} className={styles.submit_button}>
                  <i className="fa-solid fa-check"></i>
                  Οριστική Υποβολή
                </a>
              </div>
            </>
          )}
          
        </div>
      </div>
    </>
  );
}