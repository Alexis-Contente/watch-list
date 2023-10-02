import Header from "@/components/header/header";
import styles from "../../../public/styles/connexion.module.css";
import Footer from "@/components/footer/footer";

export default function Connexion() {
  return (
    <>
      <Header />
      <div className={styles.connexion_container}>
        <form className={styles.form_signup}>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="firstname">
              Prénom
            </label>
            <input
              className={styles.input}
              type="text"
              id="firstname"
              name="firstname"
              required
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="lastname">
              Nom
            </label>
            <input
              className={styles.input}
              type="text"
              id="lastname"
              name="lastname"
              required
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="email">
              Adresse e-mail
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="password">
              Mot de passe
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button className={styles.btn} type="submit">
            S&apos;inscrire
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
