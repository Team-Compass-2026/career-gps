"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "motion/react";
import { toast } from "sonner";
import { Clock, Compass, Mail, MapPin, Send, type LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Channel = {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
};

const CHANNELS: Channel[] = [
  {
    icon: Mail,
    title: "Email us",
    value: "hello@careergps.app",
    href: "mailto:hello@careergps.app",
  },
  {
    icon: MapPin,
    title: "Where we are",
    value: "Remote-first · Building worldwide",
  },
  {
    icon: Clock,
    title: "Response time",
    value: "We reply within 1–2 business days.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <>
      <SiteHeader />
      <main className="container-career py-16 md:py-24">
        <MotionConfig reducedMotion="user">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-subtle">
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              Contact
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Let&apos;s talk about{" "}
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                your path.
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Questions, feedback, or partnership ideas — we&apos;re a real team and we read every
              message. Stop guessing. Start building.
            </p>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[1fr_360px] sm:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] as const }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="h-11 px-3.5"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="h-11 px-3.5"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="What's this about?"
                    className="h-11 px-3.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    rows={6}
                    maxLength={1000}
                    placeholder="Tell us where you are and where you want to go…"
                    className="min-h-36 resize-none px-3.5 py-3"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!name.trim() || !email.trim() || !message.trim()}
                  className="h-12 self-start rounded-2xl px-8 text-base font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:shadow-floating active:scale-95"
                >
                  Send message
                  <Send className="h-5 w-5" aria-hidden="true" />
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] as const }}
              className="flex flex-col gap-4"
            >
              <div className="rounded-2xl border border-border bg-surface-muted/60 p-6 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Compass className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-bold tracking-tight text-foreground">
                    Contact channels
                  </h2>
                </div>
                <div className="mt-5 flex flex-col gap-5">
                  {CHANNELS.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <div key={channel.title} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{channel.title}</p>
                          {channel.href ? (
                            <a
                              href={channel.href}
                              className="text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                              {channel.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{channel.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary-soft via-surface to-teal-soft p-6 shadow-card">
                <p className="text-sm font-semibold text-foreground">
                  Not sure who to talk to?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Browse our mentor network, or check the FAQ for quick answers first.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-xl"
                    onClick={() => toast("Mentor matching is coming soon 🧭")}
                  >
                    Find a mentor
                  </Button>
                  <Button
                    render={<Link href="/faq" />}
                    nativeButton={false}
                    variant="ghost"
                    className="h-11 w-full rounded-xl"
                  >
                    Check the FAQ first
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </MotionConfig>
      </main>
      <SiteFooter />
    </>
  );
}