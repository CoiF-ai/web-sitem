"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MinimalContactProps {
  placeholder?: string;
  onSubmitEmail?: (email: string) => void | Promise<void>;
}

export default function MinimalContact({
  placeholder = "you@example.com",
  onSubmitEmail,
}: MinimalContactProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      await onSubmitEmail?.(email);
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="group relative flex items-center border-b border-neutral-700 transition-colors duration-300 focus-within:border-white">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="w-full flex-1 bg-transparent py-3 pr-10 font-body text-base text-white placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Submit"
          disabled={status === "loading"}
          className="absolute right-0 text-neutral-500 transition-colors duration-300 hover:text-white disabled:opacity-40"
        >
          <ArrowRight
            size={18}
            className={cn(
              "transition-transform duration-300",
              status === "loading" && "animate-pulse"
            )}
          />
        </button>
      </div>
      {status === "sent" && (
        <p className="mt-3 font-body text-xs text-neutral-500">Thank you — I&apos;ll be in touch.</p>
      )}
    </form>
  );
}
