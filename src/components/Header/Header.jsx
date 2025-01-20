import styles from "./Header.module.css";

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import NavigationBar from "../NavigationBar/NavigationBar";
import Logo from "../Logo/Logo";

import { collection, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';


export default function Header() {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/guardians' || location.pathname === '/caretakers';
  const userID = window.localStorage.getItem('parentID');

  return (
    <>
      <div className={`${styles.container} ${isSpecialPage ? styles.specialPage : ''}`}>
        <Logo />
        <NavigationBar />
        {userID === null ? <AuthenticationContainer /> : <UserProfileContainer parentID={userID}/>}
      </div>
    </>
  )
}

function LanguageSelector() {
  return (
    <div className={`${styles.misc_container} ${styles.language}`}>
      <p>ΕΛ | EN</p>
    </div>
  )
}

function AuthenticationContainer() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/guardian-registration?step=1');
  }

  return (
    <div className={` ${styles.misc_container} ${styles.auth_container}`}>
      <a className={styles.login_link} href="/parent-login">Σύνδεση</a>
      <button onClick={handleOnClick} className={styles.signup_button}>
        <i className="fas fa-user-plus"></i>
        Εγγραφή
      </button>
    </div>
  )
}

function UserProfileContainer(props) {

  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const querySnapshot = await getDocs(collection(firestore, 'Parents'));
        const parentsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const currentUser = parentsArray.find(parent => parent.id === props.parentID);
        setUser(currentUser);
      }
      catch (error) {
        console.error(error);
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    fetchUserData();

  }, [props.userID]);

  if (loading) { return <div>Loading...</div> }
  if (error) { return <div>Error: {error}</div> }


  return (
    <div className={styles.profile_container}>
      <img src={user.profileImageUrl} alt="profile picture" />
      <h1>Εγώ</h1>
      <i className="fa-solid fa-caret-down"></i>
    </div>
  )
}
