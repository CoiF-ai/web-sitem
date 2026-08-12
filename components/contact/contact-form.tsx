"use client";

import { useFormState, useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { submitContactForm, type ContactState } from "@/app/actions/contact";
import { useCursor } from "@/context/cursor-context";
import { useLocale } from "@/context/locale-context";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

function fieldClasses(hasError: boolean) {
  return cn(
    "w-full border-b bg-transparent pb-3 font-body text-base text-mist placeholder:text-mist-dim/50 focus:outline-none",
    hasError ? "border-red-400/60" : "border-white/15 focus:border-mist/60"
  );
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  const { bind } = useCursor();

  return (
    <button
      {...bind("hover")}
      type="submit"
      disabled={pending}
      className="mt-4 w-fit font-body text-[11px] uppercase tracking-widest text-mist underline-offset-4 transition-opacity disabled:opacity-50"
    >
      {pending ? pendingLabel : `${label} →`}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { dict } = useLocale();
  const { bind } = useCursor();

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
          {dict.contact.name}
        </label>
        <input
          {...bind("text")}
          id="name"
          name="name"
          type="text"
          placeholder={dict.contact.namePlaceholder}
          className={fieldClasses(Boolean(state.fieldErrors?.name))}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
          {dict.contact.email}
        </label>
        <input
          {...bind("text")}
          id="email"
          name="email"
          type="email"
          placeholder={dict.contact.emailPlaceholder}
          className={fieldClasses(Boolean(state.fieldErrors?.email))}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-body text-[11px] uppercase tracking-widest text-mist-dim">
          {dict.contact.message}
        </label>
        <textarea
          {...bind("text")}
          id="message"
          name="message"
          rows={4}
          placeholder={dict.contact.messagePlaceholder}
          className={cn(fieldClasses(Boolean(state.fieldErrors?.message)), "resize-none")}
        />
      </div>

      <SubmitButton label={dict.contact.send} pendingLabel={dict.contact.sending} />

      {state.status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-sm text-mist-dim"
          role="status"
        >
          {dict.contact.success}
        </motion.p>
      )}
      {state.status === "error" && !state.fieldErrors && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-sm text-red-400/80"
          role="alert"
        >
          {dict.contact.error}
        </motion.p>
      )}
    </form>
  );
}
