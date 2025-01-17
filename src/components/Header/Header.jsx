import styles from "./Header.module.css";

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NavigationBar from "../NavigationBar/NavigationBar";
import Logo from "../Logo/Logo";

import { collection, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

export default function Header(props) {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/guardians' || location.pathname === '/caretakers';

  return (
    <>
      <div className={`${styles.container} ${isSpecialPage ? styles.specialPage : ''}`}>
        <Logo />
        <NavigationBar />
        {props.userID === null ? <AuthenticationContainer /> : <UserProfileContainer />}
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
  return (
    <div className={` ${styles.misc_container} ${styles.auth_container}`}>
      <a className={styles.login_link} href="/parent-login">Σύνδεση</a>
      <button className={styles.signup_button}>
        <i className="fas fa-user-plus"></i>
        Εγγραφή
      </button>
    </div>
  )
}

function UserProfileContainer(props) {

  const [userProfileImageURL, setUserProfileImageURL] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const querySnapshot = await getDocs(collection(firestore, 'Parents'));
        const parentsArray = querySnapshot.docs.map(doc => doc.data());
        
        const currentUser = parentsArray.find(parent => parent.id === props.userID);
        setUserProfileImageURL(currentUser.profileImageUrl);
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
      <img src={userProfileImageURL} alt="profile picture" />
      <h1>Εγώ</h1>
      <i className="fa-solid fa-caret-down"></i>
    </div>
  )
}