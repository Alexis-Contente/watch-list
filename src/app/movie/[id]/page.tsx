"use client";

import styles from "../../page.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

import { useState } from "react";
import "react-multi-carousel/lib/styles.css";

// Type de données attendu pour les films et séries
type Item = {
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
};

export default function Home({
  params,
}: {
  params: { id: string; name: string };
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

  console.log("movie page params", params);
  const [selectedMovie, setSelectedMovie] = useState<Item | null>(null);

  return (
    <>
      <Header />

      <main className={styles.main}>
        <p>page movie {id}</p>
      </main>
      <Footer />
    </>
  );
}
