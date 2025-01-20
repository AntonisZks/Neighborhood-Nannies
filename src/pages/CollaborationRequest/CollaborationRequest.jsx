import styles from './CollaborationRequest.module.css';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useSearchParams } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumb';
import Schedule from '../../components/ScheduleTable/ScheduleTable';

export default function CollaborationRequest() {
  const [schedule, setSchedule] = useState([]);
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const nanny_id = searchParams.get('nid');

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

        if (nanny) {
          const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/schedule`));
          const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedule(scheduleArray);
        }
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

  console.log(schedule);
  

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={styles.outer_container}>
        <div className={styles.inner_container}>
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
          />
          <h2>Επιλέξτε το ωρομίσθιο</h2>
          <input type="number" placeholder="Ωρομίσθιο" />
          <div className={styles.buttons_container}>
            <a href='/guardian-registration?step=2' type="submit" className={styles.next_button}>
              Επόμενο
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}