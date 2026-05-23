"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FieldProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
}

function Field({ label, error, id, className, ...props }: FieldProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="font-body text-sm font-medium text-ink">
        {label}
        {props.required ? <span className="text-accent"> *</span> : null}
      </label>
      <input
        id={fieldId}
        className={cn(
          "min-h-11 rounded border border-primary/20 bg-surface px-3 font-body text-base",
          "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30",
          error && "border-error",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  label: string;
  error?: string;
}

function TextAreaField({ label, error, id, className, ...props }: TextAreaProps) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="font-body text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={4}
        className={cn(
          "rounded border border-primary/20 bg-surface px-3 py-2 font-body text-base",
          "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30",
          error && "border-error",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface RegistrationFormProps {
  onSuccess?: () => void;
  submitLabel?: string;
}

export function RegistrationForm({
  onSuccess,
  submitLabel = "QUERO SER AVISADO →",
}: RegistrationFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, string> = {};

    if (!data.get("nome")) newErrors.nome = "Informe seu nome";
    if (!data.get("email")) newErrors.email = "Informe seu e-mail";
    if (!data.get("telefone")) newErrors.telefone = "Informe seu telefone";
    if (!data.get("lgpd")) newErrors.lgpd = "Aceite os termos para continuar";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstError?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 400));
    setStatus("success");
    onSuccess?.();
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-success/10 p-6 text-center" role="status">
        <p className="font-display text-xl text-success">Cadastro recebido!</p>
        <p className="mt-2 font-body text-sm text-ink/80">
          Você será avisado quando a programação oficial abrir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Field label="Nome completo" name="nome" required error={errors.nome} />
      <Field label="E-mail" name="email" type="email" required error={errors.email} />
      <Field label="Telefone" name="telefone" type="tel" required error={errors.telefone} />
      <Field label="Cidade (opcional)" name="cidade" />
      <label className="flex items-start gap-3 font-body text-sm text-ink/80">
        <input
          type="checkbox"
          name="lgpd"
          className="mt-1 size-4 accent-accent"
          aria-invalid={!!errors.lgpd}
        />
        <span>
          Autorizo o uso dos meus dados para receber informações sobre o Dia D do Turismo,
          conforme a LGPD.
        </span>
      </label>
      {errors.lgpd ? (
        <p className="text-sm text-error" role="alert">
          {errors.lgpd}
        </p>
      ) : null}
      <Button type="submit" loading={status === "submitting"} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}

interface ContactFormProps {
  variant?: "b2c" | "b2b";
}

export function ContactForm({ variant = "b2c" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, string> = {};
    if (!data.get("nome")) newErrors.nome = "Informe seu nome";
    if (!data.get("email")) newErrors.email = "Informe seu e-mail";
    if (variant === "b2c" && !data.get("mensagem")) newErrors.mensagem = "Informe sua mensagem";
    if (variant === "b2b" && !data.get("razao")) newErrors.razao = "Informe a razão social";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 400));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-brand-green/10 p-4" role="status">
        <p className="font-body font-medium text-primary">Mensagem enviada!</p>
        <p className="mt-1 text-sm text-ink/70">Entraremos em contato em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Field label="Nome" name="nome" required error={errors.nome} />
      <Field label="E-mail" name="email" type="email" required error={errors.email} />
      {variant === "b2b" ? (
        <>
          <Field label="Razão social" name="razao" required error={errors.razao} />
          <Field label="Tipo de negócio" name="tipo" />
          <Field label="Polo desejado" name="polo" placeholder="Cervejeiro, aventura, hospedagem..." />
        </>
      ) : (
        <TextAreaField label="Mensagem" name="mensagem" required error={errors.mensagem} />
      )}
      <Button type="submit" loading={status === "submitting"} variant="secondary">
        ENVIAR
      </Button>
    </form>
  );
}
