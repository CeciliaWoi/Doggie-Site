import GifLoading from "../../Images/GifLoading.gif";
import styles from "./Loading.module.css";


export default function Loading() {
  return (
    <div className={styles.GifLoading}>
      <p>Loading...</p>
      <img src={GifLoading} alt="Loading..." />
    </div>
  );
}