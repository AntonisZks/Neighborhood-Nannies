import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import styles from "./AnouncementPage.module.css";

export default function AnouncementPage() {
  return (
    <div className={styles.outer_container}>
      <Header className={styles.header} />
      <Breadcrumbs className={styles.breadcrumbs} />
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
        <div className={styles.table_container}>
          <ul className={styles.table_head}>
            <a>Ημερομηνία</a>
            <a>Τίτλος</a>
            <a>Κατηγορία</a>
          </ul>
          <AnouncementsContainer />
        </div>

        {/* <div className={styles.search_container}>
          <h1>Αναζήτησε νταντάδες, εύκολα και γρήγορα!</h1>
        </div> */}
      </div>
    </>
  );
}

function AnouncementsContainer() {
  return (
    <>
      <ul className={styles.anouncement_container}>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <a> 24/12/2024</a>
            <a>
              2000 νέοι επιμελητές συνδέθηκαν για πρώτη φορά τον τελευταίο μήνα
            </a>
            <i className="fa solid fa-caret-down"></i>

            <a>
              <i class="fa-solid fa-circle"></i>Κηδεμόνες
            </a>
          </div>
          <div className={styles.dropdown}>
            <li>
              <a>Αγαπητοί κηδεμόνες,</a>
              <a>
                Σας ενημερωνούμε ότι τον τελευταίο μήνα 2000 νέοι επιμελητές
                συνδέθηκαν στον ιστότοπο μας για πρώτη φορά. Μπορείτε να δείτε
                τους νεότερους επιμελητές της ιστοσελίδας μας στον παρακάτω
                σύνδεσμο
              </a>
              <a>(σύνδεσμος)</a>
              <a>Σας ευχαρισούμε</a>
            </li>
          </div>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <a>Μια ανακοίνωση</a>
            <i className="fa solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>
              <a>
                Αγαπητοί κηδεμόνες, Σας ενημερωνούμε ότι τον τελευταίο μήνα 2000
                νέοι επιμελητές συνδέθηκαν στον ιστότοπο μας για πρώτη φορά.
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.dropdown_tab}>
          <div className={styles.tab_title}>
            <a>Μια ανακοίνωση</a>
            <i className="fa solid fa-caret-down"></i>
          </div>
          <ul className={styles.dropdown}>
            <li>
              <a>
                hiosgiowshgoSIhgpoSgjnopSnopasjmnopjmngopSngiosnbgionboingioNgopANddddddddddddddddddddddddddddd
                a[pfkaomgfopsmgopemgopwsemgopwemfgopwemvopwemvoewmvoemvoemfgoemgoemgoewmgoewmgoewmfvoemvoemvoemv]
                egfm,werogbmoeprmbowermbormborembomborembormbormbormborembpaolmbpar;mogOPEwmrgombpomrbrombomrbpomr
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}
