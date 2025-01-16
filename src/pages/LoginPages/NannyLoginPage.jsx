import styles from "./NannyLoginPage.module.css";

import Logo from "../../components/Logo/Logo";
import SmallFooter from "../../components/SmallFooter/SmallFooter";

export default function ParentLoginPage() {
  return (
    <>
      <Logo className={styles.logo}/>
      <div className={styles.outer_container}>
        <div className={styles.inner_container}>
          <div className={styles.form_container}>
            <h1>Συνδεθείτε ως Επιμελητής</h1>
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
            <div className={styles.stock_image}></div>
          </div>
        </div>
      </div>
      <SmallFooter className={styles.footer}/>
    </>
  )
}