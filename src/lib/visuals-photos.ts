export type VisualPhoto = {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

/** Order: 08 featured, then 03 / 07 / 06 for gallery + lightbox */
export const visualPhotos: VisualPhoto[] = [
  {
    src: "/images/08.jpg",
    alt: "Ricky Chang 個人形象照，白鴿與 RICKY CHANG 字樣",
    objectFit: "contain",
  },
  {
    src: "/images/03.jpg",
    alt: "Ricky Chang 舞台魔術表演",
    objectFit: "cover",
    objectPosition: "50% 38%",
  },
  {
    src: "/images/07.jpg",
    alt: "Ricky Chang 舞台魔術表演瞬間",
    objectFit: "cover",
    objectPosition: "50% 42%",
  },
  {
    src: "/images/06.jpg",
    alt: "Ricky Chang 視覺魔術倒酒效果",
    objectFit: "cover",
    objectPosition: "52% 40%",
  },
];
