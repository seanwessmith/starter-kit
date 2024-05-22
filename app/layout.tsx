"use client";

// import favicon from "./favicon.ico";
import { trpc } from "src/server/trpc";
import ClientComponent from "./clientComponent";
import "./main.scss";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientComponent>
      <section>{children}</section>
    </ClientComponent>
  );
}
export default trpc.withTRPC(RootLayout);
