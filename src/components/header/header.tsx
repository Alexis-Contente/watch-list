import styles from "../../../public/styles/header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Watch list</h1>
      <nav className={styles.nav}>
        <a className={styles.link} href="#">
          Home
        </a>
        <a className={styles.link} href="#">
          About
        </a>
        <a className={styles.link} href="#">
          Contact
        </a>
      </nav>
      <div className={styles.search_container}>
        <input
          type="text"
          className={styles.search_box}
          placeholder="Rechercher..."
        />
        <button className={styles.search_button}>Rechercher</button>
      </div>
    </div>
  );
}
