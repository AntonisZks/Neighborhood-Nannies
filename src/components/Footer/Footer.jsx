import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner_container}>
          <div className={`${styles.copyright_column} ${styles.column}`}>
            <p className={styles.copyright_text1}>&copy; Copyright 2024</p>
            <p className={styles.copyright_text2}>All rights reserved</p>
          </div>
          <div className={`${styles.contact_column} ${styles.column}`}>
            <p className={styles.title}>Στοιχεία Επικοινωνίας:</p>
            <ul className={styles.contact_list}>
              <li className={styles.phone_item}>
                <i className="fa-solid fa-phone"></i>
                <p className={styles.phone}>Τηλέφωνο: 2103258080 - 210325809</p>
              </li>
              <li className={styles.email_item}>
                <i className="fa-solid fa-envelope"></i>
                <p className={styles.email}>Email: ntantades@yeka.gr</p>
              </li>
            </ul>
          </div>
          <div className={`${styles.qna_column} ${styles.column}`}>
            <p className={styles.title}>Συχνές Ερωτήσεις:</p>
            <ul>
              <li>
                <i className="fa-solid fa-user"></i>
                <a href="#">Για Κηδεμόνες</a>
              </li>
              <li>
                <i className="fa-regular fa-user"></i>
                <a href="#">Για Επιμελητές</a>
              </li>
            </ul>
          </div>
          <div className={` ${styles.socials_column} ${styles.column}`}>
            <p className={styles.title}>Ακολουθήστε μας:</p>
            <ul className={styles.socials_list}>
              <li>
                <a href="#">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
