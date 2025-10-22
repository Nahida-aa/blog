import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage, { type ImageProps } from "next/image";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" opacity="0.5">
  <defs>
    <linearGradient id="g-image-shimmer">
      <stop stop-color="#ccc" offset="20%" />
      <stop stop-color="#eee" offset="50%" />
      <stop stop-color="#ccc" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g-image-shimmer)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
const toBase64 = (str: string) => {
  try {
    return typeof window === "undefined"
      ? Buffer.from(str).toString("base64") // Node
      : window.btoa(str); // 浏览器
  } catch (err) {
    console.error("Failed to convert to Base64:", err);
    return null;
  }
};
const makeBlurDataURL = (width: number, height: number) => {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
};

type ServerImageProps = ImageProps & {
  skeleton?: boolean;
}

export const ServerImage = ({
  width,
  height,
  src,
  alt = "img",
  className,
  fill,
  skeleton = false,
  unoptimized = true, // 所有图片都绕过了 Next 的优化。如果你的项目部署在 Vercel（能用 edge cache），建议默认 false，只在动态用户上传的图（可能跨域/CDN）才传 unoptimized
  ...imageProps
}: Omit<ServerImageProps, 'src'> & {
  src?: string | StaticImport | null;
}) => {
  const blur = skeleton && !fill
  return <NextImage
    src={src || makeBlurDataURL(width as number, height as number)}
    alt={alt}
    width={width}
    height={height}
    unoptimized={unoptimized}
    placeholder={blur ? "blur" : undefined}
    blurDataURL={blur ? makeBlurDataURL(width as number, height as number) : undefined}
    className={className}
    {...imageProps}
  />
};

ServerImage.displayName = "ServerImage";


export async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}