"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as TypeSwiper } from "swiper/types";

interface ICardItem {
  id: number;
  title: string;
  src: string;
}

const cardList: ICardItem[] = [
  {
    id: 0,
    title: "개구리가 우는 연못",
    src: "/img/pond.png",
  },
  {
    id: 1,
    title: "뭉게뭉게 구름 위",
    src: "/img/cloud.png",
  },
  {
    id: 2,
    title: "파도가 펼쳐진 푸른 바다",
    src: "/img/sea.png",
  },
  {
    id: 3,
    title: "푸른 빛의 정원",
    src: "/img/garden.png",
  },
  {
    id: 4,
    title: "눈으로 뒤덮인 산",
    src: "/img/mountain.png",
  },
];

const CardItems = ({ card }: { card: ICardItem }) => {
  return (
    <div className="rounded-4xl p-5 lg:p-7 inline-flex flex-col items-center justify-center gap-4 bg-white w-full">
      <Image
        src={card.src}
        alt={card.title}
        className="flex-1 rounded-xl w-full"
        width={200}
        height={300}
      />
      <p className="text-body font-semibold text-[#8A8686] lg:text-2xl">
        {card.title}
      </p>
    </div>
  );
};

const StepOne = ({
  step,
  total,
  nextClick,
  background,
}: {
  step: number;
  total: number;
  nextClick: (background: string) => void;
  background: string;
}) => {
  const [activeIndex, setActiveIndex] = React.useState(background);
  const handleSlideChange = (swiper: TypeSwiper) => {
    setActiveIndex(cardList[swiper.realIndex].src);
  };
  return (
    <div className="relative flex flex-col items-center justify-between h-full">
      <div className="w-full flex justify-center items-center relative p-5">
        <div className="flex items-center justify-center gap-1 text-[#441606] text-body py-2">
          <p>{step + 1}</p>
          <p>/</p>
          <p>{total}</p>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-center text-white text-header mb-3">
          내 타임캡슐은
          <br />
          어디 있을까?
        </h2>
        <Swiper
          onSlideChangeTransitionEnd={handleSlideChange}
          className="text-center"
          spaceBetween={12}
          slidesPerView={1.6}
          centeredSlides
        >
          {cardList.map((card) => (
            <SwiperSlide key={card.id + card.title} className="w-auto">
              <CardItems card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full px-5 pb-5">
        <button
          className="w-full cursor-pointer p-6 rounded-[20px] bg-[#5E5B5B] text-white text-center"
          type="button"
          onClick={() => nextClick(activeIndex)}
        >
          여기로 할게!
        </button>
      </div>
    </div>
  );
};

export default StepOne;
