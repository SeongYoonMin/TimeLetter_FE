import AuthStoreProvider from "@/providers/AuthProvider";
import React from "react";
import { ToastContainer } from "react-toastify";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthStoreProvider>
      <main className="w-full max-w-[600px] mx-auto h-screen">
        {children}
        <ToastContainer />
      </main>
    </AuthStoreProvider>
  );
};

export default DefaultLayout;
