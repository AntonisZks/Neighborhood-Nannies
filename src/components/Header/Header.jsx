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
        <div className={`${styles.misc_container} ${styles.language}`}>
          <p>ΕΛ | EN</p>
        </div>
        <div className={` ${styles.misc_container} ${styles.login}`}>
          <p>Σύνδεση/Εγγραφή</p>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      </div>
    </>
  )
}