"use client";

import styles from "../../../public/styles/list.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  title: string;
};

export default function List(item: Item) {
  // Get item's user from database
  const [items, setItems] = useState([]);

  const itemsData = async () => {
    axios
      .get("api/item")
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    itemsData();
  }, []);

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
        <h1 className={styles.title}>Liste d&apos;éléments</h1>
        {items.map((item) => (
          <div className={styles.item__card} key={item.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`}
              alt={`Image de couverture de l'item ${item.name || item.title}`}
              width={150}
              height={200}
            />
            <h2>{item.name || item.title}</h2>
            <button
              className={styles.delete}
              onClick={() => handleDeleteItem(item.id)}
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
