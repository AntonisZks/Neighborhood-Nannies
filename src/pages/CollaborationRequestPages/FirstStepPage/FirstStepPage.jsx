import styles from "./FirstStepPage.module.css";

import Header from "../../../components/Header/Header";
import Breadcrumbs from "../../../components/Breadcrumb/Breadcrumb";
import Schedule from "../../../components/ScheduleTable/ScheduleTable";


export default function FirstStepPage() {
  return (
    <div className={styles.outer_container}>
      <Header />
      <Breadcrumbs />
      <div className={styles.main_content}>
        <h1>Επιλέξτε τις ώρες για τις οποίες επιθυμείτε να συνεργαστείτε</h1>
        <Schedule />
        <div className={styles.hour_salary}>
          <h1>Επιλέξτε το ωρομίσθιο</h1>
          <input type="number" />
        </div>
        <div className={styles.buttons_container}>
          <button className={styles.temp_save_button}>
            <i className="fa-solid fa-save"></i>
            <p>Προσωρινή Αποθήκευση</p>
          </button>
          <button className={styles.next_button}>
            <i className="fa-solid fa-arrow-right"></i>
            <p>Επόμενο</p>
          </button>
        </div>
      </div>
    </div>
  )
}
