import styles from './Header.module.css';

export default function Header() {
  return <header className={styles.header}>
    <img src="/assets/users_icon.png" alt="logo" className={styles.logo_image} />
    <span className={styles.title}>Users List</span>
  </header>
}
