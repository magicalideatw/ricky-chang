export const contactConfig = {
  recipientEmail: "magicalideatw@gmail.com",
  inquiryTypes: [
    { value: "performance", label: "演出邀約" },
    { value: "commercial", label: "商業／活動合作" },
    { value: "artistic", label: "藝術合作" },
    { value: "education", label: "藝術教育" },
    { value: "other", label: "其他" },
  ],
} as const;

export type ContactFormPayload = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};
