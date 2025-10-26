import React, { useEffect } from 'react';
import styles from './EditProfilePopup.module.css';
export default function EditProfilePopup({ isOpen, onClose, profileData, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = React.useState(profileData);
  
  
  
 useEffect(() => {
    if (isOpen) {
      setFormData(profileData);
      
    }
  }, [isOpen, profileData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  
  if (JSON.stringify(formData) !== JSON.stringify(profileData)) {
    onSave(formData);
  }

 

  onClose();
};



  

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup}>
        <button className={styles.close_button} onClick={onClose}>X</button>
        <h1>Επεξεργασία Προφίλ</h1>
        <form className={styles.edit_form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Όνομα:
            <input  type="text" name="firstName" value={formData.first_name} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Επώνυμο:
            <input type="text" name="lastName" value={formData.last_name} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Περιγραφή:
            <textarea  name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            E-mail:
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Περιοχή:
            <input type="text" name="living_area" value={formData.living_area} onChange={handleChange} />
          </label>
          <label className={styles.label}>
            Τηλέφωνο:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <button type="submit">Αποθήκευση</button>
          
        </form>
        
      </div>
      
    </div>

  );
}