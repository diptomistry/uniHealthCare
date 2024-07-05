import React, { useEffect, useState, useRef } from "react";

function InfiniteMovingCards({
  items,
  direction = "left",
  className,
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    containerRef.current.style.setProperty("--animation-duration", "80s");
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-7xl overflow-hidden mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent) ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ${start ? "animate-scroll" : ""} hover:pause`}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] h-[200px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] flex flex-col"
            style={{
              backgroundColor: "#1f2937",
            }}
            key={item.name}
          >
            <div className="flex-grow overflow-y-auto mb-4">
              <span className="text-sm leading-[1.6]  text-white font-normal">
                {item.quote}
              </span>
            </div>
            <div className="mt-auto flex">
            
              <span className="text-sm leading-[1.6] text-gray-400 font-normal block">
              {item.title}<span className="ml-1 mr-1">by</span>
              </span>
              <span className="text-sm leading-[1.6] text-textColor font-normal block">
                {item.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InfiniteMovingCards;