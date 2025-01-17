import styles from './PaymentInfoPanel.module.css';
import default_profile_picture from '../../assets/imgs/default_profile_picture.jpg';
import alex from '../../assets/imgs/alex.png';
import jimmy from '../../assets/imgs/jimmy.png';


export default function PaymentInfoPanel() {
  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <div className={styles.nanny_profile_container}>
          <img className={styles.nanny_picture} src={alex} alt="profile picture" />
          <h1 className={styles.nanny_fullname}>Αλέξανδρος Δημητρίου</h1>
        </div>
        <div className={styles.nanny_info_container}>
          <h1>Πληροφορίες Επιμελητή</h1>
          <ul>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <p><b>Email:</b> alexdimitriou@gmail.com</p>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <p><b>Τηλέφωνο:</b> 6912345678</p>
            </li>
            <li>
              <i className="fa-solid fa-city"></i>
              <p><b>Περιοχή Εργασίας:</b> Περιστέρι</p>
            </li>
          </ul>
        </div>
        <div className={styles.payment_info_container}>
          <h1>Πληροφορίες Πληρωμής</h1>
          <ul>
            <li>
              <i className="fa-solid fa-comments-dollar"></i>
              <p><b>Δηλωμένο ωρομίσθιο:</b> 8€</p>
            </li>
            <li>
              <i className="fa-solid fa-business-time"></i>
              <p><b>Δηλωμένες Ώρες εργασίας:</b> 24</p>
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              <p><b>Ώρες που εργάστηκε:</b> 24</p>
            </li>
          </ul>
          <h2>Συνολικό μηνιαίο ποσό:</h2>
          <div className={styles.payment_transition_container}>
            <div className={styles.me_container}>
              <img src={jimmy} alt="your profile picture" />
              <h2>Εγώ</h2>
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
        </div>
        <div className={styles.terms_container}>
          <p className={styles.terms_description}>
            Επιβεβαιώνετε ότι ο επαγγελματίας παρείχε
            τις συμφωνημένες υπηρεσίες με επιτυχία
            κατά τη διάρκεια του μήνα, εκπληρώνοντας
            όλες τις υποχρεώσεις του/της σύμφωνα με τη
            συμφωνία σας;
          </p>
          <div className={styles.terms_checkbox_container}>
            <input type="checkbox" name='terms_checkbox'/>
            <label htmlFor="terms_checkbox">Επιβεβαίωση</label>
          </div>
        </div>
      </div>
    </div>
  )
}