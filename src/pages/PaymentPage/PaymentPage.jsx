import React from "react";

import styles from "./PaymentPage.module.css";

import Header from "../../components/Header/Header";
import PaymentInfoPanel from "../../components/PaymentInfoPanel/PaymentInfoPanel";
import PaymentCalendar from "../../components/PaymentCalendar/PaymentCalendar";

export default function PaymentPage() {
  return (
    <div className={styles.outer_container}>
      <Header />
      <main>
        <PaymentInfoPanel />
        <PaymentCalendar />
      </main>
      <div className={styles.buttons_container}>
        <button className={styles.cancel_button}>
          <p>Ακύρωση</p>
        </button>
        <button className={styles.send_button}>
          <i class="fa-solid fa-paper-plane"></i>
          <p>Αποστολή Voucher</p>
        </button>
      </div>
    </div>
  );
}
