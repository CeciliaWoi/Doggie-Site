import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import ImageDog from "../../Images/Doggy.png";
import s from "./Detail.module.css";
import Loading from "../Loading/Loading";

export default function Detail(props) {
  const dispatch = useDispatch();

  const myDog = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const temps = myDog[0]?.temperaments?.map((e) => e.name);
  return (
    <div className={s.bg}>
      {!myDog.length ? (
        <Loading />
      ) : (
        myDog.map((e) => {
          return (
            <div key={e.id} className={s.cards}>
              <img
                src={e.image || ImageDog}
                alt="img not found"
                width="420px"
                height="400px"
                className={s.image}
              />
              <h1 className={s.name}>Name: {e.name}</h1>
              <h2 className={s.w}>Minimum Height: {e.height_min}</h2>
              <h2 className={s.w}>Maximum Height: {e.height_max}</h2>
              <h2 className={s.w}>Minimum Weight: {e.weight_min}</h2>
              <h2 className={s.w}>Maximum Weight: {e.weight_max}</h2>
              <h2 className={s.w}>Life Span: {e.life_span}</h2>
              <h3 className={s.temps}>Temperaments: {temps.join(", ")}</h3>

              <Link to="/home">
                <button className={s.btn}>Go back Home</button>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
