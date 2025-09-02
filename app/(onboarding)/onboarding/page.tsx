"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Confetti } from "@/components/magicui/confetti";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

type Option = {
  id: string;
  title: string;
  description: string;
};

type Step = {
  key: string;
  title: string;
  subtitle: string;
  options: Option[];
};

const stepData: Step[] = [
  {
    key: "sellWhere",
    title: "Where do you currently sell?",
    subtitle: "Select all that apply",
    options: [
      {
        id: "instagram",
        title: "Instagram",
        description: "Product posts, Reels, Stories, and DM orders",
      },
      {
        id: "tiktok",
        title: "TikTok",
        description: "Short video content with product tags and links",
      },
      {
        id: "snapchat",
        title: "Snapchat",
        description: "Stories and Spotlight with swipe-up product links",
      },
      {
        id: "twitterx",
        title: "Twitter/X",
        description: "Posts/threads with product links and replies",
      },
      {
        id: "whatsapp",
        title: "WhatsApp",
        description: "Direct chats, broadcast lists, and catalog orders",
      },
      {
        id: "other",
        title: "Other",
        description:
          "Another channel (e.g., Facebook, Etsy, in‑person, website)",
      },
    ],
  },
  {
    key: "businessStage",
    title: "What type of products do you sell?",
    subtitle: "This helps us tailor your setup",
    options: [
      {
        id: "fashion",
        title: "Fashion",
        description: "Apparel, footwear, accessories, and hair",
      },
      {
        id: "beauty",
        title: "Beauty & Personal Care",
        description: "Cosmetics, skincare, haircare, and wellness",
      },
      {
        id: "food",
        title: "Food & Drinks",
        description: "Packaged foods, beverages, or meal kits",
      },
      {
        id: "electronics",
        title: "Electronics & Gadgets",
        description: "Devices, accessories, and tech gear",
      },
      {
        id: "home",
        title: "Home & Lifestyle",
        description: "Decor, furnishings, and household items",
      },
      {
        id: "other_products",
        title: "Other",
        description: "Another category not listed here",
      },
    ],
  },
  {
    key: "payments",
    title: "How do you usually take payments?",
    subtitle: "Select all that apply",
    options: [
      {
        id: "cod",
        title: "Cash on Delivery",
        description: "Collect cash when the order is delivered",
      },
      {
        id: "mobile_money",
        title: "Mobile Money",
        description: "Airtel/Tigo cash, MoMo, Vodafone Cash, etc.",
      },
      {
        id: "bank_transfer",
        title: "Bank Transfer",
        description: "Direct bank-to-bank transfers",
      },
      {
        id: "other_payment",
        title: "Other",
        description: "Another payment method not listed",
      },
    ],
  },
  {
    key: "challenges",
    title: "What's your biggest challenge selling online?",
    subtitle: "Select all that apply",
    options: [
      {
        id: "too_many_chats",
        title: "Too many customer chats before orders",
        description: "Answering questions takes too much time before checkout",
      },
      {
        id: "missed_offline",
        title: "Missed sales when I’m offline",
        description: "Customers can’t order when you’re unavailable",
      },
      {
        id: "tracking",
        title: "Tracking orders & stock",
        description: "Hard to track inventory levels and order status",
      },
      {
        id: "getting_customers",
        title: "Getting more customers",
        description: "Need more traffic and conversions",
      },
      {
        id: "managing_payments",
        title: "Managing payments",
        description: "Collecting and reconciling payments is difficult",
      },
    ],
  },
  {
    key: "storeDetails",
    title: "Store Details",
    subtitle: "Set your store name and bio",
    options: [],
  },
];

export default function OnboardingPage() {
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, Set<string>>>(
    () => Object.fromEntries(stepData.map((s) => [s.key, new Set<string>()]))
  );

  // Store Details form state
  const [storeName, setStoreName] = React.useState("");
  const [storeHandle, setStoreHandle] = React.useState("");
  const [storeBio, setStoreBio] = React.useState("");

  // Finish flow state
  const [isCompleting, setIsCompleting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    const handle = storeName
      .toLowerCase()
      .trim()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setStoreHandle(handle);
  }, [storeName]);

  const current = stepData[step];
  const progress = ((step + 1) / stepData.length) * 100;
  const canProceed =
    current.key === "storeDetails"
      ? storeName.trim().length > 0
      : selected[current.key].size > 0;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev[current.key]);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, [current.key]: next };
    });
  }

  function next() {
    if (step < stepData.length - 1) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  const isLast = step === stepData.length - 1;

  async function proceed() {
    if (!canProceed || isCompleting || showSuccess) return;
    if (!isLast) {
      next();
      return;
    }
    // Last step: show 3s loading then success
    try {
      setIsCompleting(true);
      await new Promise((r) => setTimeout(r, 3000));
      setIsCompleting(false);
      setShowSuccess(true);
    } catch {}
  }

  return (
    <div className="min-h-screen w-full bg-black/90 flex items-stretch justify-stretch px-0 md:items-center md:justify-center md:px-4">
      <div className="relative w-full flex-1 min-h-screen md:min-h-0 max-w-3xl md:max-w-2xl">
        {!isCompleting && !showSuccess && (
          <Card className="relative z-10 rounded-none md:rounded-md bg-white text-black shadow-2xl overflow-hidden h-full w-full min-h-screen md:min-h-0 md:h-[620px] flex flex-col">
            <div className="p-5 md:p-8 pb-28 md:pb-8 md:flex-1 md:overflow-y-auto">
              {/* Desktop progress indicator */}
              <div className="hidden md:block mb-6">
                <div className="text-sm text-neutral-600 font-medium">
                  Question {step + 1} of {stepData.length}
                </div>
                <div className="mt-2 flex items-center gap-2 w-40">
                  {stepData.map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        i < step + 1 ? "bg-neutral-900" : "bg-neutral-200"
                      } h-1 rounded-full flex-1`}
                    />
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <h1 className="text-xl md:text-2xl font-semibold">
                    {current.title}
                  </h1>
                  <p className="text-sm text-neutral-600 mt-1">
                    {current.subtitle}
                  </p>

                  {current.key === "storeDetails" ? (
                    <div className="mt-6 space-y-4 text-[13px] md:text-sm">
                      <div className="space-y-2">
                        <Label htmlFor="storeName">Store Name</Label>
                        <Input
                          id="storeName"
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          placeholder="e.g., Lidiya Boutique"
                        />
                        <div className="text-[11px] text-neutral-600">
                          URL handle:
                          <span className="ml-1 font-medium text-neutral-800">
                            olloo.shop/{storeHandle || "your-store"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="storeBio">
                          Short Store Bio/Tagline
                        </Label>
                        <Input
                          id="storeBio"
                          value={storeBio}
                          onChange={(e) => setStoreBio(e.target.value)}
                          placeholder="e.g., Handmade essentials for everyday"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-3 md:grid-cols-2 text-[13px] md:text-sm">
                      {current.options.map((opt) => {
                        const isActive = selected[current.key].has(opt.id);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => toggle(opt.id)}
                            className={`flex items-start gap-3 rounded-md border px-4 py-4 text-left transition-colors ${
                              isActive
                                ? "bg-[#303030] text-white border-[#303030]"
                                : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
                            }`}
                          >
                            <Checkbox
                              id={opt.id}
                              checked={isActive}
                              onCheckedChange={() => toggle(opt.id)}
                              className="mt-1 data-[state=checked]:bg-[#303030] data-[state=checked]:border-[#303030] data-[state=checked]:text-white"
                            />
                            <div className="flex flex-col">
                              <label
                                htmlFor={opt.id}
                                className="font-medium leading-tight"
                              >
                                {opt.title}
                              </label>
                              <div
                                className={`text-[11px] md:text-xs ${
                                  isActive
                                    ? "text-neutral-300"
                                    : "text-neutral-600"
                                }`}
                              >
                                {opt.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              {/* Desktop actions (not animated) */}
              <div className="mt-6 hidden md:flex items-center justify-between">
                <Link
                  href="#"
                  className="text-sm text-neutral-500 hover:text-neutral-700"
                >
                  Skip customized setup →
                </Link>
                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <Button
                      variant="secondary"
                      onClick={back}
                      className="rounded-md"
                      disabled={isCompleting || showSuccess}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={proceed}
                    className="rounded-md"
                    disabled={!canProceed || isCompleting || showSuccess}
                  >
                    {step < stepData.length - 1 ? "Next →" : "Finish"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Mobile bottom bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t">
          <div className="h-1 bg-neutral-200">
            <div
              className="h-full bg-neutral-900 transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="p-4 flex gap-3">
            {step > 0 ? (
              <>
                <Button
                  variant="outline"
                  className="flex-1 rounded-md"
                  onClick={back}
                  disabled={isCompleting || showSuccess}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 rounded-md"
                  onClick={proceed}
                  disabled={!canProceed || isCompleting || showSuccess}
                >
                  {step < stepData.length - 1 ? "Next" : "Finish"}
                </Button>
              </>
            ) : (
              <Button
                className="w-full rounded-md"
                onClick={proceed}
                disabled={!canProceed || isCompleting || showSuccess}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Loading overlay during finish */}
        <AnimatePresence>
          {isCompleting && (
            <motion.div
              className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm grid place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
                <div className="text-sm text-neutral-200">
                  Preparing your shop…
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay with confetti */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <Confetti className="w-full h-full" />
              </div>
              <div className="relative z-10 text-center px-6 text-white">
                <div className="text-lg font-semibold">You’re all set!</div>
                <div className="text-sm text-neutral-300 mt-1">
                  Onboarding complete — your shop is ready.
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href="/">
                    <InteractiveHoverButton className="rounded-full bg-white text-black  hover:text-white">
                      Go to shop
                    </InteractiveHoverButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
