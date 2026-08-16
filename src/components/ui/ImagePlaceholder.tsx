import Image from "next/image";

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
};

export function ImagePlaceholder({
  src,
  alt,
  priority = false,
  className = "",
  objectPosition = "center center",
}: ImagePlaceholderProps) {
  return (
    <div className={`relative overflow-hidden bg-neutral-950 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover animate-slow-zoom opacity-0-start animate-fade-in"
        style={{ objectPosition }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
    </div>
  );
}
