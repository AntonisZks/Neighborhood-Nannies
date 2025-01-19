import React from "react";
import styles from "./VoucherCard.module.css";

const VoucherCard = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.cardContainer}>
        {/* Header */}
        <div className={styles.header}>Εξαργύρωση Ποσού Μηνιαίας Πληρωμής</div>

        {/* Caregiver Info */}
        <div className={styles.infoGroup}>
          <div className={styles.infoTitle}>Πληροφορίες Κηδεμόνα</div>
          <p className={styles.infoText}>Email: dimitrispapadopoulos@gmail.com</p>
          <p className={styles.infoText}>Τηλέφωνο: 6962881364</p>
          <p className={styles.infoText}>Περιοχή Διαμονής: Περιστέρι</p>
        </div>

        {/* Payment Info */}
        <div className={styles.infoGroup}>
          <div className={styles.infoTitle}>Πληροφορίες Πληρωμής</div>
          <p className={styles.infoText}>Δηλωμένο ωρομίσθιο: 8€</p>
          <p className={styles.infoText}>Δηλωμένες ώρες εργασίας: 24</p>
          <p className={styles.infoText}>Ώρες που εργάστηκε: 24</p>
          <div className={styles.paymentSection}>
            Συνολικό μηνιαίο ποσό:
            <div className={styles.totalPayment}>192€</div>
          </div>
        </div>

        {/* Confirmation */}
        <div className={styles.confirmation}>
          Επιβεβαιώνετε ότι ο επαγγελματίας παρέχει τις συμφωνημένες υπηρεσίες με επιτυχία κατά τη
          διάρκεια του μήνα, εκπληρώνοντας όλες τις υποχρεώσεις σας σύμφωνα με τη συμφωνία;
        </div>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <label>Επιβεβαίωση</label>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.rejectButton}`}>
            Απόρριψη
          </button>
          <button className={`${styles.button} ${styles.acceptButton}`}>
            Εξαργύρωση Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
