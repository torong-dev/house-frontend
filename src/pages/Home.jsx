import React, { useState, useEffect } from "react";
import { Slider } from "../components/Swiper";
import CardDiv from "../components/CardDiv";
import "../styles/Home.css";
import { PostProvider, usePostContext } from "../components/PostContext";
import { fetchInteriorData } from "../api/api";

// 각 그리드 항목을 렌더링하는 Component
const ProductGridUserItem = ({
  interiorId,
  interiorImg,
  interiorTitle,
  interiorContents,
  interiorCount,
}) => (
  <div key={interiorId} className="home__grid__item">
    <div className="home__grid__img__container">
      <img
        className="home__grid__img"
        src={interiorImg}
        alt={`Img-${interiorId}`}
      />
    </div>
    <div className="home__grid__title__container">
      <p className="home__grid__title">{interiorTitle}</p>
      <p className="home__grid__count">조회수 {interiorCount || 0}</p>
    </div>
    <p className="home__grid__content">{interiorContents}</p>
  </div>
);

export default function Home() {
  // const [image, setImage] = useState([]);
  const { state } = usePostContext();
  const [interiorData, setInteriorData] = useState([]);

  useEffect(() => {
    // 마운트될 때 API에서 데이터 가져오기
    const fetchInterior = async () => {
      try {
        const data = await fetchInteriorData();
        setInteriorData(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchInterior(); // 마운트될 때 한 번만 실행
  }, []);

  return (
    <PostProvider>
      <div className="home__container">
        <Slider />
        <div className="font-h1">
          <h1>이런 인테리어는 어떠세요??</h1>
        </div>
        <div className="Cards">
          {interiorData.map((item) => (
            <CardDiv {...item} />
          ))}
        </div>

        {/* Grid Container */}
        <div className="home__grid__container">
          {/* API에서 받은 데이터를 매핑하여 그리드 아이템 렌더링 */}
          {interiorData.map(
            ({
              interiorId,
              interiorImg,
              interiorTitle,
              interiorContents,
              interiorCount,
            }) => (
              <ProductGridUserItem
                key={interiorId}
                interiorId={interiorId}
                interiorImg={interiorImg}
                interiorTitle={interiorTitle}
                interiorContents={interiorContents}
                interiorCount={interiorCount}
              />
            )
          )}
          {/* postedData를 매핑하여 각 그리드 아이템 렌더링 */}
          {state.postedData.map(
            ({ interiorId, interiorImg, interiorTitle, interiorContents }) => (
              <ProductGridUserItem
                key={interiorId}
                interiorId={interiorId}
                interiorImg={interiorImg}
                interiorTitle={interiorTitle}
                interiorContents={interiorContents}
              />
            )
          )}
        </div>
      </div>
    </PostProvider>
  );
}
