import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Image from 'next/image';
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  Dark?: boolean;
}

const Cards = ({ imgSrc, Dark = false, className, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        src={
          Dark
            ? "paper-red.jpg"
            : "paper-white.png"
        }
        className="pointer-events-none z-50 select-none w-full h-full"
        alt="t-shirt template"
      />
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          className="object-contain w-2/3 h-2/3"
          src={imgSrc}
          alt="Overlaying t-shirt image"
          width={500}   // Add a width if needed
          height={500}  // Add a height if needed
        />
      </div>
    </div>
  );
};

export default Cards;
