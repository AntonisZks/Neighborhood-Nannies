import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.first_column} ${styles.column}`}>
          <p>&copy; Copyright 2024</p>
          <p>All rights reserved</p>
        </div>
        <div className={`${styles.second_column} ${styles.column}`}>
          <p className={styles.title}>Στοιχεία Επικοινωνίας:</p>
          <ul>
            <li>
              <i className="fa-solid fa-phone"></i>
              <p>Τηλέφωνο: 2103258080 - 210325809</p>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <p>Email: ntantades@yeka.gr</p>
            </li>
          </ul>
        </div>
        <div className={`${styles.third_column} ${styles.column}`}>
          <p className={styles.title}>Συχνές Ερωτήσεις:</p>
          <ul>
            <li>
              <a href="#">Για Κηδεμόνες</a>
            </li>
            <li>
              <a href="#">Για Επιμελητές</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}