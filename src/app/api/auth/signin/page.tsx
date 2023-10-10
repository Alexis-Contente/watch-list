"use client";

import { signIn } from "next-auth/react";
import styles from "../../../../../public/styles/signin.module.css";

export default function Signin() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.form_container}>
          <form className={styles.form_signin}>
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
              Se connecter
            </button>
            <p>OU</p>
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
            <p>
              Pas de compte ? <a href="/inscription">Créer un compte</a>
            </p>
          </form>
        </div>
        <div className={styles.main_container}>
          <h1 className={styles.title}>Bienvenue les watchers</h1>
          <p className={styles.text}>
            Ici vous pourrez parcourir un large catalogue de films et séries mis
            à jour réguilèrement.
          </p>
          <p className={styles.text}>
            Vous avez la possibilité d&apos;ajouter des films et séries parmis
            des listes pour avoir un suivi continu sur votre avancement de
            visionnage.
          </p>
          <p className={styles.text}>
            Pas mal nan ? En plus c&apos;est gratuit !
          </p>
          <p className={styles.text}>
            Il vous suffit de vous connectez ou de créer un compte.
          </p>
        </div>
      </div>
    </>
  );
}
