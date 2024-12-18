import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from "./HomePage.module.css";

import walter from "../../assets/imgs/Walter_White_S5B.png";
import deadpool from "../../assets/imgs/Deadpool-3.avif";

import nanny from "../../assets/imgs/nanny_image.jpg";
import parents from "../../assets/imgs/parents_image.jpg";

export default function HomePage() {
  return (
    <div className={styles.outer_container}>
      <Header className={styles.header} />
      <div className={styles.main_section}>
        <div className={styles.nanny_container}>
          <img className={styles.nanny_image} src={nanny} alt="" />
          <h1 className={styles.title}>Ψάχνεις ενασχόληση με παιδιά;</h1>
          <p className={styles.description}>Δημιούργησε το προφίλ σου και βρες οικογένειες που χρειάζονται την υποστήριξή σου! Είτε έχεις εμπειρία ως νταντά είτε μόλις ξεκινάς, η πλατφόρμα μας σου δίνει τη δυνατότητα να επιλέξεις ευέλικτες συνεργασίες και να κάνεις τη διαφορά στη ζωή μιας οικογένειας.</p>
          <button>
            <div className={styles.button_content}>
              <p>Ξεκίνα Τώρα</p>
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </div>
          </button>
        </div>
        <div className={styles.parent_container}>
          <img className={styles.parent_image} src={parents} alt="" />
          <h1 className={styles.title}>Ψάχνεις νταντά για το παιδί σου;</h1>
          <p className={styles.description}>Βρες την ιδανική νταντά για τα παιδιά σου! Η πλατφόρμα μας σου προσφέρει πρόσβαση σε αξιόπιστους επαγγελματίες με εμπειρία στη φροντίδα παιδιών. Αναζήτησε εύκολα και γρήγορα, βασισμένος στις ανάγκες της οικογένειάς σου.</p>
          <button>
            <div className={styles.button_content}>
              <p>Ξεκίνα Τώρα</p>
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </div>
          </button>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  )
}

function UserCard(args) {
  return (
    <div className={styles.user_card_container}>
      <img src={args.img} alt="placeholder"/>
      <p>{args.option_title}</p>
    </div>
  )
}
