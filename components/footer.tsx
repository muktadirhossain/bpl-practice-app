"use client";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center py-2">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href={siteConfig.developed.link}
        title={siteConfig.developed.by}
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">{siteConfig.developed.by}</p>
      </Link>
      <p className="hidden">
        Developed by-{" "}
        <a href="https://github.com/muktadirhossain">Muktadir Hossain</a>{" "}
      </p>
    </footer>
  );
};

export default Footer;
