import styles from "./NannyLoginPage.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import SmallFooter from "../../components/SmallFooter/SmallFooter";

import nanny_image from "../../assets/imgs/nanny_image.jpg";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function NannyLoginPage() {
  const [nannies, setNannies] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setNannies(nanniesArray);
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log(nannies);
      }
    };

    fetchData();

  }, []);

  const checkForExistance = async (e) => {
    e.preventDefault();

    // Check if the email and password match any of the nannies in the database
    const email = e.target[0].value;
    const password = e.target[1].value;

    const nanny = nannies.find(nanny => nanny.email === email && nanny.password === password);

    if (nanny) {
      console.log("nanny exists!");
      window.localStorage.setItem("nannyID", nanny.id);
      navigate(`/nanny-profile?nid=${nanny.id}`);
    } 
    else {
      console.log("nanny does not exist!");
    }

  };
  return (
    <>
      <Logo className={styles.logo}/>
      <div className={styles.outer_container}>
        <div className={styles.inner_container}>
          <div className={styles.form_container}>
            <h1>Συνδεθείτε ως Επιμελητής</h1>
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
              <a href="/parent-login" className={styles.are_you_nanny_link}>Είστε Κηδεμόνας;</a>
              <button>
                <i className="fa-solid fa-sign-in"></i>
                <p>Σύνδεση</p>
              </button>
            </form>
            <div className={styles.signup_container}>
              <p>Δεν έχετε λογαριασμό επιμελητή;</p>
              <a href="#">Δημιουργήστε έναν</a>
            </div>
          </div>
          <div className={styles.image_container}>
            {/* <div className={styles.stock_image}></div> */}
            <img src={nanny_image} alt="parent picture" />
          </div>
        </div>
      </div>
      <SmallFooter className={styles.footer}/>
    </>
  )
}