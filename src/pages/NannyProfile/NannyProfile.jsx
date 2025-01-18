import jimmy from '../../assets/imgs/jimmy.png';
import alex from '../../assets/imgs/alex.png';
import React, { useState } from "react";
import styles from "./NannyProfile.module.css";
import Header from "../../components/Header/Header";
import Schedule from "../../components/ScheduleTable/ScheduleTable";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import EditProfilePopup from "../../components/EditProfilePopup/EditProfilePopup";

export default function NannyProfile() {
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Αλέξανδρος",
    lastName: "Δημητρίου",
    description: "Είμαι ο Αλέξανδρος, σπουδάζω ψυχολογία και επιθύμω να αποκτήσω πρακτική εμπειρία στον τομέα της φροντίδας βρεφών και νηπίων. Αναζητώ αυτήν την εργασία για να εμπλουτίσω την εμπειρία μου και να υποστηρίξω τα οικονόμικά μου κατά την διάρκεια των σπουδών μου.",
    age: 25,
    address: "Περιστέρι",
    phone: "6912345678",
    email: "alexdimitriou@gmail.com"
  });

  const handleEditClick = () => {
    setEditPopupVisible(true);
  };

  const handleClosePopup = () => {
    setEditPopupVisible(false);
  };

  const handleSaveProfile = (updatedProfileData) => {
    setProfileData(updatedProfileData);
  };

  return (
    <div className={styles.outer_container}>
      <Header />
      <Breadcrumbs className={styles.breadcrumbs} />
      <div className={styles.profile_sidebar}>
        <div className={styles.profile_edit_button_container}>
          <button className={styles.profile_edit_button} onClick={handleEditClick}>
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
        <div className={styles.profile_data}>
          <img src={alex} alt="profile picture" />
          <h1>{profileData.firstName} {profileData.lastName}</h1>
        </div>
        <div className={styles.profile_description}>
          <h1>Σύντομη Περιγραφή</h1>
          <p>{profileData.description}</p>
        </div>
        <div className={styles.contact_data}>
          <h1>Στοιχεία Επικοινωνίας</h1>
          <ul>
            <li>
              <b>Ηλικία: </b>{profileData.age} ετών
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <b>Email: </b>{profileData.email}
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <b>Τηλέφωνο: </b>{profileData.phone}
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <b>Περιοχή Εργασίας: </b>{profileData.address}
            </li>
          </ul>
        </div>
        <div className={styles.logout_button_container}>
          <button className={styles.logout_button}>
            <i className="fa-solid fa-sign-out"></i>
            <p>Αποσύνδεση</p>
          </button>
        </div>
      </div>
      <div className={styles.right_side_content}>
        <div className={styles.inner_container}>
          <div className={`${styles.users_panel} ${styles.active_collaboration_panel}`}>
            <h1>Ενεργή Συνεργασία</h1>
            <ActiveCollaboration
              profile_picture={jimmy}
              first_name="Δημήτρης"
              last_name="Παπαδόπουλος"
              />
          </div>
          <div className={`${styles.users_panel} ${styles.finalized_declarations_panel}`}>
            <h1>Αιτήματα Συνεργασίας (8)</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={false}
                  />
                  </td>
                </tr>
              </tbody>
            </table>
            <a className={styles.all_link} href="#">Προβολή Όλων</a>
          </div>
          <div className={`${styles.users_panel} ${styles.previous_collaborations_panel}`}>
            <h1>Προηγούμενες Συνεργασίες (4)</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                    <PreviousCollaboration
                      profile_picture={jimmy}
                      first_name="Δημήτρης"
                      last_name="Παπαδόπουλος"
                      stars={1}
                      half_star={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <PreviousCollaboration
                      profile_picture={jimmy}
                      first_name="Δημήτρης"
                      last_name="Παπαδόπουλος"
                      stars={4}
                      half_star={false}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <PreviousCollaboration
                      profile_picture={jimmy}
                      first_name="Δημήτρης"
                      last_name="Παπαδόπουλος"
                      stars={3}
                      half_star={true}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <a className={styles.all_link} href="#">Προβολή Όλων</a>
          </div>
          <div className={`${styles.users_panel} ${styles.payments_panel}`}>
            <h1>Πληρωμές Κηδεμόνων (23)</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={false}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={false}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={jimmy}
                    first_name="Δημήτρης"
                    last_name="Παπαδόπουλος"
                    accepted={true}
                  />
                  </td>
                </tr>
              </tbody>
            </table>
            <a className={styles.all_link} href="#">Προβολή Όλων</a>
          </div>
          <div className={`${styles.users_panel} ${styles.calendar_panel}`}>
            <h1>Ωρολόγιο Πρόγραμμα</h1>
            <Schedule
                monday={schedule[0].Monday}
                tuesday={schedule[0].Tuesday}
                wednesday={schedule[0].Wednesday}
                thursday={schedule[0].Thursday}
                friday={schedule[0].Friday}
                saturday={schedule[0].Saturday}
                sunday={schedule[0].Sunday}
            />
          </div>
        </div>
      </div>
      {isEditPopupVisible && (
        <EditProfilePopup
          isOpen={isEditPopupVisible}
          onClose={handleClosePopup}
          profileData={profileData}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}

function ActiveCollaboration(props) {
  return (
    <div className={styles.active_collaboration}>
      <img src={props.profile_picture} alt="profile picture" />
      <h1>{props.first_name} {props.last_name}</h1>
      <p>Πριν από 3 ημέρες</p>
      <button className={styles.view_profile_button}>
        <i className="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}

function PreviousCollaboration(props) {
  return (
    <div className={styles.previous_collaboration}>
      <img src={props.profile_picture} alt="profile picture" />
      <h1>{props.first_name} {props.last_name}</h1>
      <p>Έληξε πριν από 3 ημέρες</p>
      <div className={styles.rate_container}>
        <div className={styles.stars_container}>
          {[...Array(props.stars)].map((_, index) => (
            <i key={index} className="fa-solid fa-star"></i>
          ))}
          {props.half_star && <i className="fa-regular fa-star-half-stroke"></i>}
          {[...Array(5 - props.stars - (props.half_star ? 1 : 0))].map((_, index) => (
            <i key={index} className="fa-regular fa-star"></i>
          ))}
        </div>
        <div className={styles.grade_container}>
          <p>{props.stars}/5</p>
        </div>
      </div>
    </div>
  )
}

function Declaration(props) {
  return (
    <div className={styles.declaration}>
      <img src={props.profile_picture} alt="profile picture" />
      <h1>{props.first_name} {props.last_name}</h1>
      <div className={styles.description_container}>
        {props.accepted === null
          ? <p className={styles.state}>Εκκρεμεί Οριστική Υποβολή</p>
          : props.accepted 
            ? <>
                <p className={styles.description}>Έχει οριστικοποιηθεί</p>
                <p className={`${styles.accepted} ${styles.state}`}>
                  Έγινε αποδεκτή
                  <i className="fa-solid fa-check"></i>
                </p> 
              </>
            : <>
                <p className={styles.description}>Έχει οριστικοποιηθεί</p>
                <p className={`${styles.rejected} ${styles.state}`}>
                  Απορρίφθηκε
                  <i className="fa-solid fa-xmark"></i>
                </p>
              </>
        }
      </div>
      <button className={styles.view_declaration_button}>
        <i className="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}
