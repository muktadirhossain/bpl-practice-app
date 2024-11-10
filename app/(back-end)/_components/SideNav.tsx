"use client";
import {
  LayoutGrid,
  Newspaper,
  LibraryBig,
  Store,
  ShoppingCart,
  StopCircleIcon,
  UsersRound
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";

import { IconWrapper } from "./IconWraper";

import { HelmetIcon, TeamsIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

const SideNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      title: "Dashboard",
      key: "/home",
      icon: LayoutGrid,
    },
    // {
    //   title: "Players",
    //   key: "/players",
    //   icon: HelmetIcon,
    // },
    // {
    //   title: "Teams",
    //   key: "/teams",
    //   icon: TeamsIcon,
    // },
    {
      title: "Sponsorship",
      key: "/sponsorship",
      icon: Newspaper,
    },
    {
      title: "Users",
      key: "/users",
      icon: UsersRound,
    },
  ];

  const shopMenu = [
    {
      title: "Products Categories",
      key: "/product-category",
      icon: StopCircleIcon,
    },
    {
      title: "Shop",
      key: "/shop",
      icon: Store,
    },
    {
      title: "Orders",
      key: "/orders",
      icon: ShoppingCart,
    },
  ];

  const newsMenu = [
    {
      title: "News Category",
      key: "/category",
      icon: LibraryBig,
    },
    {
      title: "News",
      key: "/news",
      icon: Newspaper,
    },
  ];

  const handleNavigation = (key: string) => {
    router.push(`/dashboard/${key}`);
  };

  return (
    <div className="m-0.5">
      <Listbox
        aria-label="Side navigation menu"
        // className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 min-w-[300px] overflow-visible shadow-small rounded-medium"
        // itemClasses={{
        //   base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        // }}
        onAction={(key) => handleNavigation(key as string)}
      >
        <ListboxSection showDivider={true} title="Main Menu">
          {menuItems.map((item) => (
            <ListboxItem
              key={item.key}
              className={cn({
                "text-warning-500": pathname.includes(item.key),
              })}
              startContent={
                <IconWrapper
                  className={cn("bg-success/10 text-success", {
                    "bg-durbarDeep/10 text-durbarDeep": pathname.includes(
                      item.key,
                    ),
                  })}
                >
                  <item.icon
                    className={cn("h-4 w-4", {
                      "text-durbarDeep": pathname?.includes(item.key),
                    })}
                  />
                </IconWrapper>
              }
              textValue={item.title}
            >
              <span
                className={cn({
                  "text-durbarDeep": pathname?.includes(item.key),
                })}
              >
                {item.title}
              </span>
            </ListboxItem>
          ))}
        </ListboxSection>
        <ListboxSection showDivider={true} title="Shop Menu">
          {shopMenu.map((item) => (
            <ListboxItem
              key={item.key}
              className={cn({
                "text-warning-500": pathname.includes(item.key),
              })}
              startContent={
                <IconWrapper
                  className={cn("bg-success/10 text-success", {
                    "bg-durbarDeep/10 text-durbarDeep": pathname.includes(
                      item.key,
                    ),
                  })}
                >
                  <item.icon
                    className={cn("h-4 w-4", {
                      "text-durbarDeep": pathname?.includes(item.key),
                    })}
                  />
                </IconWrapper>
              }
              textValue={item.title}
            >
              <span
                className={cn({
                  "text-durbarDeep": pathname?.includes(item.key),
                })}
              >
                {item.title}
              </span>
            </ListboxItem>
          ))}
        </ListboxSection>
        <ListboxSection title="News Menu">
          {newsMenu.map((item) => (
            <ListboxItem
              key={item.key}
              className={cn({
                "text-warning-500": pathname.includes(item.key),
              })}
              startContent={
                <IconWrapper
                  className={cn("bg-success/10 text-success", {
                    "bg-durbarDeep/10 text-durbarDeep": pathname.includes(
                      item.key,
                    ),
                  })}
                >
                  <item.icon
                    className={cn("h-4 w-4", {
                      "text-durbarDeep": pathname?.includes(item.key),
                    })}
                  />
                </IconWrapper>
              }
              textValue={item.title}
            >
              <span
                className={cn({
                  "text-durbarDeep": pathname?.includes(item.key),
                })}
              >
                {item.title}
              </span>
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default SideNav;
