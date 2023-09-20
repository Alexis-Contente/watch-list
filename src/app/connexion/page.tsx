import Header from "@/components/header/header";
import styles from "../../../public/styles/connexion.module.css";
import Footer from "@/components/footer/footer";

export default function Connexion() {
  return (
    <>
      <Header />
      <div className={styles.connexion_container}>
        <form className={styles.form_signin}>
          <div>
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <form className={styles.form_signup}>
          <div>
            <label htmlFor="firstname">Prénom</label>
            <input type="text" id="firstname" name="firstname" required />
          </div>
          <div>
            <label htmlFor="lastname">Nom</label>
            <input type="text" id="lastname" name="lastname" required />
          </div>
          <div>
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
