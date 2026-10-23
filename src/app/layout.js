import { cairo } from "./fonts";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  icons: {
    icon: { url: "/images/favicon.svg", type: "image/svg+xml" },
  },
  title: "إحياء - منصة لإدارة المشاريع",
  description: "وصف المشروع",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="bottom-right" dir="rtl" richColors closeButton
          toastOptions={{ style: { fontFamily: "var(--font-cairo)" } }} />
      </body>
    </html>
  );
}
