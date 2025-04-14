import MainContainer from "@/components/main/MainContainer";
import AuthStoreProvider from "@/providers/AuthProvider";

export default function Home() {
  return (
    <AuthStoreProvider>
      <MainContainer />
    </AuthStoreProvider>
  );
}
