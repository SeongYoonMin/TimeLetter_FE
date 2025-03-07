import DefaultLayout from "@/components/layout/DefaultLayout";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import FirstVisitorProvider from "@/providers/FirstVisitorProvider";
import localFont from "next/font/local";

const suitLocalFont = localFont({
  src: "./fonts/SUIT-Variable.woff2",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={suitLocalFont.className}>
        <QueryProvider>
          <FirstVisitorProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </FirstVisitorProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
