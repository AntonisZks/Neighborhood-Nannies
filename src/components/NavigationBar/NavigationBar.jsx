import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <>
      <ul className={styles.navigation_list}>
        <li>
          <div className={styles.tab}>
            <p>Κηδεμόνες</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </li>
        <li>
          <div className={styles.tab}>
            <p>Επιμελητές</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </li>
        <li>
          <div className={styles.tab}>
            <p>Οδηγίες</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </li>
        <li>
          <div className={styles.tab}>
            <p>Ανακοινώσεις</p>
          </div>
        </li>
        <li>
          <div className={styles.tab}>
            <p>Επικοινωνία</p>
          </div>
        </li>
      </ul>
    </>
  )
}