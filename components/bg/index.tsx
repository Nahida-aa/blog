// import { AnimatePresence, motion } from "framer-motion"
// const videoExtensions = [
//   ".mp4",
//   ".webm",
//   ".ogg",
//   ".mov",
//   ".avi",
//   ".flv",
//   ".mkv",
// ];
// type IsVideo = (url: string) => boolean;
// const isVideo: IsVideo = (url) => videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));

// const renderVideo = (
//   src: string,
//   className: string = "",
//   key: number | string
// ) => {
//   return (
//     <>
//       <motion.video
//         key={`v:${key}:${src}`}
//         ref={videoRef}
//         className={clsx(`${className} object-cover`)}
//         preload="auto"
//         src={src}
//         loop
//         muted
//         autoPlay
//         {...variant}
//         transition={{
//           duration: transitionTime || 0.7,
//           ease: "easeInOut",
//         }}
//       ></motion.video>
//     </>
//   );
// };


// const renderBg = (url: string, isMbg: boolean, key: number) => {
//   const classNames = clsx(className, {
//     "md:hidden": isMbg,
//     "[@media(max-width:768px)]:hidden": !isMbg,
//   });

//   if (!url) return null;

//   if (isVideo(url)) return renderVideo(url, classNames, url);

//   return (
//     <motion.div
//       key={`${key}:${url}`}
//       className={clsx(classNames, {
//         "animate-[mio-bg-top_6s_linear_reverse_infinite]":
//           key % 4 == 0 && autoAnimate,
//         "animate-[mio-bg-bottom_6s_linear_reverse_infinite]":
//           key % 4 == 1 && autoAnimate,
//         "animate-[mio-bg-right_6s_linear_reverse_infinite]":
//           key % 4 == 2 && autoAnimate,
//         "animate-[mio-bg-left_6s_linear_reverse_infinite]":
//           key % 4 == 3 && autoAnimate,
//       })}
//       style={{
//         backgroundImage: `url(${url})`,
//       }}
//       {...variant}
//       transition={{
//         duration: transitionTime || 0.7,
//         ease: "easeInOut",
//       }}
//     ></motion.div>
//   );
// };

// type BackgroundProps = {
//   src: string;
  
// };
// type BackgroundJsx = (props: BackgroundProps) => JSX.Element;
// export const backgroundJsx: BackgroundJsx = ({ src, alt, className }) => {
//   return (
//     <section className="z-0">
//       <AnimatePresence></AnimatePresence>
//     </section>
//   );
// }