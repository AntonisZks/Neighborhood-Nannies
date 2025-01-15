import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Contacts.module.css';

const Contacts = () => {
  return (
    <div className={styles.outer_container}>
      <Header />
      <main className={styles.main}>
        <h1>Επικοινωνία</h1>
        <p> {'Για οποιαδήποτε απορία, δυσκολία ή παρατήρηση, είμαστε στη διάθεσή σας. \n\n Επικοινωνήστε μαζί μας στα τηλέφωνα 210 3258080 - 210 3258090 ή στείλτε email στη διεύθυνση ntantades@yeka.gr.'} </p>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;