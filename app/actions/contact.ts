"use server";

export interface ContactState {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "required";
  if (!email || !EMAIL_PATTERN.test(email)) fieldErrors.email = "invalid";
  if (!message || message.length < 10) fieldErrors.message = "tooShort";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  try {
    // No external database is configured for this portfolio. Submissions are
    // captured in the server logs; wire this up to an email/DB provider as needed.
    console.info("[contact-form] new submission", {
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    return { status: "success" };
  } catch (error) {
    console.error("[contact-form] failed to process submission", error);
    return { status: "error" };
  }
}
