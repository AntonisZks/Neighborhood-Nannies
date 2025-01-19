import React from 'react';
import styles from './ScheduleTable.module.css'; 



function Schedule (props) {
  var monday=props.monday;
  var tuesday=props.tuesday;
  var wednesday=props.wednesday;
  var thursday=props.thursday;
  var friday=props.friday;
  var saturday=props.saturday;
  var sunday=props.sunday;
  var days=[monday, tuesday, wednesday, thursday, friday, saturday, sunday];
  
  return (
    <table className={styles.schedule_table}>
      <thead>
        <tr>
          <th className={styles.header}>Δευτέρα</th>
          <th className={styles.header}>Τρίτη</th>
          <th className={styles.header}>Τετάρτη</th>
          <th className={styles.header}>Πέμπτη</th>
          <th className={styles.header}>Παρασκευή</th>
          <th className={styles.header}>Σάββατο</th>
          <th className={styles.header}>Κυριακή</th>
        </tr>
      </thead>
      <tbody>
        {[
          '07:00 - 08:00',
          '08:00 - 09:00',
          '09:00 - 10:00',
          '10:00 - 11:00',
          '11:00 - 12:00',
          '12:00 - 13:00',
          '13:00 - 14:00',
          '14:00 - 15:00',
          '15:00 - 16:00',
          '16:00 - 17:00',
          '17:00 - 18:00',
          '18:00 - 19:00',
          '19:00 - 20:00',
          '20:00 - 21:00',
        ].map((time, rowIndex) => (
          <tr key={rowIndex}>
            {Array(7)
              .fill(null)
              .map((_, colIndex) => (
                <td key={colIndex} className={styles.cell}>
                  {days[colIndex][rowIndex] ? time : ''}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Schedule;
