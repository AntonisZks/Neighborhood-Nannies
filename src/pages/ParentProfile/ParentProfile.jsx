import jimmy from '../../assets/imgs/jimmy.png';

import Header from '../../components/Header/Header';

import styles from './ParentProfile.module.css';


export default function ParentProfile() {
  return (
    <div className={styles.outer_container}>
      <Header />
      <div className={styles.main_content}>
        <div className={styles.profile_sidebar}>
          <div className={styles.profile_edit_button_container}>
            <button className={styles.profile_edit_button}>
              <i class="fa-solid fa-pencil"></i>
            </button>
          </div>
          <div className={styles.profile_data}>
            <img src={jimmy} alt="profile picture" />
            <h1>Δημήτρης Παπαδόπουλος</h1>
          </div>
          <div className={styles.profile_description}>
            <h1>Σύντομη Περιγραφή</h1>
            <p>
              Αναζητώ μια αξιόπιστη και δημιουργική νταντά για μερική απασχόληση, 
              κυρίως απογεύματα. Θέλουμε έναν άνθρωπο που να αγαπά τα παιδιά, να 
              είναι υπομονετικός και να απασχολεί με ενδιαφέροντα και εκπαιδευτικά
              παιχνίδια.
            </p>
          </div>
          <div className={styles.contact_data}>
            <h1>Στοιχεία Επικοινωνίας</h1>
            <ul>
              <li>
                <i class="fa-solid fa-envelope"></i>
                <b>Email: </b>dimitrispapadopoulos@gmail.com
              </li>
              <li>
                <i class="fa-solid fa-phone"></i>
                <b>Τηλέφωνο: </b>6962881364
              </li>
            </ul>
          </div>
          <div className={styles.child_data}>
            <h1>Χαρατηριστικά Παιδιού</h1>
            <ul>
              <li>
                <i class="fa-solid fa-venus-mars"></i>
                <b>Φύλλο: </b>Αγόρι
              </li>
              <li>
                <i class="fa-regular fa-calendar-days"></i>
                <b>Ηλικία: </b>16 μηνών
              </li>
            </ul>
          </div>
          <div className={styles.logout_button_container}>
            <button className={styles.logout_button}>
              <i class="fa-solid fa-sign-out"></i>
              <p>Αποσύνδεση</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}