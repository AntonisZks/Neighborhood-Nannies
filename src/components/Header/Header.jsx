import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./Header.module.css";
import NavigationBar from "../NavigationBar/NavigationBar";

export default function Header() {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/guardians' || location.pathname === '/caretakers';

  return (
    <>
      <div className={`${styles.container} ${isSpecialPage ? styles.specialPage : ''}`}>
        <Logo />
        <NavigationBar />
        <AuthenticationContainer />
      </div>
    </>
  )
}

function Logo() {
  return (
    <div>Logo</div>
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
      <a className={styles.login_link} href="#">Σύνδεση</a>
      <button className={styles.signup_button}>
        <i className="fas fa-user-plus"></i>
        Εγγραφή
      </button>
    </div>
  )
}