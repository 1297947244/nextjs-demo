import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./index.module.scss";

export default function Player() {
  const router = useRouter();
  console.log(33, router);
  return (
    <main className={styles.container}>
      <div>
        <h1>Player!!</h1>
        <Link href={{ pathname: "/" }} shallow scroll={false}>
          Back Home
        </Link>
      </div>
    </main>
  );
}
