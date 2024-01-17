import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/Swiper.css";
import { CgProfile } from "react-icons/cg";
export const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={{ Navigation: true }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="swiper-container"
      onSlideChange
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img
          src="http://erang-design.co.kr/wp-content/uploads/2015/09/24-900x400.jpg"
          width="1200px"
          alt=""
        ></img>
        <div className="slider-text">
          <h1>엔티크 함의 시작! "2조의 조명 인테리어"</h1>
          <div className="profile-info">
            <p>박우혁 님</p>
            <CgProfile />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://loremflickr.com/cache/resized/8236_8483710936_0d8e972a56_h_900_400_nofilter.jpg"
          width="1200px"
          alt=""
        ></img>
        <div className="slider-text">
          <h1>실용적인 "2조의 사다리"</h1>
          <div className="profile-info">
            <p>류지현 님</p>
            <CgProfile />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://t1.daumcdn.net/thumb/R920x0/?fname=http://zipdeco.co.kr/upload/2019/11/05/EDITOR_201911050142510760_2nq48"
          width="1200px"
          alt=""
        ></img>
        <div className="slider-text">
          <h1>깔끔한 화장실 인테리어 "2조의 인테리어"</h1>
          <div className="profile-info">
            <p>고 훈 님</p>
            <CgProfile />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1521454501/p/photo/image/2482776/kitchen2.jpg"
          width="1200px"
          alt=""
        ></img>
        <div className="slider-text">
          <h1>모던한 "2조의 아일랜드 식탁"</h1>
          <div className="profile-info">
            <p>류은채 님</p>
            <CgProfile />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
