import { Metadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "@/server/utils/string";
import AboutPage from "./about/page";

export const metadata: Metadata = {
  title: "Wado Sanzo Colors",
};

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const active = (name: string) => {
    const pathname = usePathname();
    return pathname === `/${name}` ? "active" : "";
  };
  const link = (name: string) => {
    return (
      <Link className={active(name)} href={name}>
        {capitalizeFirstLetter(name)}
      </Link>
    );
  };
  return (
    <html>
      <body>
        <AboutPage />
        {/* <Image
          className="app-icon"
          src={favicon}
          alt="Starter Kit"
          width={30}
          height={30}
        />
        <nav>
          {link("main")}
          {link("about")}
        </nav>
        <section>{children}</section> */}
      </body>
    </html>
  );
}
