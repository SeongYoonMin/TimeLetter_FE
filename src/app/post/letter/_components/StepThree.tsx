import PostLetterHeader from "@/components/letter/PostLetterHeader";
import { Button } from "@/components/ui/button";
import { usePostLetterStore } from "@/providers/PostLetterProvider";
import React from "react";

const StepThree = ({
  nextPage,
  backPage,
}: {
  nextPage: () => void;
  backPage: () => void;
}) => {
  const { lastView, favoriteView, setFavoriteView } = usePostLetterStore(
    (store) => store
  );
  const onClickItem = (view: string) => {
    setFavoriteView(view);
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
        </div>
        <ul className="grid grid-cols-3 gap-2 w-full">
          {lastView.map((item, index) => {
            const isSelected = favoriteView.includes(item);
            return (
              <li key={item + index} className="col-span-3">
                <button
                  className={`text-center py-[22px] rounded-[20px] font-semibold w-full ${
                    isSelected
                      ? "bg-[#FFDBA8] text-[#3C3C3C]"
                      : "bg-[#F7F7F7] text-[#8A8686]"
                  }`}
                  onClick={() => onClickItem(item)}
                  type="button"
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Button onClick={nextPage} disabled={!favoriteView}>다음</Button>
    </div>
  );
};

export default StepThree;
