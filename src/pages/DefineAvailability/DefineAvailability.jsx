import React, { useState } from 'react';
import styles from './DefineAvailability.module.css';
import Logo from '../../components/Logo/Logo';
import SmallFooter from '../../components/SmallFooter/SmallFooter';
import Schedule from '../../components/ScheduleTable/ScheduleTable';





export default function DefineAvailability() {
    return (
        <>
            <Logo className={styles.logo}/>
            <div className={styles.centered_container}>
                <div className={styles.table_container}>
                    <h1>Επιλέξτε ώρες Διαθεσημότητας</h1>
                    <Schedule
                    clickable={true}
                    monday={[true, true, true, true, true, true, true, true, true, true, true, true, true , true]}
                    tuesday={[true, true, true, true, true, true, true, true, true, true, true, true, true, true]}
                    wednesday={[true, true, true, true, true, true, true, true, true, true, true, true, true, true]}
                    thursday={[true, true, true, true, true, true, true, true, true, true, true, true, true, true]}
                    friday={[true, true, true, true, true, true, true, true, true, true, true, true, true, true]}
                    saturday={[true, true, true, true, true, true, true, true, true, true, true, true, true, true]}
                    sunday={[true, true, true, true, true, true, true, true, true, true, true, true, true, true]}

                     />
                     <button type="submit" className={styles.submitButton}>Επόμενο</button>    
                </div>
               
            </div>
            
            <SmallFooter />
        </>
    );
}