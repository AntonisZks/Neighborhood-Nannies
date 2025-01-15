import styles from './Logo.module.css';

export default function Logo() {
  return (
    <a href='/' className={styles.logo_container}>
      <h1>Νταντάδες</h1>
      <h1>Της</h1>
      <h1>Γειτονιάς</h1>
    </a>
  )
}
