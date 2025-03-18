import RegisterStoreProvider from "@/providers/RegisterProvider";
import dynamic from "next/dynamic";
import React from "react";

const RegisterBox = dynamic(
  () => import("@/components/register/RegisterContainer"),
  {
    ssr: false,
  }
);

const RegisterPage = () => {
  return (
    <section className=" bg-[#A1A1A1] w-full h-full">
      <RegisterStoreProvider>
        <RegisterBox />
      </RegisterStoreProvider>
    </section>
  );
};

export default RegisterPage;
