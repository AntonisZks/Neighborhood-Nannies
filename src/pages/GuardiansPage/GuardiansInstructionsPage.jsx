
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./GuardiansInstructionsPage.module.css";

export default function GuardiansInstructionsPage() {
  return (
    <div className={styles.outer_container}>
      <Header className={styles.header} />
      <main className={styles.main}>
        <h1>Guardians Instructions Page</h1>
        <p>This is the Guardians Instructions page</p>
      </main>
      <Footer className={styles.footer} />
    </div>
  );
}