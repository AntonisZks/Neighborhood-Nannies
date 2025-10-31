import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Endcollaboration.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ChatButton from "../../components/ChatPopup/ChatButton";
import ChatPopup from "../../components/ChatPopup/ChatPopup";
import { useEffect,} from "react";
import {  useSearchParams } from "react-router-dom";
import { doc, collection, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";


export default function Endcollaboration () {
  const [comments, setComments] = useState("");
  const [searchParams] = useSearchParams();
  const [nanny, setNanny] = useState(null);
  const [parent, setParent] = useState(null);
  const [starRating, setStarRating] = useState(0);
  var [schedule, setSchedule]=useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const parent_id = searchParams.get("pid");
  const navigate = useNavigate();


 useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const parentData = parentsArray.find(parent => parent.id === parent_id);
        setParent(parentData);

        const querySnapshotNanny = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshotNanny.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const nannyData = nanniesArray.find(nanny => nanny.id === parentData.active_collaboration_id);
        setNanny(nannyData);  

        const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${parentData.active_collaboration_id}/schedule`));
      const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedule(scheduleArray);

          
        console.log(schedule)
        
      } catch (error) {
        setError(error.message);
        console.error("Error fetching parent data: ", error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  
  const  handleConfirm = async() => {
    try {

      const sharedPreviousId = doc(collection(firestore, "shared")).id

      const previousCollabRef= doc(firestore, `Parents/${parent_id}/previous_collaborations/${sharedPreviousId}`);
      setDoc(previousCollabRef, {
        nanny_id: parent.active_collaboration_id,
        stars:starRating,
        end_date: new Date(),
      })
    
      const previousCollabRefNanny=doc(firestore, `Nannies/${nanny.id}/reviews/${sharedPreviousId}`);
      setDoc(previousCollabRefNanny,{
        parent_id:parent_id,
        profileImageUrl: parent.profileImageUrl,
        first_name:parent.first_name,
        last_name:parent.last_name,
        stars:starRating,
        text: comments,
        end_date : new Date(),
      })
      
      const NannyRef=doc(firestore, `Nannies/${nanny.id}`);
      updateDoc(NannyRef, {
        colaborations:nanny.collaborations+1

      })
      
      if (schedule) {
          for (const [day, hours] of Object.entries(schedule[0])) {
            if (day !== 'id') {
              for (const [key, value] of Object.entries(hours)) {
                if (value === 2) {
                  // Change the value directly
                  schedule[0][day][key] = 1;
                  setSchedule(schedule)
                }
              }
            }
          }
        }
      const scheduleRef=doc(firestore, `Nannies/${nanny.id}/schedule/${schedule[0].id}`);
      await updateDoc(scheduleRef, {
        Monday: schedule[0].Monday,
        Tuesday: schedule[0].Tuesday,
        Wednesday: schedule[0].Wednesday,
        Thursday: schedule[0].Thursday,
        Friday: schedule[0].Friday,
        Saturday: schedule[0].Saturday,
        Sunday: schedule[0].Sunday,
    });
      
      
      const endCollabRefParent = doc(firestore, `Parents/${parent_id}`);
      updateDoc(endCollabRefParent, {
        active_collaboration_id: "",
        active_collaboration_start_date:""
      });

      const activeCollabRef=doc(firestore, `Nannies/${nanny.id}/active_collaboration/${parent_id}`);
      await deleteDoc(activeCollabRef);

      alert('Η συνεργασία έληξε επιτυχώς');
      navigate(`/p_dashboard?pid=${parent_id}`)
      }catch (error) {
      console.error('Error saving declaration:', error);
      alert('Παρουσιάστηκε σφάλμα κατά την αποθήκευση.');
      }
      
  }

   
   const handleCancel = () => {
    navigate(`/p_dashboard/active-collaboration-overview?nid=${nanny.id}`)
   };





  
  const handleCommentsChange = (e) => setComments(e.target.value);
  
  
  const handleRating = (star) =>
  {setStarRating(star);
    console.log("Rated",star,"stars");
  } 
  
  
  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }
   
  return (
    <div className={styles.outer_container}>
      <ChatButton />
      <ChatPopup />
      <Header />
      <Breadcrumb />
      <div className={styles.container}>
        <div className={styles.cancelCollaboration}>
          <h2 className={styles.messageSection}>Λήξη Συνεργασίας</h2>
          <p className={styles.messageSection}>Πρόκειται να γίνει λήξη της συνεργασίας σας με τον επιμελητή. Επιθυμείτε να συνεχίσετε; </p>
          <div className={styles.checkboxContainer}>
        <input type="checkbox" id="confirm" />
        <label htmlFor="confirm">Επιβεβαιώνω </label>
        </div>
          <div className={styles.ratingSection}>
            <p>Aξιολόγηση:</p>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`${styles.star} star`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className={styles.descriptionNote}>Προαιρετικά προσθέστε μία σύντομη περιγραφή</p>
          <textarea
            value={comments}
            onChange={handleCommentsChange}
            placeholder="Προαιρετική περιγραφή"
            className={styles.descriptionInput}
          />
          <div className={styles.actions}>
            <button onClick={handleCancel} className={styles.actions_button}>Ακύρωση</button>
            <button onClick={handleConfirm} className={styles.actions_button}>Λήξη Συνεργασίας</button>
          </div>
        </div>
      </div>
    </div>
  )

}
