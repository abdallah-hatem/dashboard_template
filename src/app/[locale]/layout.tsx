import { Suspense } from "react";
import "@/app/global.css";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";
// import { setRequestLocale } from "next-intl/server";
import { createMetadata } from "@/utils/generateMetadata";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import arEG from "antd/locale/ar_EG";
import { ToastContainer } from "react-toastify";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}

export const generateMetadata = createMetadata(
  "home.Title",
  "home.Description",
  ["https://example.com/image.jpg"],
  {
    keywords: [
      "realestate",
      "MLS",
      "real estate",
      "real estate platform",
      "real estate platform ar",
      "real estate platform en",
    ],
  }
);

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;
  // setRequestLocale(locale);

  const theme = { token: { colorPrimary: "#ed1b24" } };
  const antdLocale = locale === "ar" ? arEG : enUS;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${outfit.className} antialiased`}>
        <Suspense fallback={null}>
          <AntdRegistry>
            <NextIntlClientProvider locale={locale}>
              <ConfigProvider theme={theme} locale={antdLocale}>
                {children}
                <ToastContainer position="top-right" autoClose={2000} />
              </ConfigProvider>
            </NextIntlClientProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
