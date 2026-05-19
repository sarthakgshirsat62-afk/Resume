"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react";
import { ArrowRight, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactForm } from "@/schemas/contact";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sarthakgshirsat62@gmail.com",
    href: "mailto:sarthakgshirsat62@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    href: null,
  },
];

const socialLinks = [
  {
    icon: GithubLogo,
    label: "GitHub",
    value: "@sarthakgshirsat62-afk",
    href: "https://github.com/sarthakgshirsat62-afk",
  },
  {
    icon: LinkedinLogo,
    label: "LinkedIn",
    value: "linkedin.com/in/sarth1964",
    href: "https://linkedin.com/in/sarth1964",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try emailing me directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-24 pb-20">
      <Container size="lg">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <Badge variant="outline" className="mb-4">
            Contact
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Let&apos;s build something{" "}
            <span className="gradient-text">together</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Whether you have a project in mind, a question, or just want to say hi — my inbox is
            always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...form.register("name")}
                        aria-invalid={!!form.formState.errors.name}
                      />
                      {form.formState.errors.name && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...form.register("email")}
                        aria-invalid={!!form.formState.errors.email}
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      {...form.register("subject")}
                      aria-invalid={!!form.formState.errors.subject}
                    />
                    {form.formState.errors.subject && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, question, or idea..."
                      rows={6}
                      {...form.register("message")}
                      aria-invalid={!!form.formState.errors.message}
                    />
                    {form.formState.errors.message && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="glow"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Direct Contact
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Social
              </h2>
              <div className="space-y-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card group-hover:border-primary/50 transition-colors">
                      <item.icon weight="fill" className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ⚡ I typically respond within <strong className="text-foreground">24 hours</strong>
                  . For urgent matters, reach out on LinkedIn.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
