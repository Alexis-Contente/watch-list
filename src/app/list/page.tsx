"use client";

import styles from "../../../public/styles/list.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Loader from "@/components/loader/loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  title: string;
  poster_path: string;
};

export default function List(item: Item) {
  // Get item's user from database
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsData = async () => {
    axios
      .get("api/item")
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    itemsData();
  }, []);

  // const {
  //   data: dataItem,
  //   isLoading: isLoading,
  //   isError: isError,
  // } = useQuery({
  //   queryKey: ["items"],
  //   queryFn: () => {
  //     axios.get("/api/item").then((response) => response.data as Item[]);
  //   },
  // });

  // Delete item from database
  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/item/${id}`);
      console.log("Contact supprimé");
    } catch (error) {
      console.error("Impossible de supprimer le contact", error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Votre liste de films et séries</h1>
        {loading ? (
          <Loader />
        ) : items.length > 0 ? (
          items.map((item: Item) => (
            <div className={styles.item__card} key={item.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                alt={`Image de couverture de l'item ${item.name || item.title}`}
                className={styles.item__poster}
                width={150}
                height={200}
              />
              <div className={styles.item__informations}>
                <Link className={styles.item__link} href={`/item/${item.id}`}>
                  <p className={styles.item__title}>
                    {item.name || item.title}
                  </p>
                </Link>
                <button
                  className={styles.delete}
                  onClick={() => handleDeleteItem(item.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.empty}>Votre liste est vide</p>
        )}
      </div>
      <Footer />
    </>
  );
}
