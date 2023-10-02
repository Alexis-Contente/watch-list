"use client";

import styles from "./page.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import MovieModal from "@/components/modal/movieModal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
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

export default function Home(props: Item) {
  const {
    id,
    title,
    name,
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

  // Jeton d'authentification
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTliY2M4ZjgwYThjNWM0MmUwMmY4ZDc0Mzg1NzM5MyIsInN1YiI6IjY1MDgyNDg0M2NkMTJjMDBjYTU2NjA0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6JoagrEoOFINgAbx0j_MuIUzwHKWS6GwbWemJxu-hNY",
    },
  };

  // Requête pour récupérer les films populaires
  const {
    data: popularMovies,
    isLoading: isLoading1,
    isError: isError1,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () =>
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR",
          options
        )
        .then((response) => response.data.results as Item[]),
  });

  // Requête pour récupérer les films les mieux notés
  const {
    data: ratedMovies,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: () =>
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR",
          options
        )
        .then((response) => response.data.results as Item[]),
  });

  // Requête pour récupérer les séries populaires
  const {
    data: popularTvShow,
    isLoading: isLoading3,
    isError: isError3,
  } = useQuery({
    queryKey: ["popularTvShow"],
    queryFn: () =>
      axios
        .get(
          "https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR",
          options
        )
        .then((response) => response.data.results as Item[]),
  });

  // Requête pour récupérer les séries les mieux notées
  const {
    data: ratedTvShow,
    isLoading: isLoading4,
    isError: isError4,
  } = useQuery({
    queryKey: ["ratedTvShow"],
    queryFn: () =>
      axios
        .get(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR",
          options
        )
        .then((response) => response.data.results as Item[]),
  });

  // Requête pour récupérer les films en diffusion
  const {
    data: nowPlayingMovies,
    isLoading: isLoading5,
    isError: isError5,
  } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: () =>
      axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=fr-FR",
          options
        )
        .then((response) => response.data.results as Item[]),
  });

  // Requête pour récupérer les films à venir
  const {
    data: upcomingMovies,
    isLoading: isLoading6,
    isError: isError6,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () =>
      axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=fr-FR",
          options
        )
        .then((response) => response.data.results as Item[]),
  });

  // Requête pour récupérer les séries en diffusion
  const {
    data: onTheAirTvShow,
    isLoading: isLoading7,
    isError: isError7,
  } = useQuery({
    queryKey: ["onTheAirTvShow"],
    queryFn: () =>
      axios
        .get(
          "https://api.themoviedb.org/3/tv/on_the_air?api_key=${TMDB_API_KEY}&language=fr-FR",
          options
        )
        .then((response) => response.data.results as Item[]),
  });

  // Breakpoints pour le carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // Affichage du modal
  const [selectedMovie, setSelectedMovie] = useState<Item | null>(null);

  const handleOpenModal = (movie: Item) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Header handleOpenModal={handleOpenModal} />

      <main className={styles.main}>
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
              <p>
                Pas de compte ? <a href="/inscription">Créer un compte</a>
              </p>
            </form>
          </div>
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
              Il vous suffit de vous connectez ou de créer un compte.
            </p>
          </div>
        </div>
        <div className={styles.catalogue_container}>
          <div className={styles.categorie_container}>
            <h2 className={styles.title_categorie}>Films populaires</h2>
            {isLoading1 && <p>Chargement...</p>}
            {popularMovies && (
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
                {popularMovies.map((movie) => (
                  <div className={styles.item_card} key={movie.id}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(movie);
                      }}
                    >
                      <Image
                        className={styles.item_img}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                        alt="Photo de couverture d'un film ou série"
                        width={200}
                        height={300}
                      />
                      <h2 className={styles.item_title}>{movie.title}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className={styles.categorie_container}>
            <h2 className={styles.title_categorie}>Films les mieux notés</h2>
            {isLoading2 && <p>Chargement...</p>}
            {ratedMovies && (
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
                {ratedMovies.map((movie) => (
                  <div className={styles.item_card} key={movie.id}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(movie);
                      }}
                    >
                      <Image
                        className={styles.item_img}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                        alt="Photo de couverture d'un film ou série"
                        width={200}
                        height={300}
                      />
                      <h2 className={styles.item_title}>{movie.title}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className={styles.categorie_container}>
            <h2 className={styles.title_categorie}>Films au cinéma</h2>
            {isLoading5 && <p>Chargement...</p>}
            {nowPlayingMovies && (
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
                {nowPlayingMovies.map((movie) => (
                  <div className={styles.item_card} key={movie.id}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(movie);
                      }}
                    >
                      <Image
                        className={styles.item_img}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                        alt="Photo de couverture d'un film ou série"
                        width={200}
                        height={300}
                      />
                      <h2 className={styles.item_title}>{movie.title}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className={styles.categorie_container}>
            <h2 className={styles.title_categorie}>Films à venir</h2>
            {isLoading6 && <p>Chargement...</p>}
            {upcomingMovies && (
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
                {upcomingMovies.map((movie) => (
                  <div className={styles.item_card} key={movie.id}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(movie);
                      }}
                    >
                      <Image
                        className={styles.item_img}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                        alt="Photo de couverture d'un film ou série"
                        width={200}
                        height={300}
                      />
                      <h2 className={styles.item_title}>{movie.title}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className={styles.categorie_container}>
            <h2 className={styles.title_categorie}>Séries populaires</h2>
            {isLoading3 && <p>Chargement...</p>}
            {popularTvShow && (
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
                {popularTvShow.map((tvShow) => (
                  <div className={styles.item_card} key={tvShow.id}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(tvShow);
                      }}
                    >
                      <Image
                        className={styles.item_img}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${tvShow.poster_path}`}
                        alt="Photo de couverture d'un film ou série"
                        width={200}
                        height={300}
                      />
                      <h2 className={styles.item_title}>{tvShow.name}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className={styles.categorie_container}>
            <h2 className={styles.title_categorie}>Séries les mieux notées</h2>
            {isLoading4 && <p>Chargement...</p>}
            {ratedTvShow && (
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
                {ratedTvShow.map((tvShow) => (
                  <div className={styles.item_card} key={tvShow.id}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(tvShow);
                      }}
                    >
                      <Image
                        className={styles.item_img}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${tvShow.poster_path}`}
                        alt="Photo de couverture d'un film ou série"
                        width={200}
                        height={300}
                      />
                      <h2 className={styles.item_title}>{tvShow.name}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className={styles.categorie_container}>
            <h2 className={styles.title_categorie}>Séries en diffusion</h2>
            {isLoading7 && <p>Chargement...</p>}
            {onTheAirTvShow && (
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={true}
                draggable={false}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="invisible sm:visible custom-dot-list-style"
                ssr={true}
              >
                {onTheAirTvShow.map((tvShow) => (
                  <div className={styles.item_card} key={tvShow.id}>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(tvShow);
                      }}
                    >
                      <Image
                        className={styles.item_img}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${tvShow.poster_path}`}
                        alt="Photo de couverture d'un film ou série"
                        width={200}
                        height={300}
                      />
                      <h2 className={styles.item_title}>{tvShow.name}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>

        {selectedMovie && (
          <MovieModal
            isOpen={!!selectedMovie}
            onClose={handleCloseModal}
            movieData={selectedMovie}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
