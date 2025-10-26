import { useEffect, useState } from 'react';
import styles from './PaymentCalendar.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

export default function PaymentCalendar({ loggedInParentID }) {

  const daysTranslation = {
    "Monday": "Δευτέρα",
    "Tuesday": "Τρίτη",
    "Wednesday": "Τετάρτη",
    "Thursday": "Πέμπτη",
    "Friday": "Παρασκευή",
    "Saturday": "Σάββατο",
    "Sunday": "Κυριακή"
  };

  const daysOfWeek = ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"];
  const today = new Date();

  const [activeCollaborationID, setActiveCollaborationID] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [workDays, setWorkDays] = useState([]);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = (new Date(currentYear, currentMonth).getDay() + 6) % 7;

  useEffect(() => {
    const fetchActiveCollaborationID = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Parents"));
        const parents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const loggedInParent = parents.find(parent => parent.id === loggedInParentID);
        const activeCollaborationID = loggedInParent.active_collaboration_id;
        setActiveCollaborationID(activeCollaborationID);
      }
      catch (error) {
        console.error("Error fetching parent data: ", error);
      }
    };

    fetchActiveCollaborationID();

  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (activeCollaborationID) {
          const scheduleSnapshot = await getDocs(collection(firestore, `Nannies/${activeCollaborationID}/schedule`));
          const scheduleArray = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Fetched work days: ", scheduleArray);
          setSchedule(scheduleArray);
        }
      }
      catch (error) {
        console.error("Error fetching work days: ", error);
      }
    }
    
    fetchSchedule();

  }, [activeCollaborationID]);

  useEffect(() => {
    try {
      if (schedule) {
        const workDaysArray = [];
        for (const [day, hours] of Object.entries(schedule[0])) {
          if (day !== 'id') {
            for (const [key, value] of Object.entries(hours)) {
              if (value === 2) {
                workDaysArray.push(day);
                break;
              }
            }
          }
        }
        setWorkDays(workDaysArray.map(day => daysTranslation[day]));
      }
    }
    catch (error) {
      console.error("Error processing schedule: ", error);
    }
  }, [schedule]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <div key={index} className={styles.week_day_cell}>
        {day}
      </div>
    ));
  };

  const renderDaysInMonth = () => {
    const cells = [];

    // Add previous month days
    for (let day = firstDayOfMonth; day > 0; day--) {
      cells.push(
        <div key={`prev-day-${day}`} className={`${styles.month_day_cell} ${styles.not_active_cell}`}>
          <div className={styles.background_circle}></div>
          <p>{new Date(currentYear, currentMonth, -day + 1).getDate()}</p>
        </div>
      );
    }

    // Add the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      const isPast = new Date(currentYear, currentMonth, day) < today;
      const isWorkDay = workDays.includes(daysOfWeek[new Date(currentYear, currentMonth, day-1).getDay()]);
      cells.push(
        <div key={`day-${day}`} className={`${styles.month_day_cell} ${isToday ? styles.today_cell : ''} ${isPast ? styles.past_day_cell : ''} ${isWorkDay ? styles.work_day_cell : ''}`}>
          <div className={styles.background_circle}></div>
          <p>{day}</p>
        </div>
      );
    }

    // Add next month days
    const totalCells = cells.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      cells.push(
        <div key={`next-day-${day}`} className={`${styles.month_day_cell} ${styles.not_active_cell}`}>
          <div className={styles.background_circle}></div>
          <p>{day}</p>
        </div>
      );
    }

    return cells;
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar_header}>
        <button className={styles.previous_month_button} onClick={goToPreviousMonth}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString(
            'default', { month: 'long' })
          }{" "} {currentYear}
        </h2>
        <button className={styles.next_month_button} onClick={goToNextMonth}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <div className={styles.calendar_main_content}>
        <div className={styles.week_days_container}>{renderDaysOfWeek()}</div>
        <div className={styles.month_days_container}>{renderDaysInMonth()}</div>
      </div>
    </div>
  )
}
