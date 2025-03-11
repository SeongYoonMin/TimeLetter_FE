import React from "react";
import { ToastContainer } from "react-toastify";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full max-w-[600px] mx-auto h-screen bg-gradient-to-b from-[#FFEACC] to-[#FFF]">
      {children}
      <ToastContainer />
    </main>
  );
};

export default DefaultLayout;
