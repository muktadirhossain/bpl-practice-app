import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import { notFound } from "next/navigation";

import LogoutBtn from "./LogoutBtn";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/fetch-user";

export const DashboardNav: any = async () => {
  const session = await auth();

  if (!session?.user) return notFound();
  const { email } = session.user || {};

  const user = await getUserByEmail(email as string);

  const avatarUrl = user?.image || session?.user?.image || "/assets/avatar.svg";

  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
              target="_blank"
            >
              <Image
                alt={siteConfig.name}
                height={60}
                src={"/site-logo.svg"}
                width={100}
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Both in mobile & web */}
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-5 items-center">
            <ThemeSwitch />
            {/* <Avatar isBordered color="warning" size="sm" src={avatarUrl} /> */}
            <Link href="/dashboard/profile">
              <Image
                alt={String(session?.user?.name)}
                className="rounded-full ring-2 ring-warning-500 cursor-pointer"
                height={30}
                src={avatarUrl}
                width={30}
              />
            </Link>
            <LogoutBtn />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu:: */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile DropDown Menu:: */}
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <Divider />
    </>
  );
};
