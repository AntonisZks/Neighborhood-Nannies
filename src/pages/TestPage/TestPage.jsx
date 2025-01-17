import React from "react";
import styles from "./TestPage.module.css";
import Header from "../../components/Header/Header";
import Schedule from "../../components/ScheduleTable/ScheduleTable";
import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import Footer from "../../components/Footer/Footer";



export default function TestPage() {
    return (
      <div className={styles.outer_container}>
        <Header className={styles.header} />
        <Breadcrumbs className={styles.breadcrumbs} />
        <MainSection />
        <Footer className={styles.footer} />
      </div>
    );
  }



  function MainSection() {
    return (
      <>
        <div className={styles.bg_circle}></div>
        <div className={styles.main_section}>
            <div className={styles.table}>
                <Schedule  />
            </div>
            
        </div>
      </>
    );
  }