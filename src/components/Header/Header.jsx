import styles from "./Header.module.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Logo from "../Logo/Logo";

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <Logo />
        <NavigationBar />
        <AuthenticationContainer />
      </div>
    </>
  )
}

function LanguageSelector() {
  return (
    <div className={`${styles.misc_container} ${styles.language}`}>
      <p>ΕΛ | EN</p>
    </div>
  )
}

function AuthenticationContainer() {
  return (
    <div className={` ${styles.misc_container} ${styles.auth_container}`}>
      <a className={styles.login_link} href="#">Σύνδεση</a>
      <button className={styles.signup_button}>
        <i className="fas fa-user-plus"></i>
        Εγγραφή
      </button>
    </div>
  )
}
