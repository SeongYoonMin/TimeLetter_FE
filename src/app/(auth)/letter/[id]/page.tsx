import LetterDetailContainer from "@/components/letter/LetterDetailContainer";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  return (
    <>
      <LetterDetailContainer id={id} />
    </>
  );
}
