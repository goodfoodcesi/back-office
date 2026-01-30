"use client";
import React, { useState } from "react";
import Image from "next/image";
const ERROR_IMG_SRC = "https://example.com/image.jpg";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const [didError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <Image src={ERROR_IMG_SRC} alt="Error loading image" />
      </div>
    </div>
  ) : (
    "Error"
  );
}
