"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowRight,
  BookMarked,
  ChevronDown,
  Compass,
  Send,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const USER_NAME = "Alex";
const CAREER_GOAL = "Data Analyst";

const QUICK_PROMPTS = [
  "What skills do I need?",
  "Build my roadmap",
  "Find a mentor",
  "How long will it take?",
];

const MENTORS = [
  {
    name: "Priya Sharma",
    role: "Senior Data Analyst",
    org: "Nova Analytics",
    initials: "PS",
    match: 92,
    ringClass: "ring-teal",
    fallbackClass: "bg-teal-soft text-teal",
  },
  {
    name: "Marcus Chen",
    role: "Data Science Mentor",
    org: "FinBright",
    initials: "MC",
    match: 88,
    ringClass: "ring-primary",
    fallbackClass: "bg-primary-soft text-primary",
  },
  {
    name: "Amara Okafor",
    role: "Analytics Lead",
    org: "CarePath Health",
    initials: "AO",
    match: 84,
    ringClass: "ring-amber",
    fallbackClass: "bg-amber-soft text-amber",
  },
];

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citation?: string;
  action?: { label: string; href: string };
};

type CoachReply = {
  content: string;
  citation?: string;
  action?: { label: string; href: string };
};

function getCoachReply(input: string): CoachReply {
  const text = input.toLowerCase();

  if (text.includes("skill")) {
    return {
      content: `For a ${CAREER_GOAL} role, the core stack is SQL, Excel, Python (pandas) and statistics. You already have Excel and a start on SQL — so focus next on SQL, then Python. I can map this into concrete steps for you.`,
      action: { label: "View Roadmap", href: "/roadmap" },
    };
  }

  if (text.includes("roadmap") || text.includes("plan") || text.includes("next step")) {
    return {
      content: `Your ${CAREER_GOAL} roadmap is built around three phases: Foundations (SQL + Excel), Analysis (Python + statistics), then Portfolio & applications. Each phase has weekly milestones — open it and pick the first task.`,
      action: { label: "View Roadmap", href: "/roadmap" },
    };
  }

  if (text.includes("mentor")) {
    return {
      content: `Smart move. A mentor who has walked the ${CAREER_GOAL} path can save you months. I've matched three people below — start a conversation with one of them.`,
    };
  }

  if (
    text.includes("how long") ||
    text.includes("time") ||
    text.includes("month") ||
    text.includes("week")
  ) {
    return {
      content: `With 10 hours a week, most people reach internship-ready in about 6 months: ~6 weeks on SQL, ~8 weeks on Python, then ~4 weeks building your portfolio. Slow and steady wins this race — I'll keep you on course.`,
    };
  }

  return {
    content: `Great question. The fastest route to ${CAREER_GOAL} is pairing SQL + Excel fundamentals with a real portfolio project. You're already on track with 10 hours a week — want to turn this into concrete steps?`,
    action: { label: "View Roadmap", href: "/roadmap" },
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: `Hi ${USER_NAME}! 👋 I'm your career coach. You're aiming for ${CAREER_GOAL}. Ask me about skills, resources, or your next step.`,
  },
  {
    id: "example-user",
    role: "user",
    content: "What should I learn first for a Data Analyst role?",
  },
  {
    id: "example-coach",
    role: "assistant",
    content:
      "Start with SQL — it's the language of data. Then Python for analysis. Here's a 4-week plan: weeks 1–2 basic queries (SELECT, JOINs, aggregates), week 3 practice datasets, week 4 your first analysis project.",
    citation: "Source: Career GPS knowledge base · SQL Fundamentals",
    action: { label: "View Roadmap", href: "/roadmap" },
  },
];

function CoachAvatar() {
  return (
    <Avatar className="mt-0.5 h-9 w-9 shrink-0 ring-2 ring-teal/40 ring-offset-2 ring-offset-background">
      <AvatarFallback className="bg-primary-soft text-primary">
        <Compass className="h-4 w-4" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  );
}

function MentorStrip() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setOpen(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setOpen(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="mentors" aria-label="Find a mentor" className="mt-4 scroll-mt-24">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">Find a Mentor</h2>
          <span className="text-xs text-muted-foreground">matched to {CAREER_GOAL}</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Hide mentors" : "Show mentors"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronDown
            className={cn("h-5 w-5 transition-transform", open ? "rotate-180" : "")}
            aria-hidden="true"
          />
        </button>
      </div>
      {open ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-card"
            >
              <Avatar
                className={cn(
                  "h-11 w-11 shrink-0 ring-2 ring-offset-2 ring-offset-background",
                  mentor.ringClass,
                )}
              >
                <AvatarFallback className={cn("text-sm font-semibold", mentor.fallbackClass)}>
                  {mentor.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{mentor.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {mentor.role} · {mentor.org}
                </p>
                <Badge variant="secondary" className="mt-1.5 bg-teal-soft text-teal">
                  {mentor.match}% match
                </Badge>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-10 shrink-0"
                onClick={() => toast("Mentor matching is coming soon 🧭")}
              >
                <span className="hidden sm:inline">Start Conversation</span>
                <span className="sm:hidden">Start</span>
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current !== null) window.clearTimeout(typingTimerRef.current);
    };
  }, []);

  function sendMessage(raw: string) {
    const content = raw.trim();
    if (!content || isTyping) return;
    const reply = getCoachReply(content);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content }]);
    setInput("");
    inputRef.current?.focus();
    setIsTyping(true);
    typingTimerRef.current = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply.content,
          citation: reply.citation,
          action: reply.action,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Career Coach"
        description="Start a conversation about your next move. Ask anything about your path."
        actions={
          <Link
            href="/coach#mentors"
            className={buttonVariants({ variant: "outline", className: "h-11" })}
          >
            <Users className="h-4 w-4" aria-hidden="true" />
            Mentors
          </Link>
        }
      />

      <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div
          className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6"
          role="log"
          aria-label="Conversation with your career coach"
          aria-live="polite"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {messages.map((message) =>
              message.role === "assistant" ? (
                <div key={message.id} className="flex items-end gap-2.5">
                  <CoachAvatar />
                  <div className="max-w-[85%] sm:max-w-[70%]">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="rounded-2xl rounded-tl-sm bg-surface-muted px-4 py-3 text-sm leading-relaxed text-foreground"
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </motion.div>
                    {message.citation ? (
                      <Badge
                        variant="outline"
                        className="mt-2 h-auto gap-1 py-0.5 font-normal text-muted-foreground"
                      >
                        <BookMarked className="h-3 w-3 shrink-0 text-teal" aria-hidden="true" />
                        {message.citation}
                      </Badge>
                    ) : null}
                    {message.action ? (
                      <Link
                        href={message.action.href}
                        className={cn(buttonVariants({ variant: "default", size: "sm" }), "mt-2.5 h-9")}
                      >
                        {message.action.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground sm:max-w-[70%]"
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </motion.div>
                </div>
              ),
            )}

            {isTyping ? (
              <div className="flex items-end gap-2.5" aria-label="Coach is typing">
                <CoachAvatar />
                <div className="rounded-2xl rounded-tl-sm bg-surface-muted px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1, 0.8] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: dot * 0.18,
                          ease: "easeInOut",
                        }}
                        className="h-2 w-2 rounded-full bg-muted-foreground/60"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="border-t border-border p-3 sm:p-4">
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-3 flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <Button
                  key={prompt}
                  type="button"
                  variant="outline"
                  className="h-10 rounded-full px-4"
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                maxLength={500}
                placeholder={`Ask about your path to ${CAREER_GOAL}…`}
                aria-label="Message your career coach"
                className="max-h-40 min-h-11 flex-1 resize-none bg-surface-subtle"
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-full"
                disabled={isTyping || !input.trim()}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <MentorStrip />
    </div>
  );
}