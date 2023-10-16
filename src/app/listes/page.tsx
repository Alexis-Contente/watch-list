"use client";

import styles from "../../../public/styles/listes.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Listes() {
  // Display movies and series from user
  const [itemList, setItemList] = useState([]);

  const getItemList = async () => {
    axios
      .get("https://console.neon.tech/api/v2/item")
      .then((response) => {
        setItemList(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItemList();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Mes Listes</h1>
      </div>
      <Footer />
    </>
  );
}
