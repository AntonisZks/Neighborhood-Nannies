import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./CaretakersPage.module.css";

export default function CaretakersPage() {
  return (
    <div className={styles.outer_container}>
      <Header className={styles.header} />
      <main className={styles.main}>
        <h1>Caretakers Page</h1>
        <p>This is the Caretakers page</p>
      </main>
      <Footer className={styles.footer} />
    </div>
  );
}