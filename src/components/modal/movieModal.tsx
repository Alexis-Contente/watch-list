import Image from "next/image";
import styles from "../../../public/styles/moviemodal.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";

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

type ModalProps = {
  isOpen: boolean;
  handleCloseModal: () => void;
  movieData: Item;
};

export default function MovieModal({
  isOpen,
  handleCloseModal,
  movieData,
  params,
}: ModalProps & { params: { id: string } }) {
  const id = params?.id;
  const { data: session } = useSession();
  console.log(session);
  const userId = session?.session?.user?.id;

  const handleAddItem = (e: any) => {
    e.preventDefault();
    console.log("Add item");
    console.log(userId);
    axios
      .post("/api/item", {
        name: movieData?.name,
        title: movieData?.title,
        poster_path: movieData?.poster_path,
        id: movieData?.id,
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

  if (!isOpen) return null;

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={handleCloseModal}>
          &times;
        </span>
        <div className={styles.box_informations}>
          <Image
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movieData.poster_path}`}
            alt="poster"
            width={200}
            height={300}
          />
          <div className={styles.informations}>
            <h2 className={styles.title}>{movieData.title}</h2>
            <p className={styles.synopsis}>{movieData.overview}</p>
            <p className={styles.average}>
              <Image
                src="/assets/logos/star.svg"
                alt="Icône d'une étoile"
                width={15}
                height={15}
              />{" "}
              {movieData.vote_average}
            </p>
            <button
              type="button"
              className={styles.btn}
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
