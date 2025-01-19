import styles from './SmallFooter.module.css';

export default function SmallFooter(props) {
  return (
    <div className={props.className}>
      <div className={styles.small_footer}>
        <p>Νταντάδες της Γειτονιάς &copy; {new Date().getFullYear()} All rights reserved</p>
      </div>
    </div>
  )
}