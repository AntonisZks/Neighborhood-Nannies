import React, { useState, useEffect } from 'react';
import styles from './GuardianRegistration.module.css';
import Logo from '../../components/Logo/Logo';
import SmallFooter from '../../components/SmallFooter/SmallFooter';
import { useSearchParams, useNavigate } from 'react-router-dom';
import default_profile_image from '../../assets/imgs/default_profile_picture.jpg';

import { firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function GuardianRegistration() {
  const [formData, setFormData] = useState({
    active_collaboration_id: '',
    active_collaboration_start_date: '',
    email: '',
    password: '',
    child_gender: '',
    child_birth_date: '',
    living_area: '',
    phone: '',
    profileImageUrl: default_profile_image,
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedFormData = localStorage.getItem('guardianFormData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    document.getElementById('profileImageUrl').click();
  };

  const navigate = useNavigate();

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'Το όνομα είναι υποχρεωτικό';
    if (!formData.last_name) newErrors.last_name = 'Το επώνυμο είναι υποχρεωτικό';
    if (!formData.email) newErrors.email = 'Το email είναι υποχρεωτικό';
    if (!formData.password) newErrors.password = 'Ο κωδικός πρόσβασης είναι υποχρεωτικός';
    if (!formData.child_gender) newErrors.child_gender = 'Το φύλο παιδιού είναι υποχρεωτικό';
    if (!formData.child_birth_date) newErrors.child_birth_date = 'Η ημερομηνία γέννησης είναι υποχρεωτική';
    if (!formData.living_area) newErrors.living_area = 'Η περιοχή διαμονής είναι υποχρεωτική';
    if (!formData.phone) newErrors.phone = 'Το τηλέφωνο είναι υποχρεωτικό';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      localStorage.setItem('guardianFormData', JSON.stringify(formData));
      navigate('/guardian-registration?step=2');
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    localStorage.setItem('guardianFormData', JSON.stringify(formData));
    navigate('/guardian-registration?step=3');
  };

  const addParentToDatabase = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'Parents'), formData);
      const parentId = docRef.id;
      localStorage.setItem('parentID', parentId);
      navigate(`/p_dashboard?pid=${parentId}`);
    } 
    catch (error) {
      console.error('Error adding document: ', error);
      alert('Παρουσιάστηκε σφάλμα κατά την εγγραφή. Παρακαλώ δοκιμάστε ξανά.');
    }
  };

  const [searchParams] = useSearchParams();
  const currentStep = searchParams.get('step');

  return (
    <>
      <Logo className={styles.logo}/>
      <div className={styles.centered_container}>
        <div className={styles.form_container}>
          <h1>Εγγραφή Κηδεμόνα </h1>
          {currentStep === '1' ? (
            <>
              <div className={styles.progress_steps_container}>
                <a className={styles.current_step}>1</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.next_step} href="">2</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.next_step} href="">3</a>
              </div>
              <form onSubmit={handleStep1Submit} className={`${styles.login_form} ${styles.inner_container}`}>
                <div className={styles.grid_container}>
                  <div className={`${styles.input_container} ${styles.first_name_container}`}>
                    <label htmlFor="first_name">Όνομα *</label>
                    <input
                      type="text"
                      id="first_naame"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                    {errors.first_name && <span className={styles.error}>{errors.first_name}</span>}
                  </div>
                  <div className={`${styles.input_container} ${styles.last_name_container}`}>
                    <label htmlFor="last_name">Επώνυμο *</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                    {errors.last_name && <span className={styles.error}>{errors.last_name}</span>}
                  </div>
                  <div className={`${styles.input_container} ${styles.email_container}`}>
                    <label htmlFor="email">Ηλεκτρονικό Ταχυδρομείο (Email) *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>
                  <div className={`${styles.input_container} ${styles.password_container}`}>
                    <label htmlFor="password">Κωδικός πρόσβασης *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                  </div>
                  <div className={`${styles.input_container} ${styles.gender_container}`}>
                    <label htmlFor="child_gender">Φύλο παιδιού *</label>
                    <select name="child_gender" value={formData.child_gender} onChange={handleChange} required>
                      <option value=""></option>
                      <option value="Αγόρι">Αγόρι</option>
                      <option value="Κορίτσι">Κορίτσι</option>
                      <option value="Άλλο">Άλλο</option>
                    </select>
                    {errors.child_gender && <span className={styles.error}>{errors.child_gender}</span>}
                  </div>
                  <div className={`${styles.input_container} ${styles.birth_date_container}`}>
                    <label htmlFor="child_birth_date"> Γενέθλια Παιδιού * </label>
                    <input
                      type="date"
                      id="child_birth_date"
                      name="child_birth_date"
                      value={formData.child_birth_date}
                      onChange={handleChange}
                      required
                    />
                    {errors.child_birth_date && <span className={styles.error}>{errors.child_birth_date}</span>}
                  </div>
                  <div className={`${styles.input_container} ${styles.address_container}`}>
                    <label htmlFor="living_area">Περιοχή διαμονής *</label>
                    <input
                      type="text"
                      id="living_area"
                      name="living_area"
                      value={formData.living_area}
                      onChange={handleChange}
                      required
                    />
                    {errors.living_area && <span className={styles.error}>{errors.living_area}</span>}
                  </div>
                  <div className={`${styles.input_container} ${styles.phone_container}`}>
                    <label htmlFor="phone">Τηλέφωνο επικοινωνίας *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>
                </div>
                <div className={styles.buttons_container}>
                  <button type="submit" className={styles.next_button}>
                    Επόμενο
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            </>
          ) : currentStep === '2' ? (
            <>
              <div className={styles.progress_steps_container}>
                <a className={styles.previous_step} href="/guardian-registration?step=1">1</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.current_step}>2</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.next_step} href="">3</a>
              </div>
              <form onSubmit={handleStep2Submit} className={`${styles.login_form} ${styles.inner_container}`}>
                <div className={styles.image_select_container}>
                  <h1>Επιλέξτε την εικόνα προφίλ σας</h1>
                  <div className={styles.input_container}>
                    <img
                      src={formData.profileImageUrl}
                      alt="profile picture"
                      width="60px"
                      style={{ cursor: 'pointer' }}
                    />
                    <div className={styles.upload_button_container}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="profileImageUrl"
                      />
                      <label onClick={handleImageClick} htmlFor="profileImageUrl">
                        <i className="fa-solid fa-pencil"></i>
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.description_container}>
                  <h1>Δώστε μία περιγραφή για το σκοπό σας</h1>
                  <div className={styles.input_container}>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className={styles.buttons_container}>
                  <a href='/guardian-registration?step=1' type="submit" className={styles.previous_button}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Προηγούμενο
                  </a>
                  <button type="submit" className={styles.next_button}>
                    Επόμενο
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className={styles.progress_steps_container}>
                <a className={styles.previous_step} href="/guardian-registration?step=1">1</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.previous_step} href="/guardian-registration?step=2">2</a>
                <i className="fa-solid fa-arrow-right"></i>
                <a className={styles.current_step}>3</a>
              </div>
              <div className={styles.inner_container}>
                <div className={styles.profile_overview_container}>
                  <div className={styles.profile_image_name_container}>
                    <img src={formData.profileImageUrl} alt="profile picture" width="60px" />
                    <h1>{formData.first_name} {formData.last_name}</h1>
                  </div>
                  <div className={styles.overview_description_container}>
                    <h1>Σύντομη Περιγραφή</h1>
                    {formData.description === '' ? (
                      <h3 className={styles.no_description}>Δεν έχει δοθεί περιγραφή</h3>
                    ) : (
                      <p>{formData.description}</p>
                    )}
                  </div>
                  <div className={styles.contact_data_container}>
                    <h1>Στοιχεία Επικοινωνίας</h1>
                    <ul>
                      <li>
                        <i className="fa-solid fa-envelope"></i>
                        <b>Email:</b>
                        {formData.email}
                      </li>
                      <li>
                        <i className="fa-solid fa-phone"></i>
                        <b>Τηλέφωνο:</b>
                        {formData.phone}
                      </li>
                      <li>
                        <i className="fa-solid fa-location-dot"></i>
                        <b>Περιοχή:</b>
                        {formData.living_area}
                      </li>
                    </ul>
                  </div>
                  <div className={styles.child_data_container}>
                    <h1>Στοιχεία Παιδιού</h1>
                    <ul>
                      <li>
                        <i className="fa-solid fa-venus-mars"></i>
                        <b>Φύλο Παιδιού:</b>
                        {formData.child_gender}
                      </li>
                      <li>
                        <i className="fa-solid fa-calendar-days"></i>
                        <b>Ημερομηνία Γέννησης:</b>
                        {formData.child_birth_date}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`${styles.input_container} ${styles.terms_container}`}>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    required
                  />
                  <h2>Αποδοχή όρων χρήσης</h2>
                </div>
                <div className={styles.buttons_container}>
                  <a href='/guardian-registration?step=2' type="submit" className={styles.previous_button}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Προηγούμενο
                  </a>
                  <button onClick={addParentToDatabase} type="submit" className={`${styles.next_button} ${styles.signup_button}`}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    Εγγραφή
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <SmallFooter className={styles.footer}/>
    </>
  );
}