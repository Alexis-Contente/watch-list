"use client";

import styles from "./page.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

// Type de données attendu pour les films et séries
type Item = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
};

export default function Home(props: Item) {
  const {
    id,
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    vote_count,
    genre_ids,
  } = props;

  // Récupération de la clé API
  const TMDB_API_KEY = process.env.API_KEY_TMDB;

  // Récupération de l'url de l'API
  const TMDB_API_URL = "https://api.themoviedb.org/3/";

  // Récupération des films et séries par catéforie
  const [popularMovies, setPopularMovies] = useState<Item[] | null>(null);
  const [ratedMovies, setRatedMovies] = useState<Item[] | null>(null);
  const [popularTvShow, setPopularTvShow] = useState<Item[] | null>(null);
  const [ratedTvShow, setRatedTvShow] = useState<Item[] | null>(null);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Item[] | null>(null);
  const [upcomingMovies, setUpcomingMovies] = useState<Item[] | null>(null);
  const [onTheAirTvShow, setOnTheAirTvShow] = useState<Item[] | null>(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTliY2M4ZjgwYThjNWM0MmUwMmY4ZDc0Mzg1NzM5MyIsInN1YiI6IjY1MDgyNDg0M2NkMTJjMDBjYTU2NjA0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6JoagrEoOFINgAbx0j_MuIUzwHKWS6GwbWemJxu-hNY",
    },
  };

  const popularMoviesData = async () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR",
        options
      )
      .then((response) => {
        setPopularMovies(response.data.results);
        // console.log(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ratedMoviesData = async () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR",
        options
      )
      .then((response) => {
        setRatedMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    popularMoviesData();
    ratedMoviesData();
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
          {popularMovies &&
            popularMovies.map((movie) => (
              <div className={styles.item_card} key={movie.id}>
                <Image
                  className={styles.item_img}
                  src="/public/assets/images"
                  alt="Photo de couverture d'un film ou série"
                  width={200}
                  height={300}
                />
                <h2 className={styles.item_title}>{movie.title}</h2>
              </div>
            ))}
        </div>
        <div className={styles.catalogue_container}>
          {ratedMovies &&
            ratedMovies.map((movie) => (
              <div className={styles.item_card} key={movie.id}>
                <Image
                  className={styles.item_img}
                  src="/public/assets/images"
                  alt="Photo de couverture d'un film ou série"
                  width={200}
                  height={300}
                />
                <h2 className={styles.item_title}>{movie.title}</h2>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
