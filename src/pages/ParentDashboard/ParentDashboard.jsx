import jimmy from '../../assets/imgs/jimmy.png';
import alex from '../../assets/imgs/alex.png';

import Header from '../../components/Header/Header';
import PaymentCalendar from '../../components/PaymentCalendar/PaymentCalendar';
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import styles from './ParentDashboard.module.css';
import EditProfilePopup from "../../components/EditProfilePopup/EditProfilePopup";

import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function ParentDashboard() {
  const [user, setUser] = useState(null);
  const [previousCollaborations, setPreviousCollaborations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [finalizedDeclarations, setFinalizedDeclarations] = useState([]);
  const [unfinalizedDeclarations, setUnfinalizedDeclarations] = useState([]);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const parent_id = searchParams.get('pid');

  const signout = () => {
    window.localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }

  const searchNannies = () => {
    navigate('/search');
  }

  const handleEditClick = () => {

  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Search for the parent with the given id
        const parent = parentsArray.find(parent => parent.id === parent_id);
        setUser(parent);

        // Get the previous collaborations of the parent
        if (parent) {
          const previousCollaborationsSnapshot = await getDocs(collection(firestore, `Parents/${parent_id}/previous_collaborations`));
          const previousCollaborationsArray = previousCollaborationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPreviousCollaborations(previousCollaborationsArray);
        }

        // Get the payments of the parent
        if (parent) {
          const paymentsSnapshot = await getDocs(collection(firestore, `Parents/${parent_id}/payments`));
          const paymentsArray = paymentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPayments(paymentsArray);
        }

        // Get the finalized declarations of the parent
        if (parent) {
          const finalizedDeclarationsSnapshot = await getDocs(collection(firestore, `Parents/${parent_id}/finalized_declarations`));
          const finalizedDeclarationsArray = finalizedDeclarationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setFinalizedDeclarations(finalizedDeclarationsArray);
        }

        // Get the unfinalized declarations of the parent
        if (parent) {
          const unfinalizedDeclarationsSnapshot = await getDocs(collection(firestore, `Parents/${parent_id}/unfinalized_declarations`));
          const unfinalizedDeclarationsArray = unfinalizedDeclarationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUnfinalizedDeclarations(unfinalizedDeclarationsArray);
        }
      } 
      catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [parent_id])

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }
  
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
          <img src={user.profileImageUrl} alt="profile picture" />
          <h1>{user.first_name} {user.last_name}</h1>
        </div>
        <div className={styles.profile_description}>
          <h1>Σύντομη Περιγραφή</h1>
          <p>{user.description}</p>
        </div>
        <div className={styles.contact_data}>
          <h1>Στοιχεία Επικοινωνίας</h1>
          <ul>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <b>Email: </b>{user.email}
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <b>Τηλέφωνο: </b>{user.phone}
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <b>Περιοχή: </b>{user.address}
            </li>
          </ul>
        </div>
        <div className={styles.child_data}>
          <h1>Χαρατηριστικά Παιδιού</h1>
          <ul>
            <li>
              <i className="fa-solid fa-venus-mars"></i>
              <b>Φύλλο: </b>{user.child_gender}
            </li>
            <li>
              <i className="fa-regular fa-calendar-days"></i>
              <b>Ηλικία: </b>{user.child_age}
            </li>
          </ul>
        </div>
        <div className={styles.logout_button_container}>
          <button onClick={signout} className={styles.logout_button}>
            <i className="fa-solid fa-sign-out"></i>
            <p>Αποσύνδεση</p>
          </button>
        </div>
      </div>
      <div className={styles.right_side_content}>
        <button onClick={searchNannies} className={styles.search_button}>
          <i className="fa-solid fa-search"></i>
          <p>Αναζήτηση Επιμελητών</p>
        </button>
        <div className={styles.inner_container}>
          <div className={`${styles.users_panel} ${styles.active_collaboration_panel}`}>
            <h1>Ενεργή Συνεργασία</h1>
            {user.active_collaboration_id !== "" ? (
              <ActiveCollaboration 
                parent_id={user.id} 
                nanny_id={user.active_collaboration_id}
                start_date={user.active_collaboration_start_date}
              />
            ) : (
              <div className={styles.no_active_collaboration_container}>
                <h1>Δεν υπάρχει ενεργή συνεργασία</h1>
              </div>
            )}
          </div>
          <div className={`${styles.users_panel} ${styles.finalized_declarations_panel}`}>
            <h1>Οριστικοποιημένες Δηλώσεις ({finalizedDeclarations.length})</h1>
            {finalizedDeclarations.length > 0 ? (
              <>
                <table>
                  <tbody>
                    {finalizedDeclarations.map(declaration => (
                      <tr key={declaration.id}>
                        <td>
                          <Declaration
                            nanny_id={declaration.nanny_id}
                            accepted={declaration.accepted}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a className={styles.all_link} href="#">Προβολή Όλων</a>
              </>
            ) : (
              <div className={styles.no_finalized_declarations_container}>
                <h2>Δεν υπάρχουν οριστικοποιημένες δηλώσεις</h2>
              </div>
            )}
          </div>
          <div className={`${styles.users_panel} ${styles.unfinalized_declarations_panel}`}>
            <h1>Δηλώσεις που εκκρεμούν ({unfinalizedDeclarations.length})</h1>
            {unfinalizedDeclarations.length > 0 ? (
              <>
                <table>
                  <tbody>
                    {unfinalizedDeclarations.map(declaration => (
                      <tr key={declaration.id}>
                        <td>
                          <Declaration
                            nanny_id={declaration.nanny_id}
                            accepted={declaration.accepted}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a className={styles.all_link} href="#">Προβολή Όλων</a>
              </>
            ) : (
              <div className={styles.no_unfinalized_declarations_container}>
                <h2>Δεν υπάρχουν δηλώσεις που εκκρεμούν</h2>
              </div>
            )}
          </div>
          <div className={`${styles.users_panel} ${styles.previous_collaborations_panel}`}>
            <h1>Προηγούμενες Συνεργασίες ({previousCollaborations.length})</h1>
            {previousCollaborations.length > 0 ? (
              <>
                <table>
                  <tbody>
                    {previousCollaborations.map(collaboration => (
                      <tr key={collaboration.id}>
                        <td>
                          <PreviousCollaboration 
                            nanny_id={collaboration.nanny_id} 
                            end_date={collaboration.end_date}
                            stars={collaboration.stars}
                            half_star={collaboration.half_star}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a className={styles.all_link} href="#">Προβολή Όλων</a>
              </>
            ) : (
              <div className={styles.no_previous_collaborations_container}>
                <h2>Δεν υπάρχουν προηγούμενες συνεργασίες</h2>
              </div>
            )}
            
          </div>
          <div className={`${styles.users_panel} ${styles.payments_panel}`}>
            <h1>Πληρωμές Επιμελητών ({payments.length})</h1>
            {payments.length > 0 ? (
              <>
                <table>
                  <tbody>
                    {payments.slice(0, Math.min(payments.length, 6)).reverse().map(payment => (
                      <tr key={payment.id}>
                        <td>
                          <Payment 
                            nanny_id={payment.nanny_id} 
                            accepted={payment.accepted}
                            date={payment.date}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a className={styles.all_link} href="#">Προβολή Όλων</a>
              </>
            ) : (
              <div className={styles.no_payments_container}>
                <h2>Δεν υπάρχουν πληρωμές</h2>
              </div>
            )}
          </div>
          <div className={`${styles.users_panel} ${styles.calendar_panel}`}>
            <h1>Ημερολόγιο</h1>
            <PaymentCalendar />
          </div>
        </div>
      </div>
      {isEditPopupVisible && user && (
        <EditProfilePopup
          isOpen={isEditPopupVisible}
          onClose={handleClosePopup}
          profileData={user}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}

function ActiveCollaboration(props) {
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNannyByID = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Get the nanny with the given id
        const nanny = nanniesArray.find(nanny => nanny.id === props.nanny_id);
        setNanny(nanny);
      }
      catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      finally {
        console.log(nanny);
        setLoading(false);
      }
    }

    fetchNannyByID();

  }, [])

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }

  const viewProfile = () => {
    navigate(`/p_dashboard/active-collaboration-overview?nid=${nanny.id}`);
  }
  

  return (
    <div className={styles.active_collaboration}>
      <img src={nanny.profileImageUrl} alt="profile picture" />
      <h1>{nanny.first_name} {nanny.last_name}</h1>
      <p>Ξεκίνησε στις {props.start_date}</p>
      <button onClick={viewProfile} className={styles.view_profile_button}>
        <i className="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}

function PreviousCollaboration(props) {
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNannyByID = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Get the nanny with the given id
        const nanny = nanniesArray.find(nanny => nanny.id === props.nanny_id);
        setNanny(nanny);
      }
      catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      finally {
        console.log(nanny);
        setLoading(false);
      }
    }

    fetchNannyByID();

  }, []);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }
  
  return (
    <div className={styles.previous_collaboration}>
      <img src={nanny.profileImageUrl} alt="profile picture" />
      <h1>{nanny.first_name} {nanny.last_name}</h1>
      <p>Έληξε στις {props.end_date}</p>
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
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNannyByID = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Get the nanny with the given id
        const nanny = nanniesArray.find(nanny => nanny.id === props.nanny_id);
        setNanny(nanny);
      }
      catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      finally {
        console.log(nanny);
        setLoading(false);
      }
    }
    fetchNannyByID();
  }, [])

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }

  return (
    <div className={styles.declaration}>
      <img src={nanny.profileImageUrl} alt="profile picture" />
      <h1>{nanny.first_name} {nanny.last_name}</h1>
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

function Payment(props) {
  const [nanny, setNanny] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNannyByID = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Get the nanny with the given id
        const nanny = nanniesArray.find(nanny => nanny.id === props.nanny_id);
        setNanny(nanny);
      }
      catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      finally {
        console.log(nanny);
        setLoading(false);
      }
    }
    fetchNannyByID();
  }, [])

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }

  return (
    <div className={styles.declaration}>
      <img src={nanny.profileImageUrl} alt="profile picture" />
      <h1>{nanny.first_name} {nanny.last_name}</h1>
      <div className={styles.description_container}>
        <p className={styles.description}>Έγινε στις {props.date}</p>
        <i className="fa-solid fa-circle"></i>
        {props.accepted ? (
          <p className={`${styles.accepted} ${styles.state}`}>
            Έγινε αποδεκτή
            <i className="fa-solid fa-check"></i>
          </p>
        ) : (
          <p className={`${styles.rejected} ${styles.state}`}>
            Απορρίφθηκε
            <i className="fa-solid fa-xmark"></i>
          </p>
        )}
      </div>
      <button className={styles.view_declaration_button}>
        <i className="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}