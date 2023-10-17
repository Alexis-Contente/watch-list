"use client";

import styles from "../../../public/styles/profil.module.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profil() {
  const { data: session } = useSession();
  console.log(session);

  if (!session) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Header />
      <div className={styles.profil__container}>
        {session.session.user?.image && (
          <Image
            src={session.session.user?.image}
            alt="Photo de profil de l'utilisateur"
            className={styles.profil__img}
            width={100}
            height={100}
          />
        )}
        <h1 className={styles.profil__name}>{session.session.user?.name}</h1>
        <p className={styles.profil__email}>{session.session.user?.email}</p>
      </div>
      <Footer />
    </div>
  );
}
