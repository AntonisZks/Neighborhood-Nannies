import React, { useEffect } from 'react';
import styles from './EditProfilePopup.module.css';
import Schedule from '../ScheduleTable/ScheduleTable';
export default function EditProfilePopup({ isOpen, onClose, profileData, onSave,schedule, onScheduleUpdate }) {
  if (!isOpen) return null;

  const [formData, setFormData] = React.useState(profileData);
  const [newSchedule, setNewSchedule] = React.useState(schedule);
  
  
 useEffect(() => {
    if (isOpen) {
      setFormData(profileData);
      setNewSchedule(schedule);
    }
  }, [isOpen, profileData, schedule]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  
  if (JSON.stringify(formData) !== JSON.stringify(profileData)) {
    onSave(formData);
  }

  if (JSON.stringify(newSchedule) !== JSON.stringify(schedule)) {
    onScheduleUpdate(newSchedule);
  }

  onClose();
};


  const handleScheduleUpdate = (updatedSchedule) => {
    setNewSchedule(updatedSchedule);
  
  };

  

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup}>
        <button className={styles.close_button} onClick={onClose}>X</button>
        <h1>Επεξεργασία Προφίλ</h1>
        <form className={styles.edit_form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Όνομα:
            <input type="text" name="firstName" value={formData.first_name} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Επώνυμο:
            <input type="text" name="lastName" value={formData.last_name} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Περιγραφή:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Ηλικία:
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Περιοχή:
            <input type="text" name="work_area" value={formData.work_area} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Τηλέφωνο:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <div className={styles.table_container}>
                <h2>Επιλέξτε ώρες Διαθεσημότητας</h2>
                <Schedule
                clickable={true}
                monday={schedule.Monday}
                tuesday={schedule.Tuesday}
                wednesday={schedule.Wednesday}
                thursday={schedule.Thursday}
                friday={schedule.Friday}
                saturday={schedule.Saturday}
                sunday={schedule.Sunday}
                is_parent={false}
                onScheduleUpdate={handleScheduleUpdate}
                />
          </div>
          <button type="submit">Αποθήκευση</button>
          
        </form>
        
      </div>
      
    </div>

  );
}