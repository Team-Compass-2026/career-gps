"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, Compass, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

const FAQ_ITEMS = [
  {
    question: "How does Career GPS work?",
    answer:
      "Career GPS turns scattered career information into a clear, personal pathway. You start by telling us where you are — your education, skills, interests, and goals. We analyze the gap between your current profile and your target career, then map a step-by-step route: foundation skills, projects, experience, and applications. You take action, track your progress, and your pathway recalculates as you grow.",
  },
  {
    question: "What careers are supported?",
    answer:
      "Career GPS covers in-demand fields across technology, data, design, product, business, and healthcare — from Data Analyst and Frontend Developer to Product Manager, UX Designer, and beyond. You can compare similar careers side by side so you choose with confidence, and new careers are added regularly based on real labor-market data.",
  },
  {
    question: "Is Career GPS free?",
    answer:
      "Yes — you can start for free. Building your profile, exploring careers, and getting your first pathway are free. Advanced skill-gap analysis, the AI career coach, and deeper progress tracking are part of our freemium model. We stay with you until you do it — and we never sell your data.",
  },
  {
    question: "How does the AI career coach work?",
    answer:
      "The coach is not a generic chatbot. It understands your profile, your career goal, your roadmap, and your progress. Ask questions like \u201cWhat should I learn next?\u201d or \u201cAm I ready for an internship?\u201d and you\u2019ll get answers grounded in curated career data, with citations you can check. The coach guides — you remain the decision-maker.",
  },
  {
    question: "Do I need a mentor to use Career GPS?",
    answer:
      "No. The AI-navigation core works on its own and is available to everyone. Mentors add human depth — real experience, industry insight, and accountability. Mentor matching is rolling out now, with early matches coming soon. AI helps you navigate; humans help you understand the journey.",
  },
  {
    question: "How do I track my progress?",
    answer:
      "Every roadmap step has a status: not started, in progress, or completed. Mark milestones as you finish them — skills, projects, applications, and experience — and watch your career readiness grow. Your pathway recalculates automatically, so your next step always reflects where you are right now.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Your profile and progress are yours. We never share personal information with third parties, and no personal data is used to train AI models. You can export or delete your data at any time. Privacy and trust are built into how Career GPS works.",
  },
];

type FaqItemProps = {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, open, onToggle }: FaqItemProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-card shadow-card transition-colors duration-300",
        open ? "border-primary/40" : "border-border",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none transition-colors hover:bg-surface-muted/50 focus-visible:ring-2 focus-visible:ring-ring sm:px-6 sm:py-5"
      >
        <span className="text-base font-semibold text-foreground sm:text-lg">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
            open ? "rotate-180" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SiteHeader />
      <main className="container-career py-16 md:py-24">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-subtle">
              <MessageCircleQuestion className="h-4 w-4 text-primary" aria-hidden="true" />
              FAQ
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Questions? We&apos;ve got{" "}
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                direction.
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Everything you need to know about building your career pathway with Career GPS.
            </p>
          </motion.div>

          <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-3 sm:mt-16">
            {FAQ_ITEMS.map((item, index) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft via-surface to-teal-soft px-6 py-12 text-center shadow-card">
              <Compass className="absolute -right-12 -top-12 h-48 w-48 text-primary/10" aria-hidden="true" />
              <div className="relative mx-auto max-w-xl">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Still have questions?
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  We&apos;re a real team — send us a message and we&apos;ll point you in the right
                  direction.
                </p>
                <div className="mt-7">
                  <Link href="/contact">
                    <Button className="h-12 rounded-2xl px-8 text-base font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating active:scale-95">
                      Contact us
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </MotionConfig>
      </main>
      <SiteFooter />
    </>
  );
}