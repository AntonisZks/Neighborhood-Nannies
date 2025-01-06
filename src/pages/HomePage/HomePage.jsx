import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./HomePage.module.css";

import nanny from "../../assets/imgs/nanny_image.jpg";
import parents from "../../assets/imgs/parents_image.jpg";


export default function HomePage() {
  return (
    <div className={styles.outer_container}>
      <Header className={styles.header} />
      <MainSection />
      <Footer className={styles.footer} />
    </div>
  );
}

function MainSection() {
  return (
    <>
      <div className={styles.bg_circle}></div>
      <div className={styles.main_section}>
        <div className={styles.options_container}>
          <ParentIntroductionContainer />
          <NannyIntroductionContainer />
        </div>

        <div className={styles.upper_wave}></div>
        <div className={styles.search_container}>
          <h1>Αναζήτησε νταντάδες, εύκολα και γρήγορα!</h1>
        </div>
        <div className={styles.lower_wave}></div>
      </div>
    </>
  );
}

function ParentIntroductionContainer() {
  return (
    <div className={styles.parent_container}>
      <img className={styles.parent_image} src={parents} alt="" />
      <h1 className={styles.title}>Ψάχνεις νταντά για το παιδί σου;</h1>
      <p className={styles.description}>
        Βρες την ιδανική νταντά για τα παιδιά σου! Η πλατφόρμα μας σου προσφέρει
        πρόσβαση σε αξιόπιστους επαγγελματίες με εμπειρία στη φροντίδα παιδιών.
        Αναζήτησε εύκολα και γρήγορα, βασισμένος στις ανάγκες της οικογένειάς
        σου.
      </p>
      <button>
        <div className={styles.button_content}>
          <p>Ξεκίνα Τώρα</p>
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </div>
      </button>
    </div>
  );
}

function NannyIntroductionContainer() {
  return (
    <div className={styles.nanny_container}>
      <img className={styles.nanny_image} src={nanny} alt="" />
      <h1 className={styles.title}>Επιθυμείς να εργαστείς ως νταντά;</h1>
      <p className={styles.description}>
        Δημιούργησε το προφίλ σου και βρες οικογένειες που χρειάζονται την
        υποστήριξή σου! Είτε έχεις εμπειρία ως νταντά είτε μόλις ξεκινάς, η
        πλατφόρμα μας σου δίνει τη δυνατότητα να επιλέξεις ευέλικτες συνεργασίες
        και να κάνεις τη διαφορά στη ζωή μιας οικογένειας.
      </p>
      <button>
        <div className={styles.button_content}>
          <p>Ξεκίνα Τώρα</p>
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </div>
      </button>
    </div>
  );
}
