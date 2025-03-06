import DefaultLayout from "@/components/layout/DefaultLayout";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import FirstVisitorProvider from "@/providers/FirstVisitorProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <QueryProvider>
          <FirstVisitorProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </FirstVisitorProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
