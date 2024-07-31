

import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { mortazaImages } from "../../assets/dashboard";

export default function CarouselCrossfade() {
  return (
    <TECarousel showControls showIndicators crossfade ride="carousel">
      <div className="relative rounded-lg w-full h-96 overflow-hidden after:clear-both after:block after:content-['']">
        {mortazaImages.map((image, index) => (
          <TECarouselItem
            key={index}
            itemID={index + 1}
            className="relative float-left -mr-[100%] hidden w-full !transform-none transition-opacity duration-[100ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src={image}
              className="block w-full"
              alt={`Slide ${index + 1}`}
            />
          </TECarouselItem>
        ))}
      </div>
    </TECarousel>
  );
}
