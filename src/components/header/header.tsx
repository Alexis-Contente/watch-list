"use client";

import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import styles from "../../../public/styles/header.module.css";
import axios from "axios";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchItem = async (query: any) => {
    try {
      const response = await axios.get(
        `${TMDB_API_URL}search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${query}&page=1&include_adult=false`,
        options
      );
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = async (e: { target: { value: any } }) => {
    const query = e.target.value;
    setSearchTerm(query);
    const results = await searchItem(query);
    setSearchResults(results);
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Watch list</h1>
      <nav className={styles.nav}>
        <a className={styles.link} href="/">
          Accueil
        </a>
        <a className={styles.link} href="#">
          Mes listes
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
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button className={styles.search_button}>Rechercher</button>
      </div>
      <div className={styles.search_results}>
        {searchResults &&
          searchResults.map(
            (result: {
              id: Key | null | undefined;
              title:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | PromiseLikeOfReactNode
                | null
                | undefined;
            }) => (
              <div key={result.id}>
                <h3>{result.title}</h3>
              </div>
            )
          )}
      </div>
    </div>
  );
}
