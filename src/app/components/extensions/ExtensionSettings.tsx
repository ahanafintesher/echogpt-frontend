"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Moon,
  Palette,
  Shield,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

type Theme = "light" | "dark" | "system";

export default function ExtensionSettings() {
  const [theme, setTheme] = useState<Theme>("system");
  const [notifications, setNotifications] = useState(true);
  const [pageContext, setPageContext] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("echogpt-theme") as Theme | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  const changeTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);

    if (nextTheme === "system") {
      localStorage.removeItem("echogpt-theme");

      document.documentElement.classList.remove("dark");
      return;
    }

    localStorage.setItem("echogpt-theme", nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark",
    );
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15">
            <Palette className="size-4 text-violet-500" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">Settings</h2>
            <p className="text-[9px] text-muted-foreground">
              Customize your EchoGPT experience
            </p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <SettingsSection
        icon={<Palette className="size-3.5" />}
        title="Appearance"
      >
        <div className="rounded-xl border border-border/50 bg-muted/20 p-2">
          <p className="mb-2 px-1 text-[9px] font-medium text-muted-foreground">
            Theme
          </p>

          <div className="grid grid-cols-3 gap-1.5">
            <ThemeButton
              active={theme === "light"}
              icon={<Sun className="size-3.5" />}
              label="Light"
              onClick={() => changeTheme("light")}
            />

            <ThemeButton
              active={theme === "dark"}
              icon={<Moon className="size-3.5" />}
              label="Dark"
              onClick={() => changeTheme("dark")}
            />

            <ThemeButton
              active={theme === "system"}
              icon={<Sparkles className="size-3.5" />}
              label="System"
              onClick={() => changeTheme("system")}
            />
          </div>
        </div>
      </SettingsSection>

      {/* Preferences */}
      <SettingsSection
        icon={<Zap className="size-3.5" />}
        title="Preferences"
      >
        <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/20">
          <SettingToggle
            icon={<Bell className="size-3.5" />}
            title="Notifications"
            description="Get notified about AI responses"
            enabled={notifications}
            onChange={setNotifications}
          />

          <div className="border-t border-border/40" />

          <SettingToggle
            icon={<Sparkles className="size-3.5" />}
            title="Page context"
            description="Allow EchoGPT to read the current page"
            enabled={pageContext}
            onChange={setPageContext}
          />
        </div>
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        icon={<Shield className="size-3.5" />}
        title="Privacy"
      >
        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-xl border border-border/50 bg-muted/20 p-3 text-left transition-colors hover:bg-muted/40"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Shield className="size-3.5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium">Privacy controls</p>
            <p className="mt-0.5 text-[8px] text-muted-foreground">
              Manage how your conversations and page data are handled.
            </p>
          </div>

          <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </button>
      </SettingsSection>

      {/* Account */}
      <div className="mt-6 rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 p-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold">Ahanaf</p>
            <p className="text-[8px] text-muted-foreground">Free plan</p>
          </div>

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-[8px] font-medium text-violet-500">
            Free
          </span>
        </div>
      </div>

      <p className="mt-5 text-center text-[8px] text-muted-foreground">
        EchoGPT Extension · v1.0.0
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Settings Section                    */
/* ---------------------------------- */

type SettingsSectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function SettingsSection({ icon, title, children }: SettingsSectionProps) {
  return (
    <section className="mb-5">
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <span className="text-violet-500">{icon}</span>

        <h3 className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

/* ---------------------------------- */
/* Theme Button                        */
/* ---------------------------------- */

type ThemeButtonProps = {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function ThemeButton({ active, icon, label, onClick }: ThemeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative flex flex-col items-center gap-1.5 rounded-lg px-2 py-2.5 text-[8px] font-medium transition-all ${
        active
          ? "bg-violet-500/10 text-violet-500 ring-1 ring-violet-500/20"
          : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
      }`}
    >
      {icon}

      <span>{label}</span>

      {active && (
        <span className="absolute right-1 top-1 flex size-3.5 items-center justify-center rounded-full bg-violet-500 text-white">
          <Check className="size-2" />
        </span>
      )}
    </button>
  );
}

/* ---------------------------------- */
/* Toggle (fixed)                      */
/* ---------------------------------- */

type SettingToggleProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
};

function SettingToggle({
  icon,
  title,
  description,
  enabled,
  onChange,
}: SettingToggleProps) {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium">{title}</p>

        <p className="mt-0.5 text-[8px] leading-3.5 text-muted-foreground">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
          enabled ? "bg-violet-500" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`pointer-events-none absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}   