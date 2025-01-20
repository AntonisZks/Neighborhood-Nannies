import React, { useEffect } from 'react';
import styles from './EditProfilePopup.module.css';
import Schedule from '../ScheduleTable/ScheduleTable';
export default function EditProfilePopup({ isOpen, onClose, profileData, onSave,schedule, onScheduleUpdate }) {
  if (!isOpen) return null;

  const [formData, setFormData] = React.useState(profileData);
  var [newSchedule, setNewSchedule] = React.useState(schedule);
  
  
  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  useEffect(() => {
    setNewSchedule(schedule);
  }, [schedule]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onScheduleUpdate(newSchedule);
    onClose();
  };


  const handleScheduleUpdate1 = (updatedSchedule) => {
    newSchedule = updatedSchedule;
    console.log(updatedSchedule);
  };

  

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup}>
        <button className={styles.close_button} onClick={onClose}>X</button>
        <h2>Επεξεργασία Προφίλ</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Όνομα:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </label>
          <label>
            Επώνυμο:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <label>
            Περιγραφή:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Ηλικία:
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </label>
          <label>
            Περιοχή:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>
            Τηλέφωνο:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <button type="submit">Αποθήκευση</button>
        </form>
      </div>
      <div className={styles.table_container}>
                <h1>Επιλέξτε ώρες Διαθεσημότητας</h1>
                <Schedule
                clickable={true}
                monday={newSchedule.Monday}
                tuesday={newSchedule.Tuesday}
                wednesday={newSchedule.Wednesday}
                thursday={newSchedule.Thursday}
                friday={newSchedule.Friday}
                saturday={newSchedule.Saturday}
                sunday={newSchedule.Sunday}
                is_parent={false}
                onScheduleUpdate={handleScheduleUpdate1}
                />
              </div>
    </div>
  );
}