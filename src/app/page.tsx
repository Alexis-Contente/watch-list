import styles from "./page.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.main_container}>
          <h1 className={styles.title}>Bienvenue les watchers</h1>
          <p className={styles.text}>
            Ici vous pourrez parcourir un catalogue de films et séries mis à
            jour réguilèrement.
          </p>
          <p className={styles.text}>
            Vous avez la possibilité d'ajouter des films et séries parmis des
            listes pour avoir un suivi continu sur votre avancement de
            visionnage.
          </p>
          <p className={styles.text}>Pas mal nan ? En plus c'est gratuit !</p>
          <p className={styles.text}>
            Il vous suffit de vous connectez ou de créer un compte en cliquant
            sur le lien ci-dessous.
          </p>
          <button className={styles.btn}>
            <a className={styles.link_btn} href="/connexion">
              S'inscrire / Se connecter
            </a>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
