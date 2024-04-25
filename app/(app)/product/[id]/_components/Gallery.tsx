"use client";

import { IProduct } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import ZoomImage from "./ZoomImage";
import { useScreenDetector } from "@/hooks/isMobile";

const Gallery = ({ product }: { product: IProduct }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [transitioning, setTransitioning] = useState(false);
  const { isMobile } = useScreenDetector();

  const handleImageClick = (img: string) => {
    setTransitioning(true);
    setSelectedImage(img);

    setTimeout(() => {
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className="w-full px-4 md:w-1/2">
      <div className="sticky top-0 z-30 overflow-hidden">
        <div
          className={`relative mb-6 lg:mb-10 h-[450px] transition-transform ease-in-out duration-300  ${
            transitioning ? "transform scale-95" : "transform scale-100 "
          }`}
        >
          <div className={`relative w-full h-full overflow-hidden`}>
            {isMobile ? (
              <Image
                width={200}
                height={200}
                src={selectedImage}
                alt=""
                className="object-contain w-full h-full"
              />
            ) : (
              <ZoomImage width={350} height={350} src={selectedImage} />
            )}
          </div>
        </div>
        <div className="flex mt-10 gap-4">
          {product.images.map((img, key) => (
            <div
              key={key}
              className={`w-1/${
                product.images.length > 1 ? product.images.length : 4
              } p-1 border-solid border-2 hover:border-cyan-400 border-gray-400 cursor-pointer transition-transform ease-in-out duration-300`}
            >
              <Image
                width={200}
                height={200}
                src={img}
                alt=""
                className="object-cover w-full h-32 opacity-100 hover:opacity-75 transition-opacity ease-in-out duration-300"
                onClick={() => handleImageClick(img)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
