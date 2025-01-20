import styles from './CollaborationRequest.module.css';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useSearchParams } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumb';
import Schedule from '../../components/ScheduleTable/ScheduleTable';

export default function CollaborationRequest() {
  var [schedule, setSchedule] = useState([]);
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const nanny_id = searchParams.get('nid');
  const step = searchParams.get('step');

  useEffect(() => {
    const fetchNannyData = async () => {
      try {

        const querySnapshot = await getDocs(collection(firestore, 'Nannies'));
        const nanniesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Search for the nanny with the given id
        const nanny = nanniesArray.find((nanny) => nanny.id === nanny_id);
        setNanny(nanny);
        console.log("Nanny:", nanny);

        const storedSchedule = localStorage.getItem('schedule');
        if (storedSchedule) {
          setSchedule(JSON.parse(storedSchedule));
          console.log("Got schedule from local storage");
        }

        
        if (nanny && !storedSchedule) {
          console.log("Fetching schedule");
          const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/schedule`));
          const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedule(scheduleArray);
          console.log("Previous schedule:", schedule);
        }
        
        console.log("Scedule:", schedule);
      }
      catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchNannyData();
  }, []);

  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>Error: {error.message}</div>; }
  
  const handleScheduleUpdate = (updatedSchedule) => {
    // setSchedule(updatedSchedule);
    // for (let i = 0; i < 14; i++) {
    //   schedule[0].Monday[i] = updatedSchedule[0][i];
    //   schedule[0].Tuesday[i] = updatedSchedule[1][i];
    //   schedule[0].Wednesday[i] = updatedSchedule[2][i];
    //   schedule[0].Thursday[i] = updatedSchedule[3][i];
    //   schedule[0].Friday[i] = updatedSchedule[4][i];
    //   schedule[0].Saturday[i] = updatedSchedule[5][i];
    //   schedule[0].Sunday[i] = updatedSchedule[6][i];
    // }
    schedule = updatedSchedule;
    console.log("Updated schedule:", schedule);
    console.log("Updated schedule:", updatedSchedule);
  };

  const handleNextStep = () => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    window.location.href = `collaboration-request?step=2&nid=${nanny_id}`;
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
              <input type="number" placeholder="Ωρομίσθιο" />
              <div className={styles.buttons_container1}>
                <a href={`collaboration-request?step=2&nid=${nanny_id}`} type="submit" className={styles.save_button}>
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
                        <i className="fa-solid fa-business-time"></i>
                        <p><b>Δηλωμένες Ώρες εργασίας:</b> 24</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-comments-dollar"></i>
                        <p><b>Δηλωμένο ωρομίσθιο:</b> 8€</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-circle-check"></i>
                        <p><b>Μηνιαίος Μισθός:</b> 24</p>
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
                <a href={`collaboration-request?step=2&nid=${nanny_id}`} type="submit" className={styles.submit_button}>
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