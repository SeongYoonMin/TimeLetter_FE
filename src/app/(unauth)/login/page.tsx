import LoginContainer from "@/components/login/LoginContainer";
import AuthStoreProvider from "@/providers/AuthProvider";
import React from "react";

const LoginPage = () => {
  return (
    <AuthStoreProvider>
      <LoginContainer />
    </AuthStoreProvider>
  );
};

export default LoginPage;
