import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <>
      <ul className={styles.navigation_list}>
        <li>
          <p>Κηδεμόνες</p>
          <i className="fa-solid fa-caret-down"></i>
        </li>
        <li>
          <p>Επιμελητές</p>
          <i className="fa-solid fa-caret-down"></i>
        </li>
        <li>
          <p>Οδηγίες</p>
          <i className="fa-solid fa-caret-down"></i>
        </li>
        <li>
          <p>Ανακοινώσεις</p>
        </li>
        <li>
          <p>Επικοινωνία</p>
        </li>
      </ul>
    </>
  )
}