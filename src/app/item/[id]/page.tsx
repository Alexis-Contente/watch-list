"use client";

import Header from "@/components/header/header";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../../public/styles/item.module.css";
import Image from "next/image";
import Footer from "@/components/footer/footer";

// Type de données attendu pour les films et séries
type Item = {
  id: string;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  budget: number;
};

export default function Item({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;

  // Récupération de la clé API
  const TMDB_API_KEY = process.env.API_KEY_TMDB;

  // Récupération de l'url de l'API
  const TMDB_API_URL = "https://api.themoviedb.org/3/";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTliY2M4ZjgwYThjNWM0MmUwMmY4ZDc0Mzg1NzM5MyIsInN1YiI6IjY1MDgyNDg0M2NkMTJjMDBjYTU2NjA0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6JoagrEoOFINgAbx0j_MuIUzwHKWS6GwbWemJxu-hNY",
    },
  };

  const [item, setItem] = useState<Item[]>([]);

  const getItems = async () => {
    axios
      .get(
        `${TMDB_API_URL}movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`,
        options
      )
      .then((response) => {
        const data = response.data;
        setItem(data) as unknown as Item[];
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Header
        handleOpenModal={function (movie: {
          id: number;
          title: string;
          name: string;
          overview: string;
          poster_path: string;
          backdrop_path: string;
          release_date: string;
          vote_average: number;
          vote_count: number;
          genre_ids: number[];
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className={styles.item_container}>
        <Image
          className={styles.img}
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`}
          alt="Photo de couverture d'un film ou série"
          width={200}
          height={300}
        />
        <div className={styles.informations}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.synopsis}>{item.overview}</p>
          <p className={styles.release}>
            Date de réalisation: {item.release_date}
          </p>
          <p className={styles.adult}>Adulte : {item.adult ? "Oui" : "Non"}</p>
          <p className={styles.budget}>Budget : {item.budget}$</p>

          <p className={styles.average}>Note: {item.vote_average}/10</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
