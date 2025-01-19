import styles from "./NannySearchPanel.module.css";

import { useNavigate } from "react-router-dom";

export default function NannySearchPanel(props) {
  const navigate = useNavigate();

  const viewProfile = () => {
    const userID = props.id;
    navigate(`/search/nanny-profile-overview?nid=${userID}`);
  }

  return (
    <div className={styles.outer_container}>
      <div className={styles.profile_container}>
        <img src={props.profile_picture} alt="profile picture" />
        <h1>{props.first_name} {props.last_name}</h1>
      </div>
      <div className={styles.info_container}>
        <ul>
          <li>
            <i className="fa-solid fa-city"></i>
            <p><b>Περιοχή Εργασίας: </b>{props.work_area}</p>
          </li>
          <li>
            <i className="fa-solid fa-calendar-days"></i>
            <p><b>Ηλικία: </b>{props.age}</p>
          </li>
          <li>
            <i className="fa-solid fa-handshake-simple"></i>
            <p><b>Συνεργασίες: </b>{props.collaborations}</p>
          </li>
        </ul>
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
      <div className={styles.button_container}>
        <button onClick={viewProfile}>
          <i className="fa-solid fa-eye"></i>
          <p>Προβολή Προφίλ</p>
        </button>
      </div>
      <button className={styles.more_button}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  )
}