import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Endcollaboration.module.css";

const Endcollaboration = ({ user }) => {
  const [comments, setComments] = useState("");
  const handleCommentsChange = (e) => setComments(e.target.value);
  const handleCancel = () => console.log('Cancellation process initiated');
  const handleConfirm = () => console.log('Collaboration ended');
  const handleRating = (star) => console.log(`Rated with ${star} stars`);

  return (
    <div className={styles.outer_container}>
      <Header />
      <div className={styles.container}>
        <div className={styles.cancelCollaboration}>
          <h2 className={styles.messageSection}>Λήξη Συνεργασίας</h2>
          <p className={styles.messageSection}>Πρόκειται να γίνει λήξη της συνεργασίας σας με τον επιμελητή. Επιθυμείτε να συνεχίσετε; {user}.</p>
          <div className={styles.checkboxContainer}>
        <input type="checkbox" id="confirm" />
        <label htmlFor="confirm">Επιβεβαιώνω </label>
        </div>
          <div className={styles.ratingSection}>
            <p>Aξιολόγηση:</p>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`${styles.star} star`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className={styles.descriptionNote}>Προαιρετικά προσθέστε μία σύντομη περιγραφή</p>
          <textarea
            value={comments}
            onChange={handleCommentsChange}
            placeholder="Προαιρετική περιγραφή"
            className={styles.descriptionInput}
          />
          <div className={styles.actions}>
            <button onClick={handleCancel} className={styles.actions_button}>Ακύρωση</button>
            <button onClick={handleConfirm} className={styles.actions_button}>Λήξη Συνεργασίας</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endcollaboration;