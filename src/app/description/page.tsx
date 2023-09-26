"use client";

import styles from "../../../public/styles/description.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Image from "next/image";

export default function Description() {
  return (
    <>
      <Header />
      <div className={styles.description_container}>
        <Image
          className={styles.image}
          src="/assets/images/exemple.jpg"
          alt="Image de l'item"
          width={100}
          height={200}
        />
        <div className={styles.informations}>
          <h2 className={styles.item_title}>TITRE DU FILM/SERIE</h2>
          <p className={styles.synopsis}>Synopsis du film/série</p>
          <p className={styles.casting}>Casting du film/série</p>
          <p className={styles.note}>Note du film/série</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
