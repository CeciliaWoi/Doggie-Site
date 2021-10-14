import GifLoading from "../../Images/GifLoading.gif";
import s from "./Loading.module.css";


export default function Loading() {
  return (
      <div>
          <img className={s.gif} src={GifLoading} alt="Loading..." />
      </div>
  );
}