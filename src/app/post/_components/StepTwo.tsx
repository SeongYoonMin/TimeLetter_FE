import PostLetterHeader from "@/components/letter/PostLetterHeader";
import { Button } from "@/components/ui/button";
import { usePostLetterStore } from "@/providers/PostLetterProvider";
import React from "react";

const viewList = [
  {
    id: 1,
    view: "외향적",
  },
  {
    id: 2,
    view: "독립적",
  },
  {
    id: 3,
    view: "긍정적",
  },
  {
    id: 4,
    view: "신중함",
  },
  {
    id: 5,
    view: "적극성",
  },
  {
    id: 6,
    view: "다정함",
  },
  {
    id: 7,
    view: "리더십",
  },
  {
    id: 8,
    view: "창의성",
  },
  {
    id: 9,
    view: "분석력",
  },
  {
    id: 10,
    view: "끈기",
  },
  {
    id: 11,
    view: "유연함",
  },
  {
    id: 12,
    view: "도전적인",
  },
];

const StepTwo = ({
  nextPage,
  backPage,
}: {
  nextPage: () => void;
  backPage: () => void;
}) => {
  const { lastView, setLastView } = usePostLetterStore((store) => store);
  const onClickItem = (view: string) => {
    setLastView(view);
  };

  return (
    <div className="w-full h-full justify-between flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-4">
        <PostLetterHeader backPage={backPage} />
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-header text-center">
            <span className="text-primary">
              친해지고 나서
              <br />
              알게된 성격
            </span>
            중<br />
            가까운 단어를 골라주세요
          </h2>
          <span className="text-xs text-[#8A8686] font-medium">
            복수선택 3개까지 가능
          </span>
        </div>
        <ul className="grid grid-cols-3 gap-2 w-full">
          {viewList.map((item) => {
            const isSelected = lastView.includes(item.view);
            return (
              <li key={item.id} className="col-span-1">
                <button
                  className={`text-center py-[22px] rounded-[20px] font-semibold w-full ${
                    isSelected
                      ? "bg-[#FFDBA8] text-[#3C3C3C]"
                      : "bg-[#F7F7F7] text-[#8A8686]"
                  }`}
                  onClick={() => onClickItem(item.view)}
                  type="button"
                >
                  {item.view}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Button onClick={nextPage} disabled={lastView.length === 0}>
        다음
      </Button>
    </div>
  );
};

export default StepTwo;
