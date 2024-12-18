import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <>
      <ul className={styles.navigation_list}>
        <li>
            <div className={styles.tab_title}>
              <p>Κηδεμόνες</p>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            <ul className={styles.dropdown}>
              <li>Σύνδεση</li>
              <li>Εγγραφή</li>
            </ul>
        </li>
        <li>
          <div className={styles.tab_title}>
            <p>Επιμελητές</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>Σύνδεση</li>
            <li>Εγγραφή</li>
          </ul>
        </li>
        <li>
          <div className={styles.tab_title}>
            <p>Οδηγίες</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>Σύνδεση</li>
            <li>Εγγραφή</li>
          </ul>
        </li>
        <li>
          <div className={styles.tab_title}>
            <p>Ανακοινώσεις</p>
          </div>
        </li>
        <li>
          <div className={styles.tab_title}>
            <p>Επικοινωνία</p>
          </div>
        </li>
      </ul>
    </>
  )
}