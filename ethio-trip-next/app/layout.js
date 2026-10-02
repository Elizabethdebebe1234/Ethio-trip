import "./globals.css";

export const metadata = {
  title: "Ethio-Trip",
  description: "Explore Ethiopia and plan your perfect journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
