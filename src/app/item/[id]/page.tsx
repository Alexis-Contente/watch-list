"use client";

import Header from "@/components/header/header";
import axios from "axios";
import styles from "../../../../public/styles/item.module.css";
import Image from "next/image";
import Footer from "@/components/footer/footer";
import Loader from "@/components/loader/loader";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
  adult: boolean;
};

export default function Item({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;

  const { data: session } = useSession();
  console.log(session);
  const userId = session?.session?.user?.id;

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

  // Récupération des données du film ou de la série en fonction de l'id
  const {
    data: item,
    isLoading: isLoading,
    isError: isError,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () =>
      axios
        .get(
          `${TMDB_API_URL}movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`,
          options
        )
        .then((response) => response.data as Item),
  });

  const handleAddItem = (e: any) => {
    e.preventDefault();
    console.log("Add item");
    console.log(userId);
    axios
      .post("/api/item", {
        name: item?.name,
        title: item?.title,
        poster_path: item?.poster_path,
        id: item?.id,
        userId: userId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("Erreur lors de l'ajout de l'item");
      });
  };

  const formatDate = (dateString: string) => {
    const split = dateString.split("-");
    const year = split[0];
    const month = split[1];
    const day = split[2];
    return `${day}-${month}-${year}`;
  };

  const formatBudget = (budget: number) => {
    if (!budget) return "";
    return budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const roundToTenth = (average: number) => {
    if (average !== null && average !== undefined) {
      return average.toFixed(2);
    }
    return "";
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.item_container}>
          <Image
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${item?.poster_path}`}
            alt="Photo de couverture d'un film ou série"
            width={200}
            height={300}
            loading="lazy"
          />
          <div className={styles.informations}>
            <p className={styles.title}>{item?.title}</p>
            <p className={styles.synopsis}>{item?.overview}</p>
            {item?.release_date && (
              <p className={styles.release}>
                Date de réalisation: {formatDate(item?.release_date)}
              </p>
            )}
            <p className={styles.adult}>
              Adulte : {item?.adult ? "Oui" : "Non"}
            </p>
            {item?.budget && (
              <p className={styles.budget}>
                Budget : {formatBudget(item?.budget)} $
              </p>
            )}
            {item?.vote_average && (
              <p className={styles.average}>
                Note: {roundToTenth(item?.vote_average)}/10
              </p>
            )}
            <button
              type="button"
              className={styles.btn}
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
