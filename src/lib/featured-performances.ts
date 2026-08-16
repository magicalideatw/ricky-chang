export type FeaturedPerformance = {
  title: string;
  subtitle: string;
  subtitleEn?: string;
  seoTitle: string;
  seoDescription: string;
  youtubeId: string;
};

export const featuredPerformances: FeaturedPerformance[] = [
  {
    title: "Ricky Chang",
    subtitle: "Stage Magic Performance",
    seoTitle: "張煜晟 Ricky Chang 舞台魔術演出｜Stage Magic Performance",
    seoDescription:
      "張煜晟 Ricky Chang 的舞台魔術演出作品，展現 Magic Performer 與 Magic Creator 的現場表演能量。",
    youtubeId: "pw4MR82G6Vk",
  },
  {
    title: "Ricky Chang",
    subtitle: "舞台魔術秀｜綜藝大熱門",
    subtitleEn: "Stage Magic Show | Hot Door Night",
    seoTitle: "舞台魔術秀｜綜藝大熱門 Hot Door Night｜張煜晟 Ricky Chang",
    seoDescription:
      "張煜晟 Ricky Chang 於綜藝大熱門 Hot Door Night 演出的舞台魔術秀，呈現台灣舞台魔術師的現場魔術演出。",
    youtubeId: "fWGyYMbqnvA",
  },
];

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}`;
}
