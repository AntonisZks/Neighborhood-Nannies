import React, { useEffect } from 'react';
import styles from './ScheduleTable.module.css'; 

function Schedule (props) {
  const [highlightedCells, setHighlightedCells] = React.useState(
    Array(7).fill(null).map(() => Array(14).fill(0))
  );

  useEffect(() => {
    const initialHighlightedCells = [
      props.monday,
      props.tuesday,
      props.wednesday,
      props.thursday,
      props.friday,
      props.saturday,
      props.sunday
    ];
    setHighlightedCells(initialHighlightedCells);
  }, [props.monday, props.tuesday, props.wednesday, props.thursday, props.friday, props.saturday, props.sunday]);

  const handle_click = (dayIndex, hourIndex) => {
    const newHighlightedCells = highlightedCells.map((day, dIndex) =>
      day.map((cell, hIndex) => {
        if (dIndex === dayIndex && hIndex === hourIndex) {
          if (props.is_parent) {
            if (cell === 0) {
              return 0;
            }
            if (cell === 2) {
              return 1;
            }
            else{return 2;}
            
          } else {
            return cell === 1 ? 0 : 1;
          }
        }
        return cell;
      })
    );
    setHighlightedCells(newHighlightedCells);
    props.onScheduleUpdate(getUpdatedSchedule(newHighlightedCells));
  };

  const getUpdatedSchedule = (highlightedCells) => {
    return highlightedCells.map((day, dayIndex) =>
      day.map((cell, hourIndex) => cell)
    );
  };
  var is_parent=props.is_parent;
  var clickable = props.clickable;
  var days = [props.monday, props.tuesday, props.wednesday, props.thursday, props.friday, props.saturday, props.sunday];
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
                <td key={colIndex} className={`${styles.cell} ${clickable ? styles.open : ''} 
                  ${days[colIndex][rowIndex] === 1 && clickable ? styles.cell : ''}
                  ${highlightedCells[colIndex][rowIndex] === 1 && clickable ? styles.highlighted : styles.cell}



                  ${days[colIndex][rowIndex] === 2 && clickable && is_parent ? styles.cell : ''}
                  ${highlightedCells[colIndex][rowIndex] === 2 && clickable && is_parent ? styles.chosen : ''}



                  ${highlightedCells[colIndex][rowIndex] === 1 && !clickable ? styles.cell : styles.closed}
                  ${days[colIndex][rowIndex] === 1 && !clickable ? styles.cell : ''}`} 
                  onClick={() => clickable ? handle_click(colIndex, rowIndex) : null}>  
                  {time}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Schedule;