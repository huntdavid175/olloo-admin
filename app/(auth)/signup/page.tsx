"use client";

import * as React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Logo } from "@/components/Brand/Logo";
import { SignupForm } from "@/components/Forms/SignupForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://cdn.shopify.com/static/images/identity/merchant-moving-bg.webp"
      >
        <source
          src="https://cdn.shopify.com/static/videos/identity/merchant-moving-bg.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,.65)_80%,rgba(0,0,0,.25)_100%)]" />
      <svg
        className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.6"
            numOctaves="6"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-white">
        <Logo size={20} />
        <span className="text-sm font-semibold">olloo</span>
      </div>
      <div className="relative z-10 flex min-h-screen items-stretch justify-stretch px-0 md:px-4 md:items-center md:justify-center">
        <div className="w-full max-w-md space-y-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
