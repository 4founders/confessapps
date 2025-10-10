import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ConfessAppsLogoProps {
  className?: string;
  alt?: string;
}

export function ConfessAppsLogo({ 
  className = "w-8 h-8 object-contain", 
  alt = "ConfessApps Logo" 
}: ConfessAppsLogoProps) {
  return (
    <ImageWithFallback 
      src="https://res.cloudinary.com/dv5g5nzrk/image/upload/v1757000950/0003D_cortada_pvjcwg.png"
      alt={alt}
      className={className}
    />
  );
}