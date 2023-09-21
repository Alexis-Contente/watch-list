"use client";

import styles from "./page.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [ratedMovies, setRatedMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTliY2M4ZjgwYThjNWM0MmUwMmY4ZDc0Mzg1NzM5MyIsInN1YiI6IjY1MDgyNDg0M2NkMTJjMDBjYTU2NjA0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6JoagrEoOFINgAbx0j_MuIUzwHKWS6GwbWemJxu-hNY",
    },
  };

  const contactsData = async () => {
    axios
      .get(
        "https://api.themoviedb.org/3/account/20459107/rated/movies?language=en-US&page=1&sort_by=created_at.asc",
        options
      )
      .then((response) => {
        setRatedMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    contactsData();
  }, []);

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
            Vous avez la possibilité d&apos;ajouter des films et séries parmis
            des listes pour avoir un suivi continu sur votre avancement de
            visionnage.
          </p>
          <p className={styles.text}>
            Pas mal nan ? En plus c&apos;est gratuit !
          </p>
          <p className={styles.text}>
            Il vous suffit de vous connectez ou de créer un compte en cliquant
            sur le lien ci-dessous.
          </p>
          <button className={styles.btn}>
            <a className={styles.link_btn} href="/connexion">
              S&apos;inscrire / Se connecter
            </a>
          </button>
        </div>
        <div className={styles.catalogue_container}>
          <div className={styles.item_card}>
            <Image
              className={styles.item_img}
              src="/public/assets/images"
              alt="Photo de couverture d'un film ou série"
              width={200}
              height={300}
            />
            <h2 className={styles.item_title}>Titre</h2>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
