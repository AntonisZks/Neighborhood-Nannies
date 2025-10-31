import styles from './CollaborationRequest.module.css';

import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumb';
import Schedule from '../../components/ScheduleTable/ScheduleTable';
import ChatButton from '../../components/ChatPopup/ChatButton';
import ChatPopup from '../../components/ChatPopup/ChatPopup';
import { useNavigate } from "react-router-dom";

export default function CollaborationRequestNanny() {
  const [schedule, setSchedule] = useState([]);
  const [oldschedule, setOldSchedule] = useState([]);
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [hourlyPay, setHourlyPay] = useState('');
  const navigate = useNavigate();

  
  
  const nanny_id = window.localStorage.getItem('nannyID');
  const parent_id = searchParams.get('pid');

  useEffect(() => {
    const fetchParentData = async () => {
      try {

        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const parent = parentsArray.find(parent => parent.id === parent_id);
        setParent(parent);
       
        const OldscheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/schedule`));
        const OldscheduleArray = OldscheduleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOldSchedule(OldscheduleArray);
   
        
        
        if (parent) {
          const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/collaboration_requests/${parent_id}/schedule`));
          const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedule(scheduleArray); 
          
        }
       
        if (parent){
            const hourlyPayRef = doc(firestore, `Nannies/${nanny_id}/collaboration_requests/${parent_id}`);
            const hourlyPaySnap = await getDocs(collection(firestore, `Nannies/${nanny_id}/collaboration_requests`));
            const hourlyPayData = hourlyPaySnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            const payData = hourlyPayData.find(data => data.parent_id === parent_id);
            if (payData) {
              setHourlyPay(payData.hourlyPay);
            }
        }    
        
      }
      catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchParentData();
  }, []);

  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>Error: {error.message}</div>; }
  
  const handleScheduleUpdate = (updatedSchedule) => {
    setSchedule(schedule);
  };

  
 const handleReject = async () => {
  try {
    
    const collabRef = doc(firestore, `Nannies/${nanny_id}/collaboration_requests/${parent_id}`);
      await updateDoc(collabRef, {
      accepted: false,
    });
    const collabRefParent = doc(firestore, `Parents/${parent_id}/finalized_declarations/${nanny_id}`);
    await updateDoc(collabRefParent, {
      accepted: false,
    });
    
    alert('Η αίτηση συνεργασίας απορρίφθηκε με επιτυχία!');
  } catch (err) {
    console.error('Error rejecting collaboration request:', err);
    alert('Παρουσιάστηκε σφάλμα κατά την απόρριψη της αίτησης.');
  }
 
  navigate(`/nanny-profile?nid=${nanny_id}`);
}





  const handleFinalSubmit = async () => {
  try {
    
    const collabRef = doc(firestore, `Nannies/${nanny_id}/collaboration_requests/${parent_id}`);

    
     await updateDoc(collabRef, {
      parent_id: parent_id,
      hourlyPay: parseFloat(hourlyPay),
      createdAt: new Date(),
      accepted: true,
    });

    const activecollabRef = doc(firestore, `Nannies/${nanny_id}/active_collaboration/${parent_id}`);
    await setDoc(activecollabRef, {
      parent_id: parent_id,
      hourlyPay: parseFloat(hourlyPay),
      startedAt: new Date(),
    });
    


    
    
    const oldscheduleId = oldschedule[0].id;
    const scheduleRef = doc(firestore, "Nannies", nanny_id, "schedule", oldscheduleId);
    await updateDoc(scheduleRef, {
        Monday: schedule[0].Monday,
        Tuesday: schedule[0].Tuesday,
        Wednesday: schedule[0].Wednesday,
        Thursday: schedule[0].Thursday,
        Friday: schedule[0].Friday,
        Saturday: schedule[0].Saturday,
        Sunday: schedule[0].Sunday,
    });
    

    const collabRefParent = doc(firestore, `Parents/${parent_id}/finalized_declarations/${nanny_id}`);
    await updateDoc(collabRefParent, {
      accepted: true,
    });



    const parentRef = doc(firestore, `Parents/${parent_id}`);
    await updateDoc(parentRef, {
      active_collaboration_id: nanny_id,
      active_collaboration_id_start_date  : new Date(),
    });

    alert('Η αίτηση συνεργασίας έγινε αποδεκτή!');
  } catch (err) {
    console.error('Error submitting collaboration request:', err);
    alert('Παρουσιάστηκε σφάλμα κατά την αποδοχή της αίτησης.');
  }
 
  navigate(`/nanny-profile?nid=${nanny_id}`);
};

  return (
    <>
      <ChatButton />
      <ChatPopup />
      <Header />
      <Breadcrumbs />
      <div className={styles.outer_container}>
        <div className={styles.inner_container}>
              <h1>Οριστική Υποβολή Αίτησης Συνεργασίας</h1>
              </div>
              <div className={styles.main_container}>
                <div className={styles.user_data_container}>
                  <div className={styles.profile_image_name_container}>
                    <img src={parent.profileImageUrl} alt="profile picture" width='40px' />
                    <h1>{parent.first_name} {parent.last_name}</h1> 
                  </div>
                  <div className={styles.description_container}>
                    <h1>Σύντομη Περιγραφή</h1>
                    { parent.description === '' ? (
                      <p className={styles.no_description}>Δεν υπάρχει διαθέσιμη περιγραφή</p>
                     ) : (
                      <p>{parent.description}</p>
                    )}
                  </div>
                  <div className={styles.data_container}>
                    <h1>Χαρακτηριστικά</h1>
                    <ul>
                      <li>
                        <i className="fa-solid fa-calendar-days"></i>
                        <p><b>Ηλικία: </b>{parent.age}</p>
                      </li>
                      
                      <li>
                        <i className="fa-solid fa-envelope"></i>
                        <p><b>Email: </b>{parent.email}</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-phone"></i>
                        <p><b>Τηλέφωνο: </b>{parent.phone}</p>
                      </li>
                      <li>
                        <i className="fa-solid fa-location-dot"></i>
                        <p><b>Περιοχή Εργασίας: </b>{parent.living_area}</p>
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
                    is_parent={false}
                  />
                </div>
              </div>
              <div className={styles.buttons_container2}>
                <a onClick={handleReject} type="submit" className={styles.reject_button}>
                  <i className="fa-solid fa-x"></i>
                  Απόρριψη Συνεργασίας
                </a>
                <a onClick={handleFinalSubmit} className={styles.submit_button}>
                  <i className="fa-solid fa-check"></i>
                  Αποδοχή Συνεργασίας
                </a>
              </div>
            </div> 
    </>
  );
}