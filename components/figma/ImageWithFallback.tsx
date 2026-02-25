"use client";
import React, { useState } from "react";
import Image from "next/image";
const ERROR_IMG_SRC = "https://example.com/image.jpg";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {

  const { src, alt, style, className, ...rest } = props;

  const image = typeof src !== "string" ? ERROR_IMG_SRC : src;

  return (
    <div
      className={` inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={image} alt="image of restaurant" />
      </div>
    </div>
  );
}
