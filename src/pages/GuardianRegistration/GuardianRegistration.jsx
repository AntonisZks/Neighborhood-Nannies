import React, { useState, useEffect } from 'react';
import styles from './GuardianRegistration.module.css';
import Logo from '../../components/Logo/Logo';
import SmallFooter from '../../components/SmallFooter/SmallFooter';
import { useSearchParams, useNavigate } from 'react-router-dom';
import default_profile_image from '../../assets/imgs/default_profile_picture.jpg';

export default function GuardianRegistration() {
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
    userType: 'Guardian',
    termsAccepted: false,
    captcha: '',
    profileImage: default_profile_image,
    description: ''
  });

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
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleStep1Submit = (e) => {
    e.preventDefault();
    localStorage.setItem('guardianFormData', JSON.stringify(formData));
    navigate('/guardian-registration?step=2');
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    localStorage.setItem('guardianFormData', JSON.stringify(formData));
    navigate('/guardian-registration?step=3');
  };

  const [searchParams] = useSearchParams();
  const currentStep = searchParams.get('step');
  console.log('Current step:', currentStep);
  console.log('Form data:', formData);

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
                    <label htmlFor="firstName">Όνομα *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${styles.input_container} ${styles.last_name_container}`}>
                    <label htmlFor="lastName">Επώνυμο *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
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
                  </div>
                  <div className={`${styles.input_container} ${styles.gender_container}`}>
                    <label htmlFor="gender">Φύλο παιδιού *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                      <option value=""></option>
                      <option value="Αγόρι">Αγόρι</option>
                      <option value="Κορίτσι">Κορίτσι</option>
                      <option value="Άλλο">Άλλο</option>
                    </select>
                  </div>
                  <div className={`${styles.input_container} ${styles.birth_date_container}`}>
                    <label htmlFor="birthDate"> Γενέθλια Παιδιού * </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${styles.input_container} ${styles.address_container}`}>
                    <label htmlFor="address">Περιοχή διαμονής *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
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
                  </div>
                </div>
                <div className={styles.buttons_container}>
                  <a href='/guardian-registration?step=2' type="submit" className={styles.next_button} onClick={handleStep1Submit}>
                    Επόμενο
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
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
                    <img src={formData.profileImage} alt="profile picture" width="60px" />
                    <div className={styles.upload_button_container}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="profileImage"
                      />
                      <label htmlFor="profileImage">
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
                  <a href='/guardian-registration?step=3' type="submit" className={styles.next_button} onClick={handleStep2Submit}>
                    Επόμενο
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
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
                    <img src={formData.profileImage} alt="profile picture" width="60px" />
                    <h1>{formData.firstName} {formData.lastName}</h1>
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
                        {formData.address}
                      </li>
                    </ul>
                  </div>
                  <div className={styles.child_data_container}>
                    <h1>Στοιχεία Παιδιού</h1>
                    <ul>
                      <li>
                        <i class="fa-solid fa-venus-mars"></i>
                        <b>Φύλο Παιδιού:</b>
                        {formData.gender}
                      </li>
                      <li>
                        <i className="fa-solid fa-calendar-days"></i>
                        <b>Ημερομηνία Γέννησης:</b>
                        {formData.birthDate}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`${styles.input_container} ${styles.terms_container}`}>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  <h2>Αποδοχή όρων χρήσης</h2>
                </div>
                <div className={styles.buttons_container}>
                  <a href='/guardian-registration?step=2' type="submit" className={styles.previous_button}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Προηγούμενο
                  </a>
                  <a type="submit" className={`${styles.next_button} ${styles.signup_button}`}>
                    <i class="fa-solid fa-right-to-bracket"></i>
                    Εγγραφή
                  </a>
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