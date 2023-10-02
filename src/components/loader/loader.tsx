import styles from "../../../public/styles/loader.module.css";

export default function Loader() {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.loader_container}></div>
      </div>
    </>
  );
}
