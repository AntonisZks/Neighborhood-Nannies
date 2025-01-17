import React, { useState } from 'react';
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


const announcements = [
  {
    date: '24/12/2024',
    title: '2000 νέοι επιμελητές συνδέθηκαν για πρώτη φορά τον τελευταίο μήνα',
    details: [
      'Αγαπητοί κηδεμόνες,',
      'Σας ενημερωνούμε ότι τον τελευταίο μήνα 2000 νέοι επιμελητές συνδέθηκαν στον ιστότοπο μας για πρώτη φορά. Μπορείτε να δείτε τους νεότερους επιμελητές της ιστοσελίδας μας στον παρακάτω σύνδεσμο',
      '(σύνδεσμος)',
      'Σας ευχαρισούμε'
    ]
  },
  {
    date: '25/12/2024',
    title: 'Νέο εκπαιδευτικό υλικό διαθέσιμο',
    details: [
      'Αγαπητοί κηδεμόνες,',
      'Σας ενημερωνούμε ότι τον τελευταίο μήνα 2000 νέοι επιμελητές συνδέθηκαν στον ιστότοπο μας για πρώτη φορά. Μπορείτε να δείτε τους νεότερους επιμελητές της ιστοσελίδας μας στον παρακάτω σύνδεσμο',
      '(σύνδεσμος)',
      'Σας ευχαρισούμε'
    ]
  },
  {
    date: '26/12/2024',
    title: 'Ενημέρωση για τις διακοπές',
    details: [
      'Αγαπητοί κηδεμόνες,',
      'Σας ενημερωνούμε ότι τον τελευταίο μήνα 2000 νέοι επιμελητές συνδέθηκαν στον ιστότοπο μας για πρώτη φορά. Μπορείτε να δείτε τους νεότερους επιμελητές της ιστοσελίδας μας στον παρακάτω σύνδεσμο',
      '(σύνδεσμος)',
      'Σας ευχαρισούμε'
    ]
  }
];

function AnouncementsContainer() {
  const [openTabs, setOpenTabs] = useState(Array(announcements.length).fill(false));

  const opendropdowntab = (index) => {
    setOpenTabs((prev) => {
      const newOpenTabs = [...prev];
      newOpenTabs[index] = !newOpenTabs[index];
      return newOpenTabs;
    });
  };

  return (
    <>
      <ul className={styles.anouncement_container}>
        {announcements.map((announcement, index) => (
          <li key={index} className={`${styles.dropdown_tab} ${openTabs[index] ? styles.open : ''}`}>
            <div className={styles.tab_title} onClick={() => opendropdowntab(index)}>
              <a>{announcement.date}</a>
              <a>{announcement.title}</a>
              <i className={`fa fa-caret-down ${openTabs[index] ? 'rotate' : ''}`}></i>
              <a><i className="fa-solid fa-circle"></i>Κηδεμόνες</a>
            </div>
            <div className={`${styles.dropdown} ${openTabs[index] ? styles.open : ''}`}>
              <li>
                {announcement.details.map((detail, i) => (
                  <a key={i}>{detail}</a>
                ))}
              </li>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}


  
  
  
  
  
  
  
  
  
  
  

  
    
  


