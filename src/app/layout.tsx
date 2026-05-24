import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/slate/bootstrap.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Hipoteca",
  description: "Calculadora Hipoteca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-bs-theme="dark">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
