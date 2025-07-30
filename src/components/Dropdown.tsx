import { useEffect, useRef, useState } from "react";
import type { Data } from "../App";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

type Items = {
  data: Data[];
};

const Dropdown = ({ data }: Items) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setHighlightedIndex(-1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => {
        return prev < data.length - 1 ? prev + 1 : 0;
      });
    }

    if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => {
        return prev > 0 ? prev - 1 : data.length - 1;
      });
    }

    if (e.key === "Enter" && highlightedIndex !== -1) {
      const selected = data[highlightedIndex];

      console.log(selected);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useGSAP(() => {
    if (isOpen && dropDownRef.current) {
      gsap.fromTo(
        dropDownRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power1.inOut",
        }
      );
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: isOpen ? 180 : 0,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
  }, [isOpen]);

  //   console.log(data);
  return (
    <div
      className="relative inline-block"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <button
        className="border-2 rounded-lg border-purple-500 cursor-pointer"
        onClick={handleClick}

      >
        <span className="flex text-purple-500">
          DropDown
          <span ref={iconRef}>
            <RiArrowDropDownLine size={30} />
          </span>
        </span>

        {isOpen && (
          <div
            className="absolute z-10 w-fit shadow-lg p-4 rounded-lg"
            ref={dropDownRef}
          >
            {data.map(({ id, name }, index) => {
              return (
                <div
                  key={id}
                  className={`cursor-pointer hover:bg-purple-200 rounded-lg p-2 ${
                    highlightedIndex === index ? "bg-purple-200" : ""
                  }`}
                >
                  {name}
                </div>
              );
            })}
          </div>
        )}
      </button>
    </div>
  );
};

export default Dropdown;
