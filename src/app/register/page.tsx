import RegisterContainer from "@/components/register/RegisterContainer";
import RegisterStoreProvider from "@/providers/RegisterProvider";
import React from "react";

const RegisterPage = () => {
  return (
    <section className=" bg-[#A1A1A1] w-full h-full">
      <RegisterStoreProvider>
        <RegisterContainer />
      </RegisterStoreProvider>
    </section>
  );
};

export default RegisterPage;
