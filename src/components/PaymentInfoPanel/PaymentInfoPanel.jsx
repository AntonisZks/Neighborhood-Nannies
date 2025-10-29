import styles from './PaymentInfoPanel.module.css';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { use } from 'react';



export default function PaymentInfoPanel(props) {
  
  const [hoursWorked, setHoursWorked] = useState(0);

  const nanny=props.nanny;
  const parent=props.parent;
  const activeCollaboration=props.activeCollaboration;
  const schedule=props.schedule;


 
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

 
 
  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <div className={styles.nanny_profile_container}>
          <img className={styles.nanny_picture} src={nanny.profileImageUrl} alt="profile picture" />
          <h1 className={styles.nanny_fullname}>{nanny.first_name} {nanny.last_name}</h1>
        </div>
        <div className={styles.nanny_info_container}>
          <h1>Πληροφορίες Επιμελητή</h1>
          <ul>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <p><b>Email:</b> {nanny.email}</p>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <p><b>Τηλέφωνο:</b> {nanny.phone}</p>
            </li>
            <li>
              <i className="fa-solid fa-city"></i>
              <p><b>Περιοχή Εργασίας:</b> {nanny.work_area}</p>
            </li>
          </ul>
        </div>
        <div className={styles.payment_info_container}>
          <h1>Πληροφορίες Πληρωμής</h1>
          <ul>
            <li>
              <i className="fa-solid fa-comments-dollar"></i>
              <p><b>Δηλωμένο ωρομίσθιο:</b> {activeCollaboration[0].hourlyPay}€</p>
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              <p><b>Ώρες που εργάστηκε:</b> {hoursWorked}</p>
            </li>
          </ul>
          <h2>Συνολικό μηνιαίο ποσό:</h2>
          <div className={styles.payment_transition_container}>
            <div className={styles.me_container}>
              <img src={parent.profileImageUrl} alt="your profile picture" />
              <h2>Εγώ</h2>
            </div>
            <div className={styles.payment_arrow_container}>
              <h1>{hoursWorked*activeCollaboration[0].hourlyPay*4}€</h1>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
            <div className={styles.nanny_container}>
              <img src={nanny.profileImageUrl} alt="your profile picture" />
              <h2>{nanny.first_name} {nanny.last_name}</h2>
            </div>
          </div>
        </div>
        <div className={styles.terms_container}>
          <p className={styles.terms_description}>
            Επιβεβαιώνετε ότι ο επαγγελματίας παρείχε
            τις συμφωνημένες υπηρεσίες με επιτυχία
            κατά τη διάρκεια του μήνα, εκπληρώνοντας
            όλες τις υποχρεώσεις του/της σύμφωνα με τη
            συμφωνία σας;
          </p>
          <div className={styles.terms_checkbox_container}>
            <input type="checkbox" name='terms_checkbox'/>
            <label htmlFor="terms_checkbox">Επιβεβαίωση</label>
          </div>
        </div>
      </div>
    </div>
  )
}