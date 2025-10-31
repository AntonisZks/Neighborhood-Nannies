import React from "react";

import styles from "./PaymentPage.module.css";

import Header from "../../components/Header/Header";
import PaymentInfoPanel from "../../components/PaymentInfoPanel/PaymentInfoPanel";
import PaymentCalendar from "../../components/PaymentCalendar/PaymentCalendar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ChatButton from "../../components/ChatPopup/ChatButton";
import ChatPopup from "../../components/ChatPopup/ChatPopup";
import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { use } from "react";



export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const [nanny, setNanny] = useState(null);
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [activeCollaboration, setActiveCollaboration] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(0);
  const navigate = useNavigate();
  const parent_id = searchParams.get("pid");
  const nanny_id = localStorage.getItem("nannyID");

   useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const nannyData = nanniesArray.find(nanny => nanny.id === nanny_id);
        setNanny(nannyData);

      } catch (error) {
        setError(error.message);
        console.error("Error fetching nanny data: ", error);
      }
      try{
      const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const parentData = parentsArray.find(parent => parent.id === parent_id);
        setParent(parentData);

        
       
      } catch (error) {
        setError(error.message);
        console.error("Error fetching parent data: ", error);
      }

      try {
      const collaborationSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/active_collaboration`));
      const collaborationArray = collaborationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched active collaboration: ", collaborationArray);
      console.log("Hourly Pay: ", collaborationArray[0].hourlyPay);
      setActiveCollaboration(collaborationArray);
        
      }
      catch (error) {
        console.error("Error fetching active collaboration: ", error);
      }
  

      finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
 

   useEffect(() => {
  
      const fetchSchedule = async () => {
      try {
          const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/schedule`));
          const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched shcedule: ", scheduleArray);
          setSchedule(scheduleArray);
        
      }
      catch (error) {
        console.error("Error fetching work days: ", error);
      }
    };
    
    fetchSchedule();

  }, []);
 
useEffect(() => {
    try {
      if (schedule) {
        let hoursWorking=0;
        for (const [day, hours] of Object.entries(schedule[0])) {
          if (day !== 'id') {
            for (const [key, value] of Object.entries(hours)) {
              if (value === 2) {
                hoursWorking+=1;
              }
            }
          }
        }
        setHoursWorked(hoursWorking);
      }
    }
    catch (error) {
      console.error("Error processing schedule: ", error);
    }
  }, [schedule]);

    const HandleSend=()=>{

      const sharedPaymentId = doc(collection(firestore, "shared")).id;

      const collabRef = doc(firestore, `Nannies/${nanny_id}/payments/${sharedPaymentId}`);
      setDoc(collabRef, {
        parent_id: parent_id,
        hoursWorked: hoursWorked,
        hourlyPay: activeCollaboration[0].hourlyPay,
        totalAmount: hoursWorked * activeCollaboration[0].hourlyPay*4,
        date: new Date(),
        accepted: null
      })
      
      const collabRef2 = doc(firestore, `Parents/${parent_id}/payments/${sharedPaymentId}`);
      setDoc(collabRef2, {
        nanny_id: nanny_id,
        hoursWorked: hoursWorked,
        hourlyPay: activeCollaboration[0].hourlyPay,
        totalAmount: hoursWorked * activeCollaboration[0].hourlyPay*4,
        date: new Date(),
        accepted: null
      })
      .then(() => {
        alert("Voucher sent successfully!");
        navigate(`/p_dashboard?pid=${parent_id}`);
      })
      .catch((error) => {
        console.error("Error sending voucher: ", error);
        alert("Failed to send voucher. Please try again.");
      });
      
    }
      



  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }

  return (
    <div className={styles.outer_container}>
      <ChatButton />
      <ChatPopup />
      <Header />
      <Breadcrumb/>
      <main>
        <PaymentInfoPanel  
        nanny={nanny} 
        parent={parent}
        activeCollaboration={activeCollaboration}
        schedule={schedule}/>
      <td><PaymentCalendar loggedInParentID={parent_id} /></td>   
      </main>
      <div className={styles.buttons_container}>
        <button className={styles.cancel_button}>
          <p>Ακύρωση</p>
        </button>
        <button onClick={HandleSend} className={styles.send_button}>
          <i className="fa-solid fa-paper-plane"></i>
          <p>Αποστολή Voucher</p>
        </button>
      </div>
    </div>
  );
}
