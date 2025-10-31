import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

import nanny from "../../assets/imgs/nanny_image.jpg";
import parents from "../../assets/imgs/parents_image.jpg";
import alexProfile from "../../assets/imgs/alex.png";
import jimmyProfile from "../../assets/imgs/jimmy.png";
import defaultProfile from "../../assets/imgs/default_profile_picture.jpg";
import ChatButton from "../../components/ChatPopup/ChatButton";
import ChatPopup from "../../components/ChatPopup/ChatPopup";


export default function HomePage() {
  return (
    <div className={styles.outer_container}>
      <ChatButton />
      <ChatPopup />
      <Header className={styles.header} />
      <MainSection />
      <Footer className={styles.footer} />
      <ScrollToTopButton />
    </div>
  );
}

function MainSection() {
  return (
    <>
      <div className={styles.bg_circle}></div>
      <div className={styles.main_section}>
        <div className={styles.options_container}>
          <ParentIntroductionContainer />
          <NannyIntroductionContainer />
        </div>

        <div className={styles.search_container}>
          <div className={styles.search_content}>
            <h1>Αναζήτησε νταντάδες, εύκολα και γρήγορα!</h1>
            <p className={styles.search_subtitle}>
              Βρες αξιόπιστες νταντάδες στην περιοχή σου με ασφάλεια και σιγουριά
            </p>
            <SearchBar />
          </div>
        </div>

        <FeaturesSection />
        <HowItWorksSection />
        <StatisticsSection />
        <TestimonialsSection />
        <SafetySection />
        <CallToActionSection />
        
      </div>
    </>
  );
}

function ParentIntroductionContainer() {
  const navigate = useNavigate();

  return (
    <div className={styles.parent_container}>
      <img className={styles.parent_image} src={parents} alt="" />
      <h1 className={styles.title}>Ψάχνεις νταντά για το παιδί σου;</h1>
      <p className={styles.description}>
        Βρες την ιδανική νταντά για τα παιδιά σου! Η πλατφόρμα μας σου προσφέρει
        πρόσβαση σε αξιόπιστους επαγγελματίες με εμπειρία στη φροντίδα παιδιών.
        Αναζήτησε εύκολα και γρήγορα, βασισμένος στις ανάγκες της οικογένειάς
        σου.
      </p>
      <button onClick={() => navigate('/search')} className={styles.search_nannies_button}>
        <div className={styles.button_content}>
          <p>Αναζήτησε Τώρα</p>
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </div>
      </button>
    </div>
  );
}

function NannyIntroductionContainer() {
  const navigate = useNavigate();

  return (
    <div className={styles.nanny_container}>
      <img className={styles.nanny_image} src={nanny} alt="" />
      <h1 className={styles.title}>Επιθυμείς να εργαστείς ως νταντά;</h1>
      <p className={styles.description}>
        Δημιούργησε το προφίλ σου και βρες οικογένειες που χρειάζονται την
        υποστήριξή σου! Είτε έχεις εμπειρία ως νταντά είτε μόλις ξεκινάς, η
        πλατφόρμα μας σου δίνει τη δυνατότητα να επιλέξεις ευέλικτες συνεργασίες
        και να κάνεις τη διαφορά στη ζωή μιας οικογένειας.
      </p>
      <button onClick={() => navigate('/caretaker-registration?step=1')} className={styles.create_profile_button}>
        <div className={styles.button_content}>
          <p>Δημιούργησε Προφίλ</p>
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </div>
      </button>
    </div>
  );
}

function SearchBar() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    // Navigate to search page with city parameter if provided
    if (searchLocation.trim()) {
      navigate(`/search?city=${encodeURIComponent(searchLocation.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.search_bar}>
      <div className={styles.search_input_group}>
        <div className={styles.search_input}>
          <i className="fa-solid fa-location-dot"></i>
          <input 
            type="text" 
            placeholder="Περιοχή (π.χ. Αθήνα, Θεσσαλονίκη)"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button className={styles.search_button} onClick={handleSearch}>
          <i className="fa-solid fa-search"></i>
          ΑΝΑΖΗΤΗΣΗ
        </button>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "fa-solid fa-shield-halved",
      title: "Ασφαλής Πλατφόρμα",
      description: "Όλες οι νταντάδες περνούν από αυστηρούς ελέγχους και επαληθεύσεις για την ασφάλεια των παιδιών σας."
    },
    {
      icon: "fa-solid fa-search",
      title: "Εύκολη Αναζήτηση",
      description: "Βρείτε την ιδανική νταντά με βάση την τοποθεσία, διαθεσιμότητα και εξειδίκευση που χρειάζεστε."
    },
    {
      icon: "fa-solid fa-comments",
      title: "Άμεση Επικοινωνία",
      description: "Επικοινωνήστε απευθείας με τις νταντάδες μέσω της πλατφόρμας μας με ασφαλή τρόπο."
    },
    {
      icon: "fa-solid fa-star",
      title: "Αξιολογήσεις & Κριτικές",
      description: "Διαβάστε πραγματικές αξιολογήσεις από άλλους γονείς για να κάνετε την καλύτερη επιλογή."
    },
    {
      icon: "fa-solid fa-clock",
      title: "Ευέλικτες Ώρες",
      description: "Βρείτε νταντάδες που ταιριάζουν στο πρόγραμμά σας, από λίγες ώρες έως πλήρη απασχόληση."
    },
    {
      icon: "fa-solid fa-credit-card",
      title: "Ασφαλής Πληρωμή",
      description: "Πληρώστε με ασφάλεια μέσω της πλατφόρμας μας με προστασία για όλα τα μέρη."
    }
  ];

  return (
    <section className={styles.features_section}>
      <div className={styles.container}>
        <h2>Γιατί να Επιλέξετε την υπηρεσία μας;</h2>
        <p className={styles.section_subtitle}>
          Προσφέρουμε την πιο ασφαλή και αξιόπιστη πλατφόρμα για την εύρεση νταντάδων
        </p>
        <div className={styles.features_grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature_card}>
              <div className={styles.feature_icon}>
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Δημιουργήστε Λογαριασμό",
      description: "Εγγραφείτε δωρεάν και δημιουργήστε το προφίλ σας σε λίγα λεπτά.",
      icon: "fa-solid fa-user-plus"
    },
    {
      number: "2", 
      title: "Αναζητήστε Νταντάδες",
      description: "Χρησιμοποιήστε τα φίλτρα μας για να βρείτε τις καλύτερες επιλογές.",
      icon: "fa-solid fa-search"
    },
    {
      number: "3",
      title: "Επικοινωνήστε",
      description: "Στείλτε μήνυμα και κανονίστε συνάντηση με τις υποψήφιες νταντάδες.",
      icon: "fa-solid fa-comments"
    },
    {
      number: "4",
      title: "Ξεκινήστε τη Συνεργασία",
      description: "Επιλέξτε την ιδανική νταντά και ξεκινήστε μια ασφαλή συνεργασία.",
      icon: "fa-solid fa-handshake"
    }
  ];

  return (
    <section className={styles.how_it_works_section}>
      <div className={styles.container}>
        <h2>Πώς Λειτουργεί;</h2>
        <p className={styles.section_subtitle}>
          Απλά βήματα για να βρείτε την ιδανική νταντά για την οικογένειά σας
        </p>
        <div className={styles.steps_container}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={styles.step_card}>
                <div className={styles.step_number}>{step.number}</div>
                <div className={styles.step_icon}>
                  <i className={step.icon}></i>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.step_arrow}>
                  <div className={styles.arrow_line}></div>
                  <div className={styles.arrow_head}>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div className={styles.arrow_pulse}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatisticsSection() {
  const [stats, setStats] = useState([
    { number: 0, target: 5000, label: "Εγγεγραμμένες Νταντάδες", icon: "fa-solid fa-users" },
    { number: 0, target: 15000, label: "Ευτυχισμένες Οικογένειες", icon: "fa-solid fa-home" },
    { number: 0, target: 50000, label: "Ολοκληρωμένες Συνεργασίες", icon: "fa-solid fa-handshake" },
    { number: 0, target: 98, label: "Ικανοποίηση Πελατών (%)", icon: "fa-solid fa-star" }
  ]);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervals = stats.map((stat, index) => {
      const increment = stat.target / (duration / 50);
      return setInterval(() => {
        setStats(prevStats => {
          const newStats = [...prevStats];
          if (newStats[index].number < newStats[index].target) {
            newStats[index].number = Math.min(
              newStats[index].number + increment,
              newStats[index].target
            );
          }
          return newStats;
        });
      }, 50);
    });

    setTimeout(() => {
      intervals.forEach(interval => clearInterval(interval));
    }, duration);

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  return (
    <section className={styles.statistics_section}>
      <div className={styles.container}>
        <h2>Αριθμοί που Μιλούν</h2>
        <div className={styles.stats_grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat_card}>
              <div className={styles.stat_icon}>
                <i className={stat.icon}></i>
              </div>
              <div className={styles.stat_number}>
                {Math.floor(stat.number).toLocaleString()}
                {stat.label.includes('%') ? '%' : '+'}
              </div>
              <div className={styles.stat_label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Μαρία Παπαδοπούλου",
      role: "Μητέρα 2 παιδιών",
      content: "Βρήκα την ιδανική νταντά για τα παιδιά μου μέσω της πλατφόρμας. Η διαδικασία ήταν απλή και η νταντά που επέλεξα είναι φανταστική!",
      rating: 5,
      image: defaultProfile
    },
    {
      name: "Ελένη Κωνσταντίνου",
      role: "Νταντά",
      content: "Η πλατφόρμα με βοήθησε να βρω υπέροχες οικογένειες για συνεργασία. Αισθάνομαι ασφαλής και εκτιμημένη στη δουλειά μου.",
      rating: 5,
      image: defaultProfile
    },
    {
      name: "Γιάννης Αντωνίου", 
      role: "Πατέρας",
      content: "Εξαιρετική εξυπηρέτηση και αξιόπιστες νταντάδες. Τα παιδιά μου λατρεύουν την νταντά τους και εγώ είμαι ήρεμος στη δουλειά μου.",
      rating: 5,
      image: defaultProfile
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className={styles.testimonials_section}>
      <div className={styles.container}>
        <h2>Τι Λένε οι Χρήστες μας</h2>
        <div className={styles.testimonial_container}>
          <div className={styles.testimonial_card}>
            <div className={styles.testimonial_avatar}>
              <img 
                src={testimonials[currentTestimonial].image} 
                alt={`${testimonials[currentTestimonial].name} profile`}
                className={styles.testimonial_avatar_img}
              />
            </div>
            <div className={styles.testimonial_content}>
              <div className={styles.testimonial_stars}>
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>
              <blockquote>"{testimonials[currentTestimonial].content}"</blockquote>
              <div className={styles.testimonial_author}>
                <strong>{testimonials[currentTestimonial].name}</strong>
                <span>{testimonials[currentTestimonial].role}</span>
              </div>
            </div>
          </div>
          <div className={styles.testimonial_indicators}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentTestimonial ? styles.active : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SafetySection() {
  const safetyFeatures = [
    {
      icon: "fa-solid fa-id-card",
      title: "Επαλήθευση Ταυτότητας",
      description: "Όλες οι νταντάδες επαληθεύουν την ταυτότητά τους με επίσημα έγγραφα."
    },
    {
      icon: "fa-solid fa-certificate",
      title: "Πιστοποιήσεις",
      description: "Έλεγχος πιστοποιήσεων πρώτων βοηθειών και παιδαγωγικής εκπαίδευσης."
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Ασφαλιστική Κάλυψη",
      description: "Παρέχουμε ασφαλιστική κάλυψη για όλες τις συνεργασίες μέσω της πλατφόρμας."
    },
    {
      icon: "fa-solid fa-headset",
      title: "24/7 Υποστήριξη",
      description: "Η ομάδα υποστήριξής μας είναι διαθέσιμη όλο το 24ωρο για οποιοδήποτε θέμα."
    }
  ];

  return (
    <section className={styles.safety_section}>
      <div className={styles.container}>
        <div className={styles.safety_content}>
          <div className={styles.safety_text}>
            <h2>Η Ασφάλεια των Παιδιών σας είναι η Προτεραιότητά μας</h2>
            <p>
              Καταλαβαίνουμε πόσο σημαντικό είναι να εμπιστευτείτε κάποιον με τα πιο πολύτιμα άτομα στη ζωή σας. 
              Γι' αυτό έχουμε δημιουργήσει ένα πλήρες σύστημα ασφαλείας και επαλήθευσης.
            </p>
          </div>
          <div className={styles.safety_features}>
            {safetyFeatures.map((feature, index) => (
              <div key={index} className={styles.safety_feature}>
                <div className={styles.safety_icon}>
                  <i className={feature.icon}></i>
                </div>
                <div className={styles.safety_info}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.cta_section}>
      <div className={styles.container}>
        <div className={styles.cta_content}>
          <h2>Είστε Έτοιμοι να Ξεκινήσετε;</h2>
          <p>
            Εγγραφείτε σήμερα και βρείτε την ιδανική νταντά για την οικογένειά σας
            ή ξεκινήστε την καριέρα σας στη φροντίδα παιδιών.
          </p>
          <div className={styles.cta_buttons}>
            <button 
              className={styles.cta_button_primary}
              onClick={() => navigate('/guardian-registration?step=1')}
            >
              <i className="fa-solid fa-user-plus"></i>
              Εγγραφή Γονέα
            </button>
            <button 
              className={styles.cta_button_secondary}
              onClick={() => navigate('/caretaker-registration?step=1')}
            >
              <i className="fa-solid fa-heart"></i>
              Εγγραφή Νταντάς
            </button>
          </div>
          <div className={styles.cta_features}>
            <div className={styles.cta_feature}>
              <i className="fa-solid fa-check"></i>
              <span>Δωρεάν εγγραφή</span>
            </div>
            <div className={styles.cta_feature}>
              <i className="fa-solid fa-check"></i>
              <span>Χωρίς δεσμευτικές χρεώσεις</span>
            </div>
            <div className={styles.cta_feature}>
              <i className="fa-solid fa-check"></i>
              <span>Άμεση ενεργοποίηση</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`${styles.scroll_to_top} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Πήγαινε στην κορυφή"
      title="Πήγαινε στην κορυφή"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
