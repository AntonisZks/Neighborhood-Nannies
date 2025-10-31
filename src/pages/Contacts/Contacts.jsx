import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ChatButton from '../../components/ChatPopup/ChatButton';
import ChatPopup from '../../components/ChatPopup/ChatPopup';
import styles from './Contacts.module.css';

const Contacts = () => {
  return (
    <div className={styles.outer_container}>
      <ChatButton />
      <ChatPopup />
      <Header />
      <main className={styles.main}>
        <h1>Επικοινωνία</h1>
        <div className={styles.parallelogram}>
          <p dangerouslySetInnerHTML={{ __html: 'Για οποιαδήποτε απορία, δυσκολία ή παρατήρηση, είμαστε στη διάθεσή σας.<br /> Επικοινωνήστε μαζί μας στα τηλέφωνα 210 3258080 - 210 3258090 ή στείλτε email στη διεύθυνση ntantades@yeka.gr.' }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;