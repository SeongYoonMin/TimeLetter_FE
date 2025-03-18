import DefaultLayout from "@/components/layout/DefaultLayout";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "@/providers/QueryProvider";
import FirstVisitorProvider from "@/providers/FirstVisitorProvider";
import localFont from "next/font/local";
import { Metadata } from "next";

const suitLocalFont = localFont({
  src: "./fonts/SUIT-Variable.woff2",
});

export const metaData: Metadata = {
  title: "타임레터 : 시간을 초월한 편지",
  description:
    "타임레터를 통해 서로 의미있는 편지를 보내고, 더 많은 따뜻한 순간을 만들어 보세요.",
  keywords: "타임레터",
  openGraph: {
    title: "타임레터 : 시간을 초월한 편지",
    description:
      "타임레터를 통해 서로 의미있는 편지를 보내고, 더 많은 따뜻한 순간을 만들어 보세요.",
    type: "website",
    // url: "https://timeletter.com",
    // images: "https://timeletter.com/images/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={suitLocalFont.className + " bg-[#F7F7F7]"}>
        <QueryProvider>
          <FirstVisitorProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </FirstVisitorProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
