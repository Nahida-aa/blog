"use client";
// 随机数函数
const getRandomDirection = () => {
  const directions = ["2em", "-2em"];
  return directions[Math.floor(Math.random() * directions.length)];
};
export const moveElementRandomly = (element: Element) => {
  const randomDirectionX = getRandomDirection();
  const randomDirectionY = getRandomDirection();
  (element as HTMLElement).style.transform = `translate(${randomDirectionX}, ${randomDirectionY})`;
};



export const toggleTheme = (
  isMoved: boolean,
  mainButton: HTMLElement,
  daytimeBackground: NodeListOf<HTMLElement>,
  cloud: HTMLElement,
  cloudLight: HTMLElement,
  components: HTMLElement,
  moon: NodeListOf<HTMLElement>,
  stars: HTMLElement,
  onThemeChange?: (theme: 'light' | 'dark') => void
) => {
  if (isMoved) {
    mainButton.style.transform = "translateX(0)";
    mainButton.style.backgroundColor = "rgba(255, 195, 35,1)";
    mainButton.style.boxShadow = "3em 3em 5em rgba(0, 0, 0, 0.5), inset  -3em -5em 3em -3em rgba(0, 0, 0, 0.5), inset  4em 5em 2em -2em rgba(255, 230, 80,1)";
    daytimeBackground[0].style.transform = "translateX(0)";
    daytimeBackground[1].style.transform = "translateX(0)";
    daytimeBackground[2].style.transform = "translateX(0)";
    cloud.style.transform = "translateY(10em)";
    cloudLight.style.transform = "translateY(10em)";
    components.style.backgroundColor = "rgba(70, 133, 192,1)";
    moon.forEach(m => m.style.opacity = "0");
    stars.style.transform = "translateY(-125em)";
    stars.style.opacity = "0";
    onThemeChange?.("light");
  } else {
    mainButton.style.transform = "translateX(110em)";
    mainButton.style.backgroundColor = "rgba(195, 200,210,1)";
    mainButton.style.boxShadow = "3em 3em 5em rgba(0, 0, 0, 0.5), inset  -3em -5em 3em -3em rgba(0, 0, 0, 0.5), inset  4em 5em 2em -2em rgba(255, 255, 210,1)";
    daytimeBackground[0].style.transform = "translateX(110em)";
    daytimeBackground[1].style.transform = "translateX(80em)";
    daytimeBackground[2].style.transform = "translateX(50em)";
    cloud.style.transform = "translateY(80em)";
    cloudLight.style.transform = "translateY(80em)";
    components.style.backgroundColor = "rgba(25,30,50,1)";
    moon.forEach(m => m.style.opacity = "1");
    stars.style.transform = "translateY(-62.5em)";
    stars.style.opacity = "1";
    onThemeChange?.("dark");
  }
};
// 鼠标移动时的逻辑
export const handleMouseMove = (
  isClicked: boolean,
  isMoved: boolean,
  mainButton: HTMLElement,
  daytimeBackground: NodeListOf<HTMLElement>,
  star: NodeListOf<HTMLElement>,
  cloudList: NodeListOf<HTMLElement>
) => {
  // console.log(`handleMouseMove/isClicked: ${isClicked}, isMoved: ${isMoved}`);
  if (isClicked) return;
  if (isMoved) {
    mainButton.style.transform = "translateX(100em)";
    daytimeBackground[0].style.transform = "translateX(100em)";
    daytimeBackground[1].style.transform = "translateX(73em)";
    daytimeBackground[2].style.transform = "translateX(46em)";
    star.forEach((s, i) => {
      const positions = [
        { top: "10em", left: "36em" },
        { top: "40em", left: "87em" },
        { top: "26em", left: "16em" },
        { top: "38em", left: "63em" },
        { top: "20.5em", left: "72em" },
        { top: "51.5em", left: "35em" },
      ];
      s.style.top = positions[i].top;
      s.style.left = positions[i].left;
    });
  } else {
    mainButton.style.transform = "translateX(10em)";
    daytimeBackground[0].style.transform = "translateX(10em)";
    daytimeBackground[1].style.transform = "translateX(7em)";
    daytimeBackground[2].style.transform = "translateX(4em)";
    cloudList.forEach((c, i) => {
      const positions = [
        { right: "-24em", bottom: "10em" },
        { right: "-12em", bottom: "-27em" },
        { right: "17em", bottom: "-43em" },
        { right: "46em", bottom: "-39em" },
        { right: "70em", bottom: "-65em" },
        { right: "109em", bottom: "-54em" },
        { right: "-23em", bottom: "10em" },
        { right: "-11em", bottom: "-26em" },
        { right: "18em", bottom: "-42em" },
        { right: "47em", bottom: "-38em" },
        { right: "74em", bottom: "-64em" },
        { right: "110em", bottom: "-55em" },
      ];
      c.style.right = positions[i].right;
      c.style.bottom = positions[i].bottom;
    });
  }
};

export const handleMouseOut = (
  isClicked: boolean,
  isMoved: boolean,
  mainButton: HTMLElement,
  daytimeBackground: NodeListOf<HTMLElement>,
  star: NodeListOf<HTMLElement>,
  cloudList: NodeListOf<HTMLElement>
) => {
  // console.log(`handleMouseOut/isClicked: ${isClicked}, isMoved: ${isMoved}`);
  if (isClicked) return;
  if (isMoved) {
    mainButton.style.transform = "translateX(110em)";
    daytimeBackground[0].style.transform = "translateX(110em)";
    daytimeBackground[1].style.transform = "translateX(80em)";
    daytimeBackground[2].style.transform = "translateX(50em)";
    star.forEach((s, i) => {
      const positions = [
        { top: "11em", left: "39em" },
        { top: "39em", left: "91em" },
        { top: "26em", left: "19em" },
        { top: "37em", left: "66em" },
        { top: "21em", left: "75em" },
        { top: "51em", left: "38em" },
      ];
      s.style.top = positions[i].top;
      s.style.left = positions[i].left;
    });
  } else {
    mainButton.style.transform = "translateX(0em)";
    daytimeBackground[0].style.transform = "translateX(0em)";
    daytimeBackground[1].style.transform = "translateX(0em)";
    daytimeBackground[2].style.transform = "translateX(0em)";
    cloudList.forEach((c, i) => {
      const positions = [
        { right: "-20em", bottom: "10em" },
        { right: "-10em", bottom: "-25em" },
        { right: "20em", bottom: "-40em" },
        { right: "50em", bottom: "-35em" },
        { right: "75em", bottom: "-60em" },
        { right: "110em", bottom: "-50em" },
        { right: "-20em", bottom: "10em" },
        { right: "-10em", bottom: "-25em" },
        { right: "20em", bottom: "-40em" },
        { right: "50em", bottom: "-35em" },
        { right: "75em", bottom: "-60em" },
        { right: "110em", bottom: "-50em" },
      ];
      c.style.right = positions[i].right;
      c.style.bottom = positions[i].bottom;
    });
  }
};