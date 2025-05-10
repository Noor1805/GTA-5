import React, { useEffect, useRef, useState } from "react";
import bg from "./assets/mainbg.png";
import bl from "./assets/bl.png";
import sky from "./assets/sky.png";
import ps from "./assets/ps5.png";
import girl from "./assets/girlbg.png";
import { useGSAP } from "@gsap/react";
import limg from "./assets/imag.png";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  const limgRef = useRef(null);

  useEffect(() => {
    if (!showContent) return;

    // Image animation
    gsap.fromTo(
      limgRef.current,
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "sine.in",
        scrollTrigger: {
          trigger: "#next-page",
          start: "top 30%",
          toggleActions: "restart none none none",
        },
      }
    );

    gsap.fromTo(
      "#next-page h1,#next-page button",
      {
        x: 300, 
        opacity: 0, 
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "sine.in",
        scrollTrigger: {
          trigger: "#next-page",
          start: "top 30%",
          toggleActions: "restart none none none",
        },
      }
    );

    // Paragraph animation with stagger
    const paragraphs = document.querySelectorAll("#next-page p");

    paragraphs.forEach((para, index) => {
      gsap.fromTo(
        para,
        { opacity: 0, x: 50 }, // Initial state
        {
          opacity: 1, // Final state
          x: 0,
          duration: 1,
          ease: "sine-in",
          scrollTrigger: {
            trigger: para,
            start: "top 90%",
            end: "top 40%", // Trigger animation when the paragraph is near the top
            // Stop when the paragraph is near the center
            toggleActions: "restart none none none", // Play the animation once
            
            scrub: true, 
          },
        }
      );
    });
  }, [showContent]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.easeinOut",
      transformOrigin: "50% 50%",
    });
    tl.to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeinOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".girl", {
      scale: 1,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".ps", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen  bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            className="object-cover"
            href={bl}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full">
          <div className="landing w-full h-screen bg-black">
            <div className="navbar w-full py-10 absolute px-10 z-10 top-0 left-0">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px] ">
                  <div className="lines w-15 h-1 bg-white"></div>
                  <div className="lines w-8 h-1 bg-white"></div>
                  <div className="lines w-5 h-1 bg-white"></div>
                </div>
                <h3 className="text-3xl font-bold -mt-[6px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>
            <div className="imagesdiv overflow-hidden relative w-full h-screen ">
              <img
                className="sky absolute scale-[1.2] top-0 left-0 w-full h-full object-cover "
                src={sky}
              />
              <img
                className="bg absolute top-0 scale-[1.2] w-full h-full object-cover left-0 "
                src={bg}
                alt=""
              />
              <div className="text  leading-none flex flex-col gap-4 text-white absolute top-5  left-1/2 -translate-x-1/2 ">
                <h1 className="ml-39 text-[8rem]">grand</h1>
                <h1 className="ml-[30rem] text-[8rem]">theft</h1>
                <h1 className="ml-25 text-[8rem]">auto</h1>
              </div>
              <img
                className="girl absolute top-[7%]  left-1/2 -translate-x-1/2 scale-[0.8] "
                src={girl}
                alt=""
              />
            </div>
            <div className="btmbar w-full py-10 px-10 absolute bottom-[40.9rem] left-0 bg-gradient-to-t from-black to-transparent">
              <div
                className="scroll text-white  flex items-center
              gap-4"
                onClick={() => {
                  document
                    .getElementById("next-page")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <i className="ri-arrow-down-line text-4xl"></i>
                <h3 className="font-[Helvetica_Now_Dispaly] text-xl">
                  Scroll Down
                </h3>
              </div>
              <img
                className="ps absolute  text-white h-[65px] top-[4rem] left-[40%] -translate-x-1/2 -translate-y-1/2 z-10"
                src={ps}
                alt=""
              />
            </div>
          </div>
          <div
            id="next-page"
            className="w-full p-[30px] h-screen flex items-center justify-center bg-black"
          >
            <div className="center flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  ref={limgRef}
                  className="absolute scale-[1.3] top-[2rem] left-[1rem] "
                  src={limg}
                  alt=""
                />
              </div>
              <div className="rg w-[50%] py-30">
                <h1 className="text-8xl">
                  Still Running,
                  <br />
                  not hunting ...{" "}
                </h1>

                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <button className="button bg-yellow-500  px-10 py-10 text-black mt-10 text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}

export default App;
