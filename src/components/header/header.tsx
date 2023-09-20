import styles from "../../../public/styles/header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Watch list</h1>
      <nav className={styles.nav}>
        <a className={styles.link} href="#">
          Accueil
        </a>
        <a className={styles.link} href="#">
          Mes listes
        </a>
        <a className={styles.link} href="#">
          Mon profil
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
