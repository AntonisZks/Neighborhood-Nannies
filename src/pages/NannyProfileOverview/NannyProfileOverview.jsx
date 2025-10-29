import styles from "./NannyProfileOverview.module.css";

import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import Schedule from "../../components/ScheduleTable/ScheduleTable";
import alex from "../../assets/imgs/alex.png";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

export default function NannyProfileOverview() {
  const [parent, setParent] = useState(null);
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [hourlyPay, setHourlyPay] = useState('');
  const navigate = useNavigate();
  const nanny_id = searchParams.get("nid");
  const parent_id = window.localStorage.getItem("parentID");

  const askForCollaboration = () => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
    localStorage.setItem('hourlyPay', hourlyPay);
    navigate(`/search/nanny-profile-overview/collaboration-request?step=1&nid=${nanny_id}`);
  }


  
  const payForMonth = () => {
    localStorage.setItem('nannyID', nanny_id);
    navigate(`/payment?pid=${parent_id}`);
  }


  const endCollaboration = () => {
    navigate(`/end-collaboration?pid=${parent_id}`);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Nannies"));
        const nanniesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Search for the parent with the given id
        const nanny = nanniesArray.find((nanny) => nanny.id === nanny_id);
        setUser(nanny);

        // Fetch reviews subcollection
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

        const parentQuerySnapshot = await getDocs(collection(firestore, "Parents"));
        const parentsArray = parentQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Search for the parent with the given id
        const parent = parentsArray.find((parent) => parent.id === parent_id);
        setParent(parent);

      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

  }, [nanny_id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }


  

  return (
    <div className={styles.outer_container}>
      <Header />
      <Breadcrumbs className={styles.breadcrumbs} />
      <div className={styles.profile_sidebar}>
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
            <li>
              <i className="fa-solid fa-handshake-simple"></i>
              <b>Συνεργασίες:</b>
              {user.collaborations}
            </li>
          </ul>
        </div>
        <div className={styles.contact_data}>
          <h1>Στοιχεία Επικοινωνίας</h1>
          <ul>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <b>Email: </b>
              {user.email}
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <b>Τηλέφωνο: </b>
              {user.phone}
            </li>
          </ul>
        </div>
        <div className={styles.rate_container}>
          <h1>Αξιολόγηση Κηδεμόνων</h1>
          <div className={styles.rating}>
            <div className={styles.stars_container}>
              {[...Array(user.stars)].map((_, index) => (
                <i key={index} className="fa-solid fa-star"></i>
              ))}
              {[...Array(5 - user.stars)].map((_, index) => (
                <i key={index} className="fa-regular fa-star"></i>
              ))}
            </div>
            <div className={styles.grade_container}>
              <p>{user.stars}/5</p>
            </div>
          </div>
        </div>
        <div className={styles.buttons_container}>
          <button className={styles.message_button}>
            <i className="fa-solid fa-message"></i>
            <p>Στείλτε Μύνημα</p>
          </button>
          {parent.active_collaboration_id === nanny_id ? (
            <button onClick={payForMonth} className={styles.payment_button}>
              <i className="fa-solid fa-dollar-sign"></i>
              <p>Πληρωμή Μήνα</p>
            </button>
          ) : (
            <button onClick={askForCollaboration} className={styles.ask_for_collaboration_button}>
              <i className="fa-solid fa-handshake-simple"></i>
              <p>Αίτηση Συνεργασίας</p>
            </button>
          )}
          {parent.active_collaboration_id === nanny_id && (
            <button onClick={endCollaboration} className={styles.end_collaboration_button}>
              <i className="fa-solid fa-handshake-simple-slash"></i>
              <p>Λήξη Συνεργασίας</p>
            </button>
          )}
        </div>
      </div>
      <div className={styles.right_side_content}>
        <div className={styles.inner_container}>
          <div className={styles.schedule_container}>
            <h1>Πρόγραμμα Εργασίας</h1>
            <Schedule
              clickable={false}
              monday={schedule[0].Monday}
              tuesday={schedule[0].Tuesday}
              wednesday={schedule[0].Wednesday}
              thursday={schedule[0].Thursday}
              friday={schedule[0].Friday}
              saturday={schedule[0].Saturday}
              sunday={schedule[0].Sunday} 
             />
          <div className={styles.reviews_container}>
            <h1>Αξιολογήσεις</h1>
            {reviews.map((review) => (
              <Review 
                key={review.id} 
                profileImageUrl={review.profileImageUrl}
                first_name={review.first_name}
                last_name={review.last_name}
                stars={review.stars}
                date={review.date}
                text={review.text}
                likes={review.likes}
                dislikes={review.dislikes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function Review(props) {
  return (
    <div className={styles.review_container}>
      <div className={styles.main_info_container}>
        <img src={props.profileImageUrl} alt="profile picture" width="40px" />
        <h1>{props.first_name} {props.last_name}</h1>
        <div className={styles.rate_container}>
          <div className={styles.stars_container}>
            {[...Array(props.stars)].map((_, index) => (
              <i key={index} className="fa-solid fa-star"></i>
            ))}
            {[...Array(5 - props.stars)].map((_, index) => (
              <i key={index} className="fa-regular fa-star"></i>
            ))}
          </div>
          <div className={styles.grade_container}>
            <p>{props.stars}/5</p>
          </div>
        </div>
        <div className={styles.date_container}>
          <p>{props.date}</p>
        </div>
        <div className={styles.review_text_container}>
          <p>{props.text}</p>
        </div>
        <div className={styles.more_button_container}>
          <button className={styles.more_button}>
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
        <div className={styles.reactions_container}>
          <button>
            <i className="fa-solid fa-thumbs-up"></i>
            <p>{props.likes} μου αρέσει</p>
          </button>
          <button>
            <i className="fa-solid fa-thumbs-down"></i>
            <p>{props.dislikes} δεν μου αρέσει</p>
          </button>
          <button>
            <i className="fa-solid fa-reply"></i>
            <p>Απάντηση</p>
          </button>
        </div>
      </div>
    </div>
  )
}