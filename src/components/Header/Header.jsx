import styles from "./Header.module.css";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <div>
          Logo
        </div>
        <div>
          <NavigationBar />
        </div>
        {/* <div className={`${styles.misc_container} ${styles.language}`}>
          <p>ΕΛ | EN</p>
        </div> */}
        <div className={` ${styles.misc_container} ${styles.auth_container}`}>
          <a className={styles.login_link} href="#">Σύνδεση</a>
          <button className={styles.signup_button}>
            <i className="fas fa-user-plus"></i>
            Εγγραφή
          </button>
        </div>
      </div>
    </>
  )
}