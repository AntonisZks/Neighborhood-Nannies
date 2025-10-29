
import styles from "./NannyProfile.module.css";
import Header from "../../components/Header/Header";
import Schedule from "../../components/ScheduleTable/ScheduleTable";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import EditProfilePopup from "../../components/EditProfilePopupNanny/EditProfilePopup";
import jimmy from '../../assets/imgs/jimmy.png';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs,getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc} from "firebase/firestore";


export default function NannyProfile() {
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [CollaborationRequests, setCollaborationRequests] = useState([]);
  const [ActiveCollaboration, setActiveCollaboration] = useState([]);
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const nanny_id = searchParams.get('nid');
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  
  
  
  const signout = () => {
    window.localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }

  const handleEditClick = () => {
    setIsEditPopupVisible(true);
  }

  const handleClosePopup = () => {
    setIsEditPopupVisible(false);
  }

  const handleSaveProfile = async (newUser) => {

    try {
      const docref= doc(firestore, "Nannies", nanny_id);
      const updatedFields = {};
      if (newUser.firstName !== undefined) updatedFields.first_name = newUser.firstName;
      if (newUser.lastName !== undefined) updatedFields.last_name = newUser.lastName;
      if (newUser.description !== undefined) updatedFields.description = newUser.description;
      if (newUser.work_area !== undefined) updatedFields.work_area = newUser.work_area;
      if (newUser.phone !== undefined) updatedFields.phone = newUser.phone;
      if (newUser.age !== undefined) updatedFields.age = newUser.age;
      await updateDoc(docref,updatedFields); 
        
          

      
      setUser(newUser);
      
      console.log("Profile saved!");
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
  };
  const handleScheduleUpdate = async (updatedSchedule) => {
  try {
    if (schedule.length === 0) {
      console.error("No schedule document found to update");
      return;
    }
    
    const scheduleDocId = schedule[0].id; // use the actual doc ID
    console.log("Updating schedule with ID:", schedule);
   
      
    const scheduleData = {
      Monday: updatedSchedule[0].Monday || schedule[0].Monday,
      Tuesday: updatedSchedule[0].Tuesday || schedule[0].Tuesday,
      Wednesday: updatedSchedule[0].Wednesday || schedule[0].Wednesday,
      Thursday: updatedSchedule[0].Thursday || schedule[0].Thursday,
      Friday: updatedSchedule[0].Friday || schedule[0].Friday,
      Saturday: updatedSchedule[0].Saturday || schedule[0].Saturday,
      Sunday: updatedSchedule[0].Sunday || schedule[0].Sunday,
    };
    const scheduleRef = doc(firestore, "Nannies", nanny_id, "schedule", scheduleDocId);
     console.log("Schedule document updated with ID:", [scheduleData]);
    await updateDoc(scheduleRef, scheduleData);
   
  


    console.log("Updated schedule data:", schedule);
   
    console.log("Schedule updated successfully!");
  } catch (error) {
    console.error("Error updating schedule: ", error);
  }
};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Search for the parent with the given id
        const nanny = nanniesArray.find(nanny => nanny.id === nanny_id);
        setUser(nanny);
        
        if (nanny) {
          const reviewsSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/reviews`));
          const reviewsArray = reviewsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReviews(reviewsArray);
          
        }
        if (nanny) {
          const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/schedule`));
          const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedule(scheduleArray);
          
        }
        if (nanny) {
          const CollaborationRequestsSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/collaboration_requests`));
          const CollaborationRequestsArray = CollaborationRequestsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setCollaborationRequests(CollaborationRequestsArray);
        }
        
        if (nanny) {
          const ActiveCollaborationSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/active_collaboration`));
          const ActiveCollaborationArray = ActiveCollaborationSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setActiveCollaboration(ActiveCollaborationArray);
        }

        // Get the payments of the parent
        if (nanny) {
          const paymentsSnapshot = await getDocs(collection(firestore, `Nannies/${nanny_id}/payments`));
          const paymentsArray = paymentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPayments(paymentsArray);
        }
        
      } 
      

      
       
      
      catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [nanny_id])
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
          <h1>
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <div className={styles.profile_description}>
          <h1>Σύντομη Περιγραφή</h1>
          <p>{user.description}</p>
        </div>
        <div className={styles.user_data}>
          <h1>Χαρακτηριστικά</h1>
          <ul>
            <li>
              <i className="fa-regular fa-calendar-days"></i>
              <b>Ηλικία:</b>
              {user.age}
            </li>
            <li>
              <i className="fa-solid fa-graduation-cap"></i>
              <b>Σπουδές:</b>
              {user.education}
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <b>Περιοχή Εργασίας:</b>
              {user.work_area}
            </li>
          </ul>
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
        <div className={styles.inner_container}>
          <div className={`${styles.users_panel} ${styles.active_collaboration_panel}`}>
            <h1>Ενεργή Συνεργασία</h1>
                {ActiveCollaboration
                .map((active_collaboration) => (
                    <tr key={active_collaboration.id}>
                        <Active_Collaboration
                          parent_id={active_collaboration.parent_id}
                        />
                    </tr>
                  ))}
          </div>
          <div className={`${styles.users_panel} ${styles.finalized_declarations_panel}`}>
            <h1>Αιτήματα Συνεργασίας ({CollaborationRequests.length})</h1>
          {CollaborationRequests.length > 0 ? (
          <>
            <table>
              <tbody>
                {CollaborationRequests
                  .slice() // make a shallow copy so you don’t mutate state
                  .sort((a, b) => {
                    const dateA = a.createdAt?.seconds || 0;
                    const dateB = b.createdAt?.seconds || 0;
                    return dateB - dateA; // newest first
                  })
                  .map((declaration) => (
                    <tr key={declaration.id}>
                      <td>
                        <Declaration
                          parent_id={declaration.parent_id}
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
            <h1>Πληρωμές Κηδεμόνων ({payments.length})</h1>
              {payments.length > 0 ? (
                <>
                  <table>
                    <tbody>
                      {payments.slice(0, Math.min(payments.length, 6)).reverse().map(payment => (
                        <tr key={payment.id}>
                          <td>
                            <Payment 
                              parent_id={payment.parent_id} 
                              accepted={payment.accepted}
                              payment_id={payment.id}
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
            <h1>Ωρολόγιο Πρόγραμμα</h1>
            <Schedule
                clickable={false}
                monday={schedule[0].Monday}
                tuesday={schedule[0].Tuesday}
                wednesday={schedule[0].Wednesday}
                thursday={schedule[0].Thursday}
                friday={schedule[0].Friday}
                saturday={schedule[0].Saturday}
                sunday={schedule[0].Sunday}
                onScheduleUpdate={handleScheduleUpdate}
            />
          </div>
        </div>
      </div>
      {isEditPopupVisible && (
        <EditProfilePopup
          isOpen={isEditPopupVisible}
          onClose={handleClosePopup}
          profileData={user}
          onSave={handleSaveProfile}
          schedule={schedule[0]}
          onScheduleUpdate={handleScheduleUpdate}
        />
      )}
    </div>
  )
}

function Active_Collaboration(props) {
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get the parent's info
        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const parent = parentsArray.find(parent => parent.id === props.parent_id);
        setParent(parent);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!parent) return <p>Parent not found</p>;

  return (
    <div className={styles.active_collaboration}>
      <img src={parent.profileImageUrl} alt="profile picture" />
      <h1>{parent.first_name} {parent.last_name}</h1>
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
  const [parent, setParent] = useState(null);
  const [accepted, setAccepted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const nanny_id=searchParams.get('nid');

  const handleViewClick = () => {
    navigate(`/nanny-profile/collaboration-request-nanny?step=1&pid=${props.parent_id}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get the parent's info
        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const parent = parentsArray.find(parent => parent.id === props.parent_id);
        setParent(parent);

        // 2️⃣ Get the collaboration request for this parent
        const requestRef = doc(firestore, `Nannies/${nanny_id}/collaboration_requests/${props.parent_id}`);
        const requestSnap = await getDoc(requestRef);

        if (requestSnap.exists()) {
          const data = requestSnap.data();
          setAccepted(data.accepted ?? null);
        } else {
          setAccepted(null);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.parent_id, props.nanny_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!parent) return <p>Parent not found</p>;

  return (
    <div className={styles.declaration}>
      <img src={parent.profileImageUrl} alt="profile picture" />
      <h1>{parent.first_name} {parent.last_name}</h1>
      <div className={styles.description_container}>
        {accepted === null
          ? <p className={styles.state}>Αναμένεται απάντηση</p>
          : accepted 
            ? (
              <>
                <p className={styles.description}>Έχει οριστικοποιηθεί</p>
                <p className={`${styles.accepted} ${styles.state}`}>
                  Έγινε αποδεκτή <i className="fa-solid fa-check"></i>
                </p> 
              </>
            )
            : (
              <>
                <p className={styles.description}>Έχει οριστικοποιηθεί</p>
                <p className={`${styles.rejected} ${styles.state}`}>
                  Απορρίφθηκε <i className="fa-solid fa-xmark"></i>
                </p>
              </>
            )
        }
      </div>
      <button onClick={handleViewClick} className={styles.view_declaration_button}>
        <i className="fa-solid fa-eye"></i>
      </button>
    </div>
  );
}








function Payment(props) {
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const nanny_id=searchParams.get('nid');
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem('nanny_id', nanny_id);
    navigate(`/nanny-profile/voucher-card?payid=${props.payment_id}`);
  }

  useEffect(() => {
    const fetchNannyByID = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Get the nanny with the given id
        const parent = parentsArray.find(parent => parent.id === props.parent_id);
        setParent(parent);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    fetchNannyByID();
  }, [])

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error}</p>; }

  return (
    <div className={styles.declaration}>
      <img src={parent.profileImageUrl} alt="profile picture" />
      <h1>{parent.first_name} {parent.last_name}</h1>
      <div className={styles.description_container}>
        <p className={styles.description}>Έγινε στις {props.date}</p>
        <i className="fa-solid fa-circle"></i>
        {props.accepted === null
          ? <p className={styles.state}>Αναμένεται εξαργύρωση</p>
          : props.accepted 
            ? <>
                
                <p className={`${styles.accepted} ${styles.state}`}>
                  Εξαργυρώθηκε
                  <i className="fa-solid fa-check"></i>
                </p> 
              </>
            : <>
              
                <p className={`${styles.rejected} ${styles.state}`}>
                  Απορρίφθηκε
                  <i className="fa-solid fa-xmark"></i>
                </p>
              </>
        }
      </div>
      <button onClick={handleClick} className={styles.view_declaration_button}>
        <i className="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}