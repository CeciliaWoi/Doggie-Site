import GifLoading from "../../Images/GifLoading.gif";
import styles from "./Loading.module.css";


export default function Loading() {
  return (
      <div className={styles.Bg}>
          <img className={styles.gif} src={GifLoading} alt="Loading..." />
      </div>
  );
}