export const contactConfig = {
  recipientEmail: "magicalideatw@gmail.com",
  fromEmail: "網站聯絡表單 <onboarding@resend.dev>",
  inquiryTypes: [
    { value: "performance", label: "演出邀約" },
    { value: "commercial", label: "商業／活動合作" },
    { value: "artistic", label: "藝術合作" },
    { value: "education", label: "藝術教育" },
    { value: "other", label: "其他" },
  ],
  fieldLimits: {
    name: 100,
    email: 254,
    message: 5000,
  },
} as const;

export type ContactFormPayload = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};

export type ContactRequestBody = ContactFormPayload & {
  turnstileToken: string;
  website?: string;
};
