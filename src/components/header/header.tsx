"use client";

import { useState } from "react";
import styles from "../../../public/styles/header.module.css";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Header() {
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

  // Gestion de la barre de recherche
  const [searchTerm, setSearchTerm] = useState(null);

  const { data: searchResults, isError: isError } = useQuery({
    queryKey: ["searchResults", searchTerm],
    queryFn: () =>
      axios
        .get(
          `${TMDB_API_URL}search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${searchTerm}&page=1&include_adult=false`,
          options
        )
        .then((response) => response.data.results),
    enabled: !!searchTerm,
  });
  console.log(searchResults);
  console.log(isError);

  const handleSearchChange = async (e: { target: { value: any } }) => {
    const query = e.target.value;
    setSearchTerm(query);
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Watch list</h1>
      <nav className={styles.nav}>
        <a className={styles.link} href="/">
          Accueil
        </a>
        <a className={styles.link} href="/liste">
          Ma liste
        </a>
        <a className={styles.link} href="#">
          Mon profil
        </a>
      </nav>
      <div className={styles.search_container}>
        <input
          type="text"
          className={styles.search_box}
          placeholder="Rechercher..."
          value={searchTerm || ""}
          onChange={handleSearchChange}
        />

        {/* <button className={styles.search_button}>Rechercher</button> */}
      </div>
      <Image
        src="/assets/logos/disconnect.png"
        alt="logout"
        width={30}
        height={30}
        onClick={() => signOut()}
        className={styles.disconnect}
      />
      <div className={styles.search_results}>
        {searchResults &&
          searchResults.map((result: { id: number; title: string }) => (
            <div className={styles.div_result} key={result.id}>
              <Link className={styles.result} href={`/item/${result.id}`}>
                {result.title}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
