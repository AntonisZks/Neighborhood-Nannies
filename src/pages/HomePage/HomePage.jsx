import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from "./HomePage.module.css";

import walter from "../../assets/imgs/Walter_White_S5B.png";
import deadpool from "../../assets/imgs/Deadpool-3.avif";

export default function HomePage() {
  return (
    <div className={styles.outer_container}>
      <Header className={styles.header} />
      <div className={styles.main_content}>
        <div className={styles.left_section}>
          <h1>Νταντάδες της Γειτονιάς</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, ipsum cumque corrupti ea nisi at modi cum accusantium sequi aut numquam fugit atque ratione eaque similique fugiat porro laboriosam eligendi dignissimos quia commodi? Recusandae natus ratione nostrum eveniet voluptatem animi, sit sed aspernatur aperiam error, eius commodi. Minus, voluptates praesentium.</p>
        </div>
        <div className={styles.right_section}>
          <div className={styles.user_options}>
            <UserCard option_title="Κηδεμόνας" img={walter}/>
            <UserCard option_title="Επιμελητής" img={deadpool}/>
          </div>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  )
}

function UserCard(args) {
  return (
    <div className={styles.user_card_container}>
      <img src={args.img} alt="placeholder"/>
      <p>{args.option_title}</p>
    </div>
  )
}
