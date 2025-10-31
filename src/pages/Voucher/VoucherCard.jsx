import React from "react";
import styles from "./VoucherCard.module.css";

import Header from "../../components/Header/Header";
import PaymentInfoPanel from "../../components/PaymentInfoPanel/PaymentInfoPanel";
import PaymentCalendar from "../../components/PaymentCalendar/PaymentCalendar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ChatButton from "../../components/ChatPopup/ChatButton";
import ChatPopup from "../../components/ChatPopup/ChatPopup";
import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const VoucherCard = () => {
    const [searchParams] = useSearchParams();
    const [nanny, setNanny] = useState(null);
    const [parent, setParent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [payment, setPayment] = useState(null);
    const navigate = useNavigate();
    const payment_id = searchParams.get("payid");
    const nanny_id = localStorage.getItem("nanny_id");



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
          const querySnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/payments`));
            const paymentsArray = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            const paymentData = paymentsArray.find(payment => payment.id === payment_id);
            setPayment(paymentData);
          
        
          const querySnapshot2 = await getDocs(collection(firestore, "Parents"));
            const parentsArray = querySnapshot2.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            const parentData = parentsArray.find(parent => parent.id === paymentData.parent_id);
            setParent(parentData);
          } 
            
           
           catch (error) {
            setError(error.message);
            console.error("Error fetching parent data: ", error);
          }

          finally {
            setLoading(false);
          }
        };
    
        fetchData()
      }, [nanny_id]);
      
    const handlePayment = async () => {
      try {
        const voucherRef = doc(firestore, `Nannies/${nanny_id}/payments/${payment_id}`);

        await updateDoc(voucherRef, {
          accepted: true,
        });
        
        const voucherRef2 = doc(firestore, `Parents/${payment.parent_id}/payments/${payment_id}`);
        await updateDoc(voucherRef2, {
          accepted: true,
        });

        alert("Το voucher έχει εξαργυρωθεί επιτυχώς!");
        navigate(`/nanny-profile?nid=${nanny_id}`);
      } catch (error) {
        console.error("Error processing payment: ", error);
        alert("Υπήρξε σφάλμα κατά την εξαργύρωση του voucher. Παρακαλώ δοκιμάστε ξανά.");
      }
    };

   const handleReject = async () => {
     try {
       const voucherRef = doc((firestore, `nannies/${nanny_id}/payments/${payment_id}`));

        await updateDoc(voucherRef, {
          accepted: false,
        });
        const voucherRef2 = doc(firestore, `Parents/${payment.parent_id}/payments/${payment_id}`);
        await updateDoc(voucherRef2, {
          accepted: false,
        });
        
        alert("Το voucher έχει απορριφθεί.");
        navigate('/nanny-profile');
     } catch (error) {
       console.error("Error rejecting payment: ", error);
       alert("Υπήρξε σφάλμα κατά την απόρριψη του voucher. Παρακαλώ δοκιμάστε ξανά.");
     }
   };

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }

  return (
    <div className={styles.outer_container}>
      <ChatButton />
      <ChatPopup />
      <Header />
      <main>
        <div className={styles.card_container}>
          <div className={styles.inner_container}>
            <div className={styles.header}>Εξαργύρωση Ποσού Μηνιαίας Πληρωμής</div>
            <div className={styles.info_group}>
              <h1>Πληροφορίες Κηδεμόνα</h1>
              <ul>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <p><b>Email:</b> {parent.email}</p>
                </li>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <p><b>Τηλέφωνο:</b> {parent.phone}</p>
                </li>
                <li>
                  <i className="fa-solid fa-city"></i>
                  <p><b>Περιοχή Διαμονής:</b> {parent.living_area}</p>
                </li>
              </ul>
            </div>
            <div className={styles.info_group}>
              <h1>Πληροφορίες Πληρωμής</h1>
              <ul>
                <li>
                  <i className="fa-solid fa-comments-dollar"></i>
                  <p><b>Δηλωμένο ωρομίσθιο:</b> {payment.hourlyPay}€</p>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  <p><b>Ώρες που εργάστηκε:</b> {payment.hoursWorked}</p>
                </li>
              </ul>
            </div>
            <h2>Συνολικό μηνιαίο ποσό:</h2>
            <div className={styles.payment_transition_container}>
              <div className={styles.me_container}>
                <img src={parent.profileImageUrl} alt="your profile picture" />
                <h2>{parent.first_name} {parent.last_name}</h2>
              </div>
              <div className={styles.payment_arrow_container}>
                <h1>{payment.hourlyPay*payment.hoursWorked*4}€</h1>
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
              <div className={styles.nanny_container}>
                <img src={nanny.profileImageUrl} alt="your profile picture" />
                <h2>{nanny.first_name} {nanny.last_name}</h2>
              </div>
            </div>
            <div className={styles.confirmation}>
              Επιβεβαιώνετε ότι ο επαγγελματίας παρέχει τις συμφωνημένες υπηρεσίες με επιτυχία κατά τη διάρκεια του μήνα, εκπληρώνοντας όλες τις υποχρεώσεις σας σύμφωνα με τη συμφωνία;
            </div>
            <div className={styles.checkbox_container}>
              <input type="checkbox" className={styles.checkbox} />
              <label>Επιβεβαίωση</label>
            </div>
            <div className={styles.buttons_container}>
              <button onClick={handleReject} className={`${styles.button} ${styles.reject_button}`}>
                <p>Απόρριψη</p>
              </button>
              <button onClick={handlePayment} className={`${styles.button} ${styles.accept_button}`}>
                <i className="fa-solid fa-paper-plane"></i>
                <p>Εξαργύρωση Voucher</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VoucherCard;