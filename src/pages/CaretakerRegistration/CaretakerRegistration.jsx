import React, { useState } from 'react';
import styles from './CaretakerRegistration.module.css';
import Logo from '../../components/Logo/Logo';
import SmallFooter from '../../components/SmallFooter/SmallFooter';



export default function CaretakerRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    birthDate: '',
    address: '',
    education: '',
    experience: '',
    availability: '',
    phone: '',
    userType: 'caretaker',
    termsAccepted: false,
    captcha: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Logo className={styles.logo}/>
      <div className={styles.centered_container}>
        <div className={styles.form_container}>
          <h1>Εγγραφή Επιμελητή</h1>
          <form onSubmit={handleSubmit} className={styles.login_form}>
            <div className={styles.grid_container}>
              <div className={styles.input_container}>
                <label htmlFor="fullName">Ονοματεπώνυμο</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="password">Κωδικός πρόσβασης</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="gender">Φύλο</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.input_container}>
                <label htmlFor="birthDate">Ηλικία</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="address">Περιοχή εξυπηρέτησης</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="education">Επίπεδο σπουδών/Ειδίκευση</label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="experience">Εμπειρία και συστάσεις</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label htmlFor="phone">Τηλέφωνο επικοινωνίας</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.input_container}>
                <label>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  Αποδοχή όρων χρήσης
                </label>
              </div>
            </div>
            <div className={styles.button_container}> 
              <button  className={styles.submitButton} onClick={()=>handleSubmit() ? window.location.href = '/caretaker-registration/define-availability': null} >Επόμενο</button>
            </div>   
          </form>
        </div>
      </div>
      <SmallFooter className={styles.footer}/>
    </>
  );
}