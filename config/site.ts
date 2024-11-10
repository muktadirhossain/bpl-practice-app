export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "BPL 2024",
  description: "Best team in BPL tournament",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Videos",
      href: "/videos",
    },
    {
      label: "Durbar News",
      href: "/durbar-news",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  // mobile-menu
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },

    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    facebook: "https://www.facebook.com/profile.php?id=61565656425402",
    website: "https://www.test.com/",
  },
  developed: {
    by: "Muktadir Hossain",
    link: "https://github.com/muktadirhossain",
  },
  API_KEY: {
    youtube_key: process.env.YOUTUBE_API_KEY,
    // play_list_id: 'PLmEBUETMvFjlu-wJtIn9w0rkYjBYMfz2z',// my playlist id::
    play_list_id: "PLHiZ4m8vCp9NfppyV7QSPjO92Z96VE1O4",
  },
  USER_ROLES: ["admin", "user", "superadmin"],
  DB_NAME: "bpl-website",
};
