import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <>
      <ul className={styles.navigation_list}>
        <li className={styles.dropdown_tab}>
            <div className={styles.tab_title}>
              <i className="fa-solid fa-user"></i>
              <a>Κηδεμόνες</a>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            <ul className={styles.dropdown}>
              <li>
                <i className="fa-solid fa-right-to-bracket"></i>
                <a>Σύνδεση</a>
              </li>
              <li>
                <i className="fa-solid fa-user-plus"></i>
                <a>Εγγραφή</a>
              </li>
            </ul>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-regular fa-user"></i>
            <a>Επιμελητές</a>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>
              <i className="fa-solid fa-right-to-bracket"></i>
              <a>Σύνδεση</a>
            </li>
            <li>
              <i className="fa-solid fa-user-plus"></i>
              <a>Εγγραφή</a>
            </li>
          </ul>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-question"></i>
            <a>Οδηγίες</a>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>
              <i className="fa-solid fa-user"></i>
              <a>Κηδεμόνες</a>
            </li>
            <li>
              <i className="fa-regular fa-user"></i>
              <a>Επιμελητές</a>
            </li>
          </ul>
        </li>
        <li className={styles.not_dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-bullhorn"></i>
            <a href="../anouncement"> Ανακοινώσεις</a>
          </div>
        </li>
        <li className={styles.not_dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-comment"></i>
            <a>Επικοινωνία</a>
          </div>
        </li>
      </ul>
    </>
  )
}