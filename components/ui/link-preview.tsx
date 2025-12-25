"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    // Convert relative URLs to absolute URLs
    const absoluteUrl = url.startsWith('http') 
      ? url 
      : typeof window !== 'undefined' 
        ? `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`
        : url; // Fallback for SSR
    
    const params = encode({
      url: absoluteUrl,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width,
      "viewport.height": height,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    
    // Preload the image if static
    if (isStatic && imageSrc) {
      const img = new window.Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
      img.src = imageSrc;
    } else {
      setImageLoaded(true);
    }
  }, [isStatic, imageSrc]);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted && isStatic && imageSrc ? (
        <div className="sr-only">
          <Image
            src={imageSrc}
            width={width}
            height={height}
            alt=""
            priority
            className="opacity-0 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  {isStatic && imageSrc ? (
                    <Image
                      src={imageSrc}
                      width={width}
                      height={height}
                      alt="preview image"
                      className="rounded-lg"
                      style={{ width: `${width}px`, height: `${height}px` }}
                      sizes={`${width}px`}
                    />
                  ) : (
                    <img
                      src={src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt="preview image"
                    />
                  )}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
