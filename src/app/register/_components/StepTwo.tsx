import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as TypeSwiper } from "swiper/types";
import StepHeader from "./StepHeader";

interface ICardItem {
  id: number;
  title: string;
  name: string;
  src: string;
}

const cardList: ICardItem[] = [
  {
    id: 0,
    title: "원형 모양",
    name: "circle",
    src: "/img/circle.png",
  },
  {
    id: 1,
    title: "세모 모양",
    name: "triangle",
    src: "/img/triangle.png",
  },
  {
    id: 2,
    title: "원통 모양",
    name: "bowl",
    src: "/img/bowl.png",
  },
  {
    id: 3,
    title: "네모 모양",
    name: "square",
    src: "/img/square.png",
  },
  {
    id: 4,
    title: "하트 모양",
    name: "heart",
    src: "/img/heart.png",
  },
];

const CardItems = ({ card }: { card: ICardItem }) => {
  return (
    <div className="rounded-4xl p-5 lg:p-7 inline-flex flex-col items-center justify-center gap-4 bg-white w-full">
      <Image
        src={card.src}
        alt={card.title}
        className="flex-1 rounded-xl w-full"
        width={400}
        height={400}
      />
      <p className="text-body font-semibold text-[#8A8686] lg:text-2xl">
        {card.title}
      </p>
    </div>
  );
};

const StepTwo = ({
  step,
  total,
  background,
  nextClick,
  capsule,
  back,
}: {
  step: number;
  total: number;
  back: () => void;
  background: string;
  nextClick: (capsule: string) => void;
  capsule: string;
}) => {
  const [activeIndex, setActiveIndex] = React.useState(capsule);
  const handleSlideChange = (swiper: TypeSwiper) => {
    setActiveIndex(cardList[swiper.realIndex].name);
  };
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-between">
      <div className="absolute w-full h-full z-0">
        <Image
          src={background}
          alt="background"
          className="relative z-0 w-full h-full"
          width={200}
          height={300}
        />
        <div className="absolute inset-0 w-full h-full z-10 bg-gradient-to-b from-transparent to-white"></div>
      </div>
      <StepHeader step={step} total={total} stepBack={back} />
      <div className="w-full relative z-10">
        <h2 className="text-center text-[#3C3C3C] text-header mb-3">
          내 타임캡슐은
          <br />
          어디 있을까?
        </h2>
        <Swiper
          onSlideChangeTransitionEnd={handleSlideChange}
          className=""
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

      <div className="w-full px-5 relative z-10 pb-5">
        <button
          className="w-full cursor-pointer p-6 rounded-[20px] bg-[#5E5B5B] text-white text-center"
          type="button"
          onClick={() => nextClick(activeIndex)}
        >
          이 캡슐로 할게!
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
