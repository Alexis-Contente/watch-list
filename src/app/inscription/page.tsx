"use client";

import Header from "@/components/header/header";
import styles from "../../../public/styles/connexion.module.css";
import Footer from "@/components/footer/footer";
import { useRef } from "react";
import axios from "axios";

export default function Connexion() {
  // HANDLE THAT SAVE INFORMATIONS OF A NEW CONTACT
  const formRef: any = useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData(formRef.current);

    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    console.log(name, email, password);

    axios
      .post("/api/user", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        window.location.reload();
        // console.log(response);
        console.log("Données envoyées à l'API");
        return response;
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données vers l'API", error);
      });
  };

  return (
    <>
      <Header />
      <div className={styles.connexion_container}>
        <form
          className={styles.form_signup}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="name">
              Prénom Nom
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
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
      {/* <Footer /> */}
    </>
  );
}
