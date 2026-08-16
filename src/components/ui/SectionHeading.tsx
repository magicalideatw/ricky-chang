type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  children,
  className = "",
  align = "left",
  id,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`font-display text-xs font-medium tracking-[0.35em] text-foreground uppercase ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
