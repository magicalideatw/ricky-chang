export const siteConfig = {
  name: "Ricky Chang",
  nameZh: "張煜晟",
  fullName: "張煜晟 Ricky Chang",
  tagline: "Magician · Performer · Creator",
  taglineUpper: "MAGICIAN · PERFORMER · CREATOR",
  description:
    "張煜晟 Ricky Chang，台灣舞台魔術師、表演者與創作者。曾代表台灣參與 FISM 2015，獲國際魔術競賽獎項，並受邀參與台北國際魔術節等演出。",
  url: "https://www.ricky-chang.com",
  seo: {
    title: "張煜晟 Ricky Chang｜台灣舞台魔術師・表演者・創作者",
    description:
      "張煜晟 Ricky Chang，台灣舞台魔術師、表演者與創作者。曾代表台灣參與 FISM 2015，獲國際魔術競賽獎項，並受邀參與台北國際魔術節等演出。",
    ogImage: "/images/Hero.jpg",
    ogImageAlt: "張煜晟 Ricky Chang 舞台魔術演出",
  },
  socialLinks: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/rickychang_magic",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/rickychangmagic",
    },
  ],
} as const;

export const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
] as const;
