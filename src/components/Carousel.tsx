import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import type { User } from "../utils/faker";

type Props = {
  users: User[];
};

const Carousel = ({ users }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const startTimeline = (startIndex: number) => {
    if (!sliderRef.current) return;

    // Kill old timeline if exists
    timelineRef.current?.kill();

    const timeline = gsap.timeline({ repeat: -1 });
    for (let i = 0; i < users.length; i++) {
      const slideIndex = (startIndex + i) % users.length;
      timeline.to(sliderRef.current, {
        x: `-${slideIndex * 100}vw`,
        duration: 0.8,
        ease: "power2.inOut",
        onStart: () => setActiveIndex(slideIndex),
      });
      timeline.to({}, { duration: 2 }); // Pause between slides
    }

    timelineRef.current = timeline;
  };

  useGSAP(() => {
    startTimeline(0); // start from first slide initially
  }, [users]);

  // Click to jump to slide
  const goToSlide = (index: number) => {
    if (!sliderRef.current) return;

    // Stop autoplay
    timelineRef.current?.pause();

    // Jump to clicked slide immediately
    gsap.to(sliderRef.current, {
      x: `-${index * 100}vw`,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveIndex(index);

        // Wait 5s then restart autoplay from clicked slide
        gsap.delayedCall(5, () => {
          startTimeline(index);
        });
      },
    });
  };

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={sliderRef}
        className="flex w-max"
        // style={{ width: `${users.length * 100}vw` }}
      >
        {users.map(({ _id, firstName, lastName, avatar }) => (
          <div key={_id} className="w-[100vw] flex-shrink-0">
            <div className="relative w-96 mx-auto">
              <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                <p className="md:text-2xl text-xl font-medium text-white">
                  {firstName} {lastName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center mt-6 gap-3">
        {users.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-white border-2 border-white"
                : "border-2 border-gray-500 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
