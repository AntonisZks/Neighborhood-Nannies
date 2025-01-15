import jimmy from '../../assets/imgs/jimmy.png';
import alex from '../../assets/imgs/alex.png';

import Header from '../../components/Header/Header';
import PaymentCalendar from '../../components/PaymentCalendar/PaymentCalendar';

import styles from './ParentProfile.module.css';


export default function ParentProfile() {
  return (
    <div className={styles.outer_container}>
      <Header />
      <div className={styles.profile_sidebar}>
        <div className={styles.profile_edit_button_container}>
          <button className={styles.profile_edit_button}>
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
        <div className={styles.profile_data}>
          <img src={jimmy} alt="profile picture" />
          <h1>Δημήτρης Παπαδόπουλος</h1>
        </div>
        <div className={styles.profile_description}>
          <h1>Σύντομη Περιγραφή</h1>
          <p>
            Αναζητώ μια αξιόπιστη και δημιουργική νταντά για μερική απασχόληση, 
            κυρίως απογεύματα. Θέλουμε έναν άνθρωπο που να αγαπά τα παιδιά, να 
            είναι υπομονετικός και να απασχολεί με ενδιαφέροντα και εκπαιδευτικά
            παιχνίδια.
          </p>
        </div>
        <div className={styles.contact_data}>
          <h1>Στοιχεία Επικοινωνίας</h1>
          <ul>
            <li>
              <i class="fa-solid fa-envelope"></i>
              <b>Email: </b>dimitrispapadopoulos@gmail.com
            </li>
            <li>
              <i class="fa-solid fa-phone"></i>
              <b>Τηλέφωνο: </b>6962881364
            </li>
          </ul>
        </div>
        <div className={styles.child_data}>
          <h1>Χαρατηριστικά Παιδιού</h1>
          <ul>
            <li>
              <i class="fa-solid fa-venus-mars"></i>
              <b>Φύλλο: </b>Αγόρι
            </li>
            <li>
              <i class="fa-regular fa-calendar-days"></i>
              <b>Ηλικία: </b>16 μηνών
            </li>
          </ul>
        </div>
        <div className={styles.logout_button_container}>
          <button className={styles.logout_button}>
            <i class="fa-solid fa-sign-out"></i>
            <p>Αποσύνδεση</p>
          </button>
        </div>
      </div>
      <div className={styles.right_side_content}>
        <div className={styles.inner_container}>
          <div className={`${styles.users_panel} ${styles.active_collaboration_panel}`}>
            <h1>Ενεργή Συνεργασία</h1>
            <ActiveCollaboration
              profile_picture={alex}
              first_name="Αλέξανδρος"
              last_name="Δημητρίου"
              />
          </div>
          <div className={`${styles.users_panel} ${styles.finalized_declarations_panel}`}>
            <h1>Οριστικοποιημένες Δηλώσεις (8)</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={false}
                  />
                  </td>
                </tr>
              </tbody>
            </table>
            <a className={styles.all_link} href="#">Προβολή Όλων</a>
          </div>
          <div className={`${styles.users_panel} ${styles.unfinalized_declarations_panel}`}>
            <h1>Δηλώσεις που εκκρεμούν (3)</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={null}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={null}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={null}
                  />
                  </td>
                </tr>
              </tbody>
            </table>
            <a className={styles.all_link} href="#">Προβολή Όλων</a>
          </div>
          <div className={`${styles.users_panel} ${styles.previous_collaborations_panel}`}>
            <h1>Προηγούμενες Συνεργασίες (4)</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                    <PreviousCollaboration
                      profile_picture={alex}
                      first_name="Αλέξανδρος"
                      last_name="Δημητρίου"
                      stars={1}
                      half_star={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <PreviousCollaboration
                      profile_picture={alex}
                      first_name="Αλέξανδρος"
                      last_name="Δημητρίου"
                      stars={4}
                      half_star={false}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <PreviousCollaboration
                      profile_picture={alex}
                      first_name="Αλέξανδρος"
                      last_name="Δημητρίου"
                      stars={3}
                      half_star={true}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <a className={styles.all_link} href="#">Προβολή Όλων</a>
          </div>
          <div className={`${styles.users_panel} ${styles.payments_panel}`}>
            <h1>Πληρωμές Επιμελητών (23)</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={false}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={false}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={true}
                  />
                  </td>
                </tr>
                <tr>
                  <td>
                  <Declaration
                    profile_picture={alex}
                    first_name="Αλέξανδρος"
                    last_name="Δημητρίου"
                    accepted={true}
                  />
                  </td>
                </tr>
              </tbody>
            </table>
            <a className={styles.all_link} href="#">Προβολή Όλων</a>
          </div>
          <div className={`${styles.users_panel} ${styles.calendar_panel}`}>
            <h1>Ημερολόγιο</h1>
            <PaymentCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}

function ActiveCollaboration(props) {
  return (
    <div className={styles.active_collaboration}>
      <img src={props.profile_picture} alt="profile picture" />
      <h1>{props.first_name} {props.last_name}</h1>
      <p>Πριν από 3 ημέρες</p>
      <button className={styles.view_profile_button}>
        <i class="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}

function PreviousCollaboration(props) {
  return (
    <div className={styles.previous_collaboration}>
      <img src={props.profile_picture} alt="profile picture" />
      <h1>{props.first_name} {props.last_name}</h1>
      <p>Έληξε πριν από 3 ημέρες</p>
      <div className={styles.rate_container}>
        <div className={styles.stars_container}>
          {[...Array(props.stars)].map((_, index) => (
            <i key={index} class="fa-solid fa-star"></i>
          ))}
          {props.half_star && <i class="fa-regular fa-star-half-stroke"></i>}
          {[...Array(5 - props.stars - (props.half_star ? 1 : 0))].map((_, index) => (
            <i key={index} class="fa-regular fa-star"></i>
          ))}
        </div>
        <div className={styles.grade_container}>
          <p>{props.stars}/5</p>
        </div>
      </div>
    </div>
  )
}

function Declaration(props) {
  return (
    <div className={styles.declaration}>
      <img src={props.profile_picture} alt="profile picture" />
      <h1>{props.first_name} {props.last_name}</h1>
      <div className={styles.description_container}>
        {props.accepted === null
          ? <p className={styles.state}>Εκκρεμεί Οριστική Υποβολή</p>
          : props.accepted 
            ? <>
                <p className={styles.description}>Έχει οριστικοποιηθεί</p>
                <p className={`${styles.accepted} ${styles.state}`}>
                  Έγινε αποδεκτή
                  <i class="fa-solid fa-check"></i>
                </p> 
              </>
            : <>
                <p className={styles.description}>Έχει οριστικοποιηθεί</p>
                <p className={`${styles.rejected} ${styles.state}`}>
                  Απορρίφθηκε
                  <i class="fa-solid fa-xmark"></i>
                </p>
              </>
        }
      </div>
      <button className={styles.view_declaration_button}>
        <i class="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}
