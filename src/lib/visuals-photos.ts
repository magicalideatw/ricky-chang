export type VisualPhoto = {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  featured?: boolean;
};

export const visualPhotos: VisualPhoto[] = [
  {
    src: "/images/08.jpg",
    alt: "Ricky Chang 個人形象照，白鴿與 RICKY CHANG 字樣",
    objectFit: "contain",
    featured: true,
  },
  {
    src: "/images/07.jpg",
    alt: "Ricky Chang 舞台魔術表演瞬間",
    objectFit: "cover",
    objectPosition: "50% 42%",
  },
];
