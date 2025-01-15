import styles from "./NavigationBar.module.css";
import { Link } from 'react-router-dom';

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
            <p>Επιμελητές</p> {}
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
            <p>Οδηγίες</p> {}
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>
              <i className="fa-solid fa-user"></i>
              <Link to="/guardians" className={styles.no_underline}><p>Κηδεμόνες</p></Link>
            </li>
            <li>
              <i className="fa-regular fa-user"></i>
              <Link to="/caretakers" className={styles.no_underline}><p>Επιμελητές</p></Link> {/* Interactive in dropdown */}
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
            <Link to="/Contacts" className={styles.no_underline}><p>Επικοινωνία</p></Link>
          </div>
        </li>
      </ul>
    </>
  )
}