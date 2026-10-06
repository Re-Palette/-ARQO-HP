"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { EASE } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/ArrowLink";
import { contactCategories, site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const field =
  "w-full rounded-[4px] border border-ink/15 bg-white/70 px-4 py-3.5 font-sans text-[0.9375rem] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink/30 focus:border-ink/50 focus:shadow-[0_0_0_4px_rgba(95,147,204,0.15)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      company: form.get("company"),
      email: form.get("email"),
      category: form.get("category"),
      message: form.get("message"),
      consent: form.get("consent") === "on",
      website: form.get("website"),
    };
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return setStatus("sent");
      const json = (await res.json().catch(() => ({}))) as { errors?: Record<string, string>; error?: string };
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        return setStatus("idle");
      }
      setStatus(json.error === "not_configured" ? "unavailable" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="glass rounded-[10px] p-10 text-center md:p-16"
        role="status"
      >
        <p className="font-display text-4xl italic text-ink">Thank you.</p>
        <p className="heading-ja mt-6 text-base text-ink">お問い合わせを受け付けました。</p>
        <p className="mt-4 font-mincho text-sm leading-[2] text-ink-2">
          内容を確認のうえ、担当者よりご連絡いたします。
          <br />
          今しばらくお待ちください。
        </p>
        <Link href="/" className="mt-10 inline-flex items-center gap-3 text-[0.8125rem] tracking-[0.12em] text-ink">
          <span className="link-underline pb-1">トップへ戻る</span>
          <Arrow className="w-6" />
        </Link>
      </motion.div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-xs text-[#b4475b]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-[10px] p-6 sm:p-10 md:p-14">
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="お名前" required htmlFor="name">
          <input id="name" name="name" autoComplete="name" required className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {err("name")}
        </Field>
        <Field label="会社名・団体名・学校名" htmlFor="company">
          <input id="company" name="company" autoComplete="organization" className={field} />
        </Field>
        <Field label="メールアドレス" required htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="email" required className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {err("email")}
        </Field>
        <Field label="お問い合わせ種別" required htmlFor="category">
          <select id="category" name="category" required defaultValue="" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%2326272c%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`} aria-invalid={!!errors.category} aria-describedby={errors.category ? "category-error" : undefined}>
            <option value="" disabled>
              選択してください
            </option>
            {contactCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err("category")}
        </Field>
        <Field label="お問い合わせ内容" required htmlFor="message" className="md:col-span-2">
          <textarea id="message" name="message" rows={7} required className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          {err("message")}
        </Field>
      </div>

      {/* Honeypot — hidden from people, tempting for bots */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-9">
        <label className="flex items-start gap-3 font-mincho text-sm leading-[1.9] text-ink-2">
          <input type="checkbox" name="consent" className="mt-1.5 size-4 accent-[#26272c]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>
            <Link href="/privacy" className="underline underline-offset-4 hover:text-ink" target="_blank">
              プライバシーポリシー
            </Link>
            に同意のうえ送信します。
          </span>
        </label>
        {err("consent")}
      </div>

      <AnimatePresence>
        {status === "unavailable" || status === "error" ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-8 rounded-[4px] border border-[#b4475b]/30 bg-[#b4475b]/5 px-5 py-4 font-mincho text-sm leading-[1.9] text-ink"
          >
            {status === "unavailable" ? "現在フォームからの送信を受け付けられません。" : "送信に失敗しました。時間をおいて再度お試しください。"}
            お急ぎの場合は{" "}
            <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-4">
              {site.contactEmail}
            </a>{" "}
            までメールでご連絡ください。
          </motion.p>
        ) : null}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-10 inline-flex items-center gap-6 rounded-full bg-ink py-3 pl-8 pr-3 text-sm tracking-[0.14em] text-white transition-[background-color,opacity] duration-500 hover:bg-[#3a3c45] disabled:opacity-60"
      >
        {status === "sending" ? "送信中…" : "送信する"}
        <span className="grid size-11 place-items-center rounded-full bg-white text-ink">
          <Arrow className="w-5 transition-transform duration-700 group-hover:translate-x-0.5" />
        </span>
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-3 flex items-center gap-3 font-mincho text-[0.8125rem] tracking-[0.12em] text-ink">
        {label}
        {required ? <span className="rounded-full bg-ink px-2 py-0.5 font-sans text-[0.5625rem] tracking-[0.14em] text-white">必須</span> : null}
      </label>
      {children}
    </div>
  );
}
