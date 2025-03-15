import React from "react";
import Image from "next/image";

const MainCapsule = ({
  postCount,
  newCount,
  capsule,
}: {
  postCount: number;
  newCount: number;
  capsule: string;
}) => {
  if (postCount === 0) return <div>타임캡슐이 없습니다.</div>;
  if (postCount === 1) return <div>타임캡슐이 1개 있습니다.</div>;
  if (postCount === 2) return <div>타임캡슐이 2개 있습니다.</div>;
  return <div>MainCapsule</div>;
};

export default MainCapsule;
