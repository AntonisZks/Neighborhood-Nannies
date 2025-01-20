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
            <a href="/parent-login">
              <li>
                <i className="fa-solid fa-right-to-bracket"></i>
                <p>Σύνδεση</p>
              </li>
            </a>
            <a href="/guardian-registration?step=1">
              <li>
                <i className="fa-solid fa-user-plus"></i>
                <p>Εγγραφή</p>
              </li>
            </a>
          </ul>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-regular fa-user"></i>
            <p>Επιμελητές</p> {}
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <a href="/nanny-login">
              <li>
                <i className="fa-solid fa-right-to-bracket"></i>
                <p>Σύνδεση</p>
              </li>
            </a>
            <a href="">
              <li>
                <i className="fa-solid fa-user-plus"></i>
                <p>Εγγραφή</p>
              </li>
            </a>
          </ul>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-question"></i>
            <p>Οδηγίες</p> {}
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <Link to="/guardians" className={styles.no_underline}>
              <li>
                <i className="fa-solid fa-user"></i>
                <p>Κηδεμόνες</p>
              </li>
            </Link>
            <Link to="/caretakers" className={styles.no_underline}>
              <li>
                <i className="fa-regular fa-user"></i>
                <p>Επιμελητές</p>
              </li>
            </Link> {/* Interactive in dropdown */}
          </ul>
        </li>
        <a href="../anouncement"> 
          <li className={styles.not_dropdown_tab}>
          <div className={styles.tab_title}>
            <i className="fa-solid fa-bullhorn"></i>
              Ανακοινώσεις
            </div>
          </li>
        </a>
        <Link to="/Contacts" className={styles.no_underline}>
          <li className={styles.not_dropdown_tab}>
            <div className={styles.tab_title}>
              <i className="fa-solid fa-comment"></i>
              <p>Επικοινωνία</p>
            </div>
          </li>
        </Link>
      </ul>
    </>
  )
} 