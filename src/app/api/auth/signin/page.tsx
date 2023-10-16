"use client";

import { signIn } from "next-auth/react";
import styles from "../../../../../public/styles/signin.module.css";

export default function Signin() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.signin_container}>
          <h1 className={styles.title}>Bienvenue les watchers !</h1>
          <p className={styles.text}>
            Ici vous pourrez parcourir un large catalogue de films et séries mis
            à jour réguilèrement.
          </p>
          <p className={styles.text}>
            Consultez toutes les informations sur vos films et séries préférés.
          </p>
          <p className={styles.text}>
            Vous avez la possibilité d&apos;ajouter des films et séries parmis
            des listes pour avoir un suivi continu sur votre avancement de
            visionnage.
          </p>
          <p className={styles.text}>
            Pas mal nan ? En plus c&apos;est gratuit !
          </p>
          <p className={styles.text}>Il suffit de vous connecter.</p>
          <div className={styles.btn_container}>
            <button
              type="button"
              className={styles.btn_google}
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </button>
            <button
              type="button"
              className={styles.btn_github}
              onClick={() => signIn("github")}
            >
              Sign in with GitHub
            </button>
            <button
              type="button"
              className={styles.btn_discord}
              onClick={() => signIn("discord")}
            >
              Sign in with Discord
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
