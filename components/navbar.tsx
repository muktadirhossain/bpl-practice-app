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
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { auth } from "@/auth";
import { Button } from "@nextui-org/button";
import { LogInIcon } from "lucide-react";

export const Navbar = async () => {
  const session = await auth();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit ">
          <NextLink href="/">
            <Image
              alt={siteConfig.name}
              height={60}
              src={"/site-logo.svg"}
              width={100}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      {/* desktop menu */}
      <NavbarContent justify="center">
        <ul className="hidden lg:flex gap-4 justify-center items-center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "warning" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium 2text-xl"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {session && session?.user && (
            <NavbarItem>
              <NextLink
                className={clsx(
                  linkStyles({ color: "warning" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium 2text-xl"
                )}
                color="foreground"
                href={"/dashboard/home"}
              >
                Dashboard
              </NextLink>
            </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {!session && (
            <Link className="mx-1" href="/login">
              <Button
                isIconOnly
                color="warning"
                variant="shadow"
                size="sm"
                startContent={<LogInIcon className="h-5 w-5" />}
              />
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      {/* Mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      {/* Mobile */}
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
  );
};
