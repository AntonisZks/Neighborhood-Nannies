import styles from "./LoginPage.module.css";

import nanny from "../../assets/imgs/nanny_image.jpg";
import parents from "../../assets/imgs/parents_image.jpg";


export default function LoginPage() {
  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <div className={styles.image_container}>
          <img src={parents} alt="parents image" />
        </div>
        <div className={styles.form_container}>
          <h1>Συνδεθείτε ως Κηδεμόνας</h1>
          <form className={styles.login_form}>
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
            <a href="#" className={styles.are_you_nanny_link}>Είστε Επιμελητής;</a>
            <button>
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
  )
}