import React from "react";
import styles from "./VoucherCard.module.css";
import Header from "../../components/Header/Header";
import alex from '../../assets/imgs/alex.png';
import jimmy from '../../assets/imgs/jimmy.png';

const VoucherCard = () => {
  return (
    <div className={styles.outer_container}>
      <Header />
      <main>
        <div className={styles.card_container}>
          <div className={styles.inner_container}>
            <div className={styles.header}>Εξαργύρωση Ποσού Μηνιαίας Πληρωμής</div>
            <div className={styles.info_group}>
              <h1>Πληροφορίες Κηδεμόνα</h1>
              <ul>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <p><b>Email:</b> dimitrispapadopoulos@gmail.com</p>
                </li>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <p><b>Τηλέφωνο:</b> 6962881364</p>
                </li>
                <li>
                  <i className="fa-solid fa-city"></i>
                  <p><b>Περιοχή Διαμονής:</b> Περιστέρι</p>
                </li>
              </ul>
            </div>
            <div className={styles.info_group}>
              <h1>Πληροφορίες Πληρωμής</h1>
              <ul>
                <li>
                  <i className="fa-solid fa-comments-dollar"></i>
                  <p><b>Δηλωμένο ωρομίσθιο:</b> 8€</p>
                </li>
                <li>
                  <i className="fa-solid fa-business-time"></i>
                  <p><b>Δηλωμένες ώρες εργασίας:</b> 24</p>
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  <p><b>Ώρες που εργάστηκε:</b> 24</p>
                </li>
              </ul>
            </div>
            <h2>Συνολικό μηνιαίο ποσό:</h2>
            <div className={styles.payment_transition_container}>
              <div className={styles.me_container}>
                <img src={jimmy} alt="your profile picture" />
                <h2>Δημήτρης Παπαδόπουλος </h2>
              </div>
              <div className={styles.payment_arrow_container}>
                <h1>192€</h1>
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
              <div className={styles.nanny_container}>
                <img src={alex} alt="your profile picture" />
                <h2>Αλέξανδρος Δημητρίου</h2>
              </div>
            </div>
            <div className={styles.confirmation}>
              Επιβεβαιώνετε ότι ο επαγγελματίας παρέχει τις συμφωνημένες υπηρεσίες με επιτυχία κατά τη διάρκεια του μήνα, εκπληρώνοντας όλες τις υποχρεώσεις σας σύμφωνα με τη συμφωνία;
            </div>
            <div className={styles.checkbox_container}>
              <input type="checkbox" className={styles.checkbox} />
              <label>Επιβεβαίωση</label>
            </div>
            <div className={styles.buttons_container}>
              <button className={`${styles.button} ${styles.reject_button}`}>
                <p>Απόρριψη</p>
              </button>
              <button className={`${styles.button} ${styles.accept_button}`}>
                <i className="fa-solid fa-paper-plane"></i>
                <p>Εξαργύρωση Voucher</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VoucherCard;