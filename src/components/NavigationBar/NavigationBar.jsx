import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <>
      <ul className={styles.navigation_list}>
        <li className={styles.dropdown_tab}>
            <div className={styles.tab_title}>
              <i className="fa-solid fa-user"></i>
              <p>Κηδεμόνες</p>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            <ul className={styles.dropdown}>
              <li>
                <i className="fa-solid fa-right-to-bracket"></i>
                <p>Σύνδεση</p>
              </li>
              <li>
                <i className="fa-solid fa-user-plus"></i>
                <p>Εγγραφή</p>
              </li>
            </ul>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-regular fa-user"></i>
            <p>Επιμελητές</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>
              <i className="fa-solid fa-right-to-bracket"></i>
              <p>Σύνδεση</p>
            </li>
            <li>
              <i className="fa-solid fa-user-plus"></i>
              <p>Εγγραφή</p>
            </li>
          </ul>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-question"></i>
            <p>Οδηγίες</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>
              <i className="fa-solid fa-user"></i>
              <p>Κηδεμόνες</p>
            </li>
            <li>
              <i className="fa-regular fa-user"></i>
              <p>Επιμελητές</p>
            </li>
          </ul>
        </li>
        <li className={styles.not_dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-bullhorn"></i>
            <p>Ανακοινώσεις</p>
          </div>
        </li>
        <li className={styles.not_dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-comment"></i>
            <p>Επικοινωνία</p>
          </div>
        </li>
      </ul>
    </>
  )
}