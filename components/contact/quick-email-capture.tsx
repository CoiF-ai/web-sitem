"use client";

import MinimalContact from "@/components/MinimalContact";
import { submitContactForm } from "@/app/actions/contact";

export default function QuickEmailCapture({ placeholder }: { placeholder?: string }) {
  async function handleSubmitEmail(email: string) {
    const formData = new FormData();
    formData.set("name", "Quick contact");
    formData.set("email", email);
    formData.set("message", "Requested contact via the quick email field.");
    const result = await submitContactForm({ status: "idle" }, formData);
    if (result.status !== "success") {
      throw new Error("Submission failed");
    }
  }

  return <MinimalContact placeholder={placeholder} onSubmitEmail={handleSubmitEmail} />;
}
