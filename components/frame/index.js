import React from "react";
import useSWR from "swr";
import { getJSON } from "../../utils/fetcher";
import styles from "./styles.module.css";

export default ({ id, joke: initialJoke }) => {
  const { data: joke } = useSWR(
    () =>
      id && `https://api.icndb.com/jokes/random?id=${encodeURIComponent(id)}`,
    getJSON,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      initialData: initialJoke,
    }
  );

  return (
    <div className={styles.photo}>
      <div className={styles.image}>
        <img src={`https://thumbs.gfycat.com/${id}-mobile.jpg`} />
      </div>

      <div className={styles.sidebar}>
        <ul className={styles.sidebarList}>
          <h3>Description</h3>
          <p>{joke?.value?.joke ?? "Loading ..."}</p>
        </ul>
      </div>
    </div>
  );
};
