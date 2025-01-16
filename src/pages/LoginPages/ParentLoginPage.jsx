import React, { useState, useEffect } from "react";
import styles from "./ParentLoginPage.module.css";

import Logo from "../../components/Logo/Logo";
import SmallFooter from "../../components/SmallFooter/SmallFooter";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";


export default function ParentLoginPage() {

  const [parents, setParents] = useState([]);
  
  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setParents(parentsArray);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log(parents);
      }
    };

    fetchData();

  }, []);

  const checkForExistance = async (e) => {
    e.preventDefault();

    // Check if the email and password match any of the parents in the database
    const email = e.target[0].value;
    const password = e.target[1].value;

    const parent = parents.find(parent => parent.email === email && parent.password === password);

    if (parent) {
      console.log("Parent exists!");
    } else {
      console.log("Parent does not exist!");
    }

  };

  return (
    <>
      <Logo className={styles.logo}/>
      <div className={styles.outer_container}>
        <div className={styles.inner_container}>
          <div className={styles.image_container}>
            <div className={styles.stock_image}></div>
          </div>
          <div className={styles.form_container}>
            <h1>Συνδεθείτε ως Κηδεμόνας</h1>
            <form onSubmit={checkForExistance} className={styles.login_form}>
              <div className={`${styles.email_container} ${styles.input_container}`}>
                <label htmlFor="">
                  <i className="fa-solid fa-envelope"></i>
                  <p>Ηλεκτρονικό Ταχυδρομείο (Email)</p>
                </label>
                <input type="email" autoComplete="off"/>
              </div>
              <div className={`${styles.password_container} ${styles.input_container}`}>
                <label htmlFor="">
                  <i className="fa-solid fa-lock"></i>
                  <p>Κωδικός Πρόσβασης (Password)</p>
                </label>
                <input type="password" autoComplete="off"/>
              </div>
              <a href="#" className={styles.forgot_password_link}>Ξεχάσατε τον κωδικό πρόσβασης;</a>
              <a href="/nanny-login" className={styles.are_you_nanny_link}>Είστε Επιμελητής;</a>
              <button type="submit">
                <i className="fa-solid fa-sign-in"></i>
                <p>Σύνδεση</p>
              </button>
            </form>
            <div className={styles.signup_container}>
              <p>Δεν έχετε λογαριασμό κηδεμόνα;</p>
              <a href="#">Δημιουργήστε έναν</a>
            </div>
          </div>
        </div>
      </div>
      <SmallFooter className={styles.footer}/>
    </>
  )
}