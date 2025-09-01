"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

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
    title: "Where would you like to sell?",
    subtitle: "We'll make sure you're set up to sell in these places",
    options: [
      {
        id: "online",
        title: "An online store",
        description: "Create a fully customizable website",
      },
      {
        id: "retail",
        title: "In person at a retail store",
        description: "Brick-and-mortar stores",
      },
      {
        id: "events",
        title: "In person at events",
        description: "Markets, fairs, and pop-ups",
      },
      {
        id: "existing",
        title: "An existing website or blog",
        description: "Add a Buy Button to your website",
      },
      {
        id: "social",
        title: "Social media",
        description: "Reach customers on Facebook, Instagram, TikTok, and more",
      },
      {
        id: "marketplaces",
        title: "Online marketplaces",
        description: "List products on Etsy, Amazon, and more",
      },
    ],
  },
  {
    key: "businessStage",
    title: "What describes your business today?",
    subtitle: "This helps us tailor your setup",
    options: [
      {
        id: "new",
        title: "I'm just getting started",
        description: "No sales yet",
      },
      {
        id: "online_only",
        title: "I'm already selling online",
        description: "Migrating or expanding",
      },
      {
        id: "in_person",
        title: "I'm selling in-person",
        description: "Markets, fairs, or retail",
      },
      {
        id: "both",
        title: "Both online and in-person",
        description: "Multiple channels",
      },
    ],
  },
  {
    key: "revenue",
    title: "What's your current monthly revenue?",
    subtitle: "An estimate is fine",
    options: [
      { id: "none", title: "Not selling yet", description: "Pre-launch" },
      { id: "under5k", title: "Up to $5,000", description: "Early traction" },
      { id: "5k_25k", title: "$5,000 – $25,000", description: "Growing" },
      { id: "25k_plus", title: "$25,000+", description: "Scaling" },
    ],
  },
  {
    key: "products",
    title: "What will you sell?",
    subtitle: "Choose all that apply",
    options: [
      {
        id: "physical",
        title: "Physical products",
        description: "Items you ship",
      },
      {
        id: "digital",
        title: "Digital products",
        description: "Downloads or memberships",
      },
      {
        id: "services",
        title: "Services",
        description: "Appointments or projects",
      },
      {
        id: "dropship",
        title: "Dropshipping",
        description: "Fulfilled by partners",
      },
    ],
  },
];

export default function OnboardingPage() {
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, Set<string>>>(
    () => Object.fromEntries(stepData.map((s) => [s.key, new Set<string>()]))
  );

  const current = stepData[step];
  const progress = ((step + 1) / stepData.length) * 100;

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

  return (
    <div className="min-h-screen w-full bg-black/90 flex items-stretch justify-stretch px-0 md:items-center md:justify-center md:px-4">
      <div className="relative w-full flex-1 min-h-screen md:min-h-0 max-w-3xl md:max-w-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 20, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10"
          >
            <Card className="relative z-10 rounded-none md:rounded-md bg-white text-black shadow-2xl overflow-hidden h-full w-full min-h-screen md:min-h-0">
              <div className="p-5 md:p-8 pb-28 md:pb-8">
                <h1 className="text-xl md:text-2xl font-semibold">
                  {current.title}
                </h1>
                <p className="text-sm text-neutral-600 mt-1">
                  {current.subtitle}
                </p>

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
                              isActive ? "text-neutral-300" : "text-neutral-600"
                            }`}
                          >
                            {opt.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Desktop actions */}
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
                      >
                        Back
                      </Button>
                    )}
                    <Button onClick={next} className="rounded-md">
                      {step < stepData.length - 1 ? "Next →" : "Finish"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile bottom bar */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t">
                <div className="h-1 bg-neutral-200">
                  <div
                    className="h-full bg-neutral-900"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="p-4 flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-md">
                    Skip all
                  </Button>
                  <Button className="flex-1 rounded-md" onClick={next}>
                    {step < stepData.length - 1 ? "Next" : "Finish"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
