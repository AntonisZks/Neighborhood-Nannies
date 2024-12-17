import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from "./HomePage.module.css";


export default function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main_content}>
        <h1>Home Page</h1>
        <p>This is the home page</p>
      </main>
      <Footer />
    </>
  )
}
