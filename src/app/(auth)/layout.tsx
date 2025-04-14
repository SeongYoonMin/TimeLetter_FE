import AuthStoreProvider from "@/providers/AuthProvider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthStoreProvider>{children}</AuthStoreProvider>;
};

export default Layout;
