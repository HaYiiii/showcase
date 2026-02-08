"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Info, Loader2 } from "lucide-react";

type FormValues = {
  fullName: string;
  email: string;
  role: "Admin" | "Member";
  startDate: string;
  notify: boolean;
  note: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = "Full name is required.";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Email format looks invalid.";
  if (!v.startDate) e.startDate = "Start date is required.";
  if (v.note.trim().length > 240) e.note = "Note must be ≤ 240 characters.";
  return e;
}

function hasErrors(e: Errors) {
  return Object.keys(e).length > 0;
}

export default function FormCasePage() {
  const [values, setValues] = React.useState<FormValues>({
    fullName: "Ha Nguyen",
    email: "ha@company.com",
    role: "Admin",
    startDate: "",
    notify: true,
    note: "",
  });

  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [submitState, setSubmitState] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [showLeaveConfirm, setShowLeaveConfirm] = React.useState(false);

  const errors = React.useMemo(() => validate(values), [values]);
  const dirty = React.useMemo(() => {
    // simple dirty check for demo: any non-default changes
    // (in real apps you'd compare against initial values)
    return (
      values.startDate !== "" ||
      values.note.trim() !== "" ||
      values.notify !== true ||
      values.role !== "Admin" ||
      values.fullName !== "Ha Nguyen" ||
      values.email !== "ha@company.com"
    );
  }, [values]);

  const canSubmit = !hasErrors(errors) && submitState !== "submitting";

  function setField<K extends keyof FormValues>(k: K, val: FormValues[K]) {
    setValues((p) => ({ ...p, [k]: val }));
  }

  function markTouched(k: keyof FormValues) {
    setTouched((p) => ({ ...p, [k]: true }));
  }

  async function onSubmit() {
    setTouched({
      fullName: true,
      email: true,
      role: true,
      startDate: true,
      notify: true,
      note: true,
    });

    if (hasErrors(errors)) {
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    await new Promise((r) => setTimeout(r, 800)); // demo delay
    setSubmitState("success");
    setTimeout(() => setSubmitState("idle"), 1600);
  }

  function onCancel() {
    if (dirty) setShowLeaveConfirm(true);
    else {
      // demo: reset
      setValues({
        fullName: "Ha Nguyen",
        email: "ha@company.com",
        role: "Admin",
        startDate: "",
        notify: true,
        note: "",
      });
      setTouched({});
      setSubmitState("idle");
    }
  }

  function resetAll() {
    setValues({
      fullName: "",
      email: "",
      role: "Member",
      startDate: "",
      notify: false,
      note: "",
    });
    setTouched({});
    setSubmitState("idle");
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full bg-muted text-foreground">Form UX</Badge>
            <Badge className="rounded-full bg-primary/10 text-primary">Validation</Badge>
            <Badge className="rounded-full bg-muted text-foreground">Safe actions</Badge>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
            Form Case — Complex Form UX
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
            Enterprise-style form: section layout, inline errors, summary,
            safe submit/cancel, and clear feedback states.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl" onClick={resetAll}>
            Reset
          </Button>
          <Button
            className="rounded-xl"
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            {submitState === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      {/* Feedback strip */}
      <Card className="rounded-2xl">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              {submitState === "success" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              ) : submitState === "error" ? (
                <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
              ) : (
                <Info className="mt-0.5 h-5 w-5 text-muted-foreground" />
              )}

              <div>
                <div className="text-[13px] font-bold">
                  {submitState === "success"
                    ? "Saved successfully"
                    : submitState === "error"
                    ? "Please fix the highlighted fields"
                    : "Tip: Use error summary for fast scanning"}
                </div>
                <div className="text-[12px] text-muted-foreground">
                  {submitState === "success"
                    ? "This is a demo feedback state. In real apps, show a toast + refresh list."
                    : submitState === "error"
                    ? "Good forms reduce friction: clear messages, predictable actions, and safe defaults."
                    : "Try submitting with missing fields to see summary + inline errors."}
                </div>
              </div>
            </div>

            <div className="text-[12px] text-muted-foreground">
              Dirty:{" "}
              <span className={cn("font-bold", dirty ? "text-foreground" : "")}>
                {dirty ? "Yes" : "No"}
              </span>{" "}
              • Valid:{" "}
              <span
                className={cn(
                  "font-bold",
                  hasErrors(errors) ? "text-destructive" : "text-foreground"
                )}
              >
                {hasErrors(errors) ? "No" : "Yes"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left: Form */}
        <Card className="rounded-2xl lg:col-span-8">
          <CardContent className="p-6">
            {/* Error summary */}
            {hasErrors(errors) && (touched.fullName || touched.email || touched.startDate || touched.note) ? (
              <div className="mb-5 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
                <div className="text-[13px] font-extrabold text-foreground">
                  Please review these fields
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-muted-foreground">
                  {Object.entries(errors).map(([k, msg]) => (
                    <li key={k}>
                      <span className="font-semibold text-foreground">{k}</span>:{" "}
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Section: Basic */}
            <Section title="Basic information" desc="Clear labels, helpful hints, and inline validation.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Full name"
                  required
                  hint="Use your preferred name shown on profile."
                  error={touched.fullName ? errors.fullName : undefined}
                >
                  <Input
                    value={values.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    onBlur={() => markTouched("fullName")}
                    className={cn("rounded-xl", touched.fullName && errors.fullName && "border-destructive")}
                    placeholder="e.g. Ha Nguyen"
                  />
                </Field>

                <Field
                  label="Email"
                  required
                  hint="We use this for notifications and account lookup."
                  error={touched.email ? errors.email : undefined}
                >
                  <Input
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => markTouched("email")}
                    className={cn("rounded-xl", touched.email && errors.email && "border-destructive")}
                    placeholder="name@company.com"
                  />
                </Field>
              </div>
            </Section>

            <Divider />

            {/* Section: Work */}
            <Section title="Work settings" desc="Reasonable defaults and safe actions.">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Role" hint="Affects what you can access.">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={values.role === "Admin" ? "default" : "outline"}
                      className="rounded-xl"
                      onClick={() => setField("role", "Admin")}
                    >
                      Admin
                    </Button>
                    <Button
                      type="button"
                      variant={values.role === "Member" ? "default" : "outline"}
                      className="rounded-xl"
                      onClick={() => setField("role", "Member")}
                    >
                      Member
                    </Button>
                  </div>
                </Field>

                <Field
                  label="Start date"
                  required
                  hint="Used for onboarding tasks."
                  error={touched.startDate ? errors.startDate : undefined}
                >
                  <Input
                    type="date"
                    value={values.startDate}
                    onChange={(e) => setField("startDate", e.target.value)}
                    onBlur={() => markTouched("startDate")}
                    className={cn("rounded-xl", touched.startDate && errors.startDate && "border-destructive")}
                  />
                </Field>

                <Field label="Notify">
                  <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                    <div>
                      <div className="text-[13px] font-bold">Send notifications</div>
                      <div className="text-[12px] text-muted-foreground">
                        Email updates for status changes.
                      </div>
                    </div>
                    <Switch
                      checked={values.notify}
                      onCheckedChange={(v) => setField("notify", v)}
                    />
                  </div>
                </Field>
              </div>
            </Section>

            <Divider />

            {/* Section: Notes */}
            <Section title="Notes" desc="Character count + helpful constraint.">
              <Field
                label="Note"
                hint="Max 240 characters."
                error={touched.note ? errors.note : undefined}
              >
                <Textarea
                  value={values.note}
                  onChange={(e) => setField("note", e.target.value)}
                  onBlur={() => markTouched("note")}
                  className={cn("min-h-[120px] rounded-xl", touched.note && errors.note && "border-destructive")}
                  placeholder="Add context for reviewers..."
                />
                <div className="mt-2 text-[12px] text-muted-foreground">
                  {values.note.trim().length}/240
                </div>
              </Field>
            </Section>

            <Divider />

            {/* Footer actions */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="text-[12px] text-muted-foreground">
                Safe UX: Cancel asks confirmation when form is dirty.
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-xl" onClick={onCancel}>
                  Cancel
                </Button>
                <Button className="rounded-xl" onClick={onSubmit} disabled={!canSubmit}>
                  {submitState === "submitting" ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: UX notes */}
        <Card className="rounded-2xl lg:col-span-4">
          <CardContent className="p-6">
            <div className="text-[12px] font-bold text-muted-foreground">WHAT THIS DEMO SHOWS</div>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight">Form UX decisions</h2>

            <ul className="mt-4 space-y-3 text-[13px] text-muted-foreground">
              <li>
                <span className="font-bold text-foreground">Error summary</span> for quick scanning + inline
                errors near the field.
              </li>
              <li>
                <span className="font-bold text-foreground">Safe defaults</span> (notify on, role explicit).
              </li>
              <li>
                <span className="font-bold text-foreground">Clear feedback</span> states: idle / submitting /
                success / error.
              </li>
              <li>
                <span className="font-bold text-foreground">Dirty check</span> with confirm dialog on cancel.
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
              <div className="text-[13px] font-bold text-foreground">Extra</div>
              <div className="mt-1 text-[12px] text-muted-foreground">
                Next step: integrate react-hook-form + zod for schema-based validation,
                and show field-level async validation (e.g., email already exists).
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave confirm */}
      <Dialog open={showLeaveConfirm} onOpenChange={setShowLeaveConfirm}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. If you leave now, your edits will be lost.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-xl" onClick={() => setShowLeaveConfirm(false)}>
              Stay
            </Button>
            <Button
              className="rounded-xl"
              onClick={() => {
                setShowLeaveConfirm(false);
                setValues({
                  fullName: "Ha Nguyen",
                  email: "ha@company.com",
                  role: "Admin",
                  startDate: "",
                  notify: true,
                  note: "",
                });
                setTouched({});
                setSubmitState("idle");
              }}
            >
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Divider() {
  return <div className="my-6 h-px w-full bg-border" />;
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <div className="text-[15px] font-extrabold">{title}</div>
        {desc ? <div className="mt-1 text-[12px] text-muted-foreground">{desc}</div> : null}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-bold">
          {label} {required ? <span className="text-destructive">*</span> : null}
        </div>
        {error ? <div className="text-[12px] font-semibold text-destructive">{error}</div> : null}
      </div>
      {hint ? <div className="text-[12px] text-muted-foreground">{hint}</div> : null}
      {children}
    </div>
  );
}
