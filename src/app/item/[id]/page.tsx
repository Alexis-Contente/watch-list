import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

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

export default function Item({ params }: { params: { id: string } }) {
  const id = params.id;

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

  console.log("movie page params", params);

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
          vote_average: number; // Récupération de la clé API
          // Récupération de la clé API
          vote_count: number;
          genre_ids: number[];
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <main>
        <h1>Movie/Série index {id}</h1>
      </main>
      <Footer />
    </>
  );
}
