import { useState } from "react";
import styles from "./SearchPage.module.css";

import alex from "../../assets/imgs/alex.png";

import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import NannySearchPanel from "../../components/NannySearchPanel/NannySearchPanel";

export default function SearchPage() {
  const [experience, setExperience] = useState(0);
  const [collaborations, setCollaborations] = useState(0);

  return (
    <div className={styles.outer_container}>
      <Header />
      <Breadcrumbs />
      <div className={styles.filters_area}>
        <div className={styles.filter_container}>
          <h1>Φίλτρα Αναζήτησης</h1>
          <div className={styles.filter}>
            <label>Περιοχή Εργασίας</label>
            <input type="text" placeholder="π.χ. Αθήνα" />
          </div>
          <div className={styles.filter}>
            <label>Έτη Εμπειρίας</label>
            <div className={styles.slider_container}>
              <input className={styles.slider} type="range" value={experience} min="0" max="10" onChange={(e) => setExperience(e.target.value)}/>
              <p>{experience === "10" ? "10+" : experience}</p>
            </div>
          </div>
          <div className={styles.filter}>
            <label>Συνεργασίες</label>
            <div className={styles.slider_container}>
              <input className={styles.slider} type="range" value={collaborations} min="0" max="15" onChange={(e) => setCollaborations(e.target.value)}/>
              <p>{collaborations === "15" ? "15+" : collaborations}</p>
            </div>
          </div>
          {/* <div className={styles.filter}>
            <label>Ηλικία</label>
            <input type="number" placeholder="Ηλικία" />
          </div> */}
          <button>Εφαρμογή</button>
        </div>
      </div>
      <div className={styles.search_area}>
        <div className={styles.outer_container}>
          {[...Array(100)].map((_, index) => (
            <NannySearchPanel 
            key={index}
            profile_picture={alex}
            first_name="Αλέξανδρος"
            last_name="Παπαδόπουλος"
            work_area="Αθήνα"
            age="25"
            collaborations="3"
            stars={3}
            half_star={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}