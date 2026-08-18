import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  const norm = name.toLowerCase().replace(/[\s\.\-_]/g, "");

  // TypeScript
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 13.5H9v6H7v-6H4.5V12h7v1.5zm8 4c0 1.5-1 2.5-2.5 2.5s-2.5-.8-2.8-2l1.6-.7c.2.6.6.9 1.2.9.6 0 1-.3 1-.8 0-.6-.5-.8-1.5-1.1-1.3-.4-2.1-1-2.1-2.1 0-1.4 1.1-2.2 2.5-2.2 1.3 0 2.2.6 2.6 1.7l-1.5.8c-.2-.5-.5-.7-1.1-.7-.5 0-.8.3-.8.6 0 .4.4.6 1.2.9 1.5.5 2.2 1.1 2.2 2.1z" fill="#FFF" />
      </svg>
    );
  }

  // JavaScript
  if (norm.includes("javascript") || norm === "js") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M12.5 18.5c0 .9-.6 1.5-1.5 1.5-.7 0-1.2-.4-1.5-.9l1.2-.7c.1.3.3.4.5.4.3 0 .4-.1.4-.4v-4.9h1.4v6zm7.5-1.2c0 1.5-1 2.7-2.7 2.7-1.5 0-2.5-.9-2.8-2.2l1.5-.8c.2.7.7 1.1 1.3 1.1.7 0 1.1-.4 1.1-.9 0-.7-.5-.9-1.6-1.3-1.4-.5-2.2-1.2-2.2-2.3 0-1.4 1.1-2.4 2.5-2.4 1.4 0 2.3.8 2.6 1.9l-1.4.8c-.2-.5-.6-.8-1.2-.8-.6 0-.9.3-.9.7 0 .5.4.7 1.3 1 1.6.6 2.5 1.2 2.5 2.5z" fill="#000" />
      </svg>
    );
  }

  // Go / Golang
  if (norm === "go" || norm.includes("golang")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00ADD8" />
        <path d="M7.5 12c0-1.9 1.3-3.2 3.2-3.2 1.4 0 2.4.7 2.8 1.8l-1.6.8c-.3-.6-.7-.9-1.2-.9-1 0-1.6.8-1.6 1.5s.6 1.5 1.6 1.5c.7 0 1.1-.3 1.3-.7v-.8h-1.5V11h3.1v3.2c-.7.8-1.7 1.3-2.9 1.3-1.9 0-3.2-1.4-3.2-3.5zm9 3.5c-1.9 0-3.2-1.4-3.2-3.5s1.3-3.5 3.2-3.5 3.2 1.4 3.2 3.5-1.3 3.5-3.2 3.5zm0-1.8c.9 0 1.5-.8 1.5-1.7s-.6-1.7-1.5-1.7-1.5.8-1.5 1.7.6 1.7 1.5 1.7z" fill="#FFF" />
      </svg>
    );
  }

  // Rust
  if (norm.includes("rust")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#DEA584" />
        <circle cx="12" cy="12" r="7.5" fill="#000" stroke="#DEA584" strokeWidth="1" />
        <path d="M9 8.5h3.5c1.2 0 2 .8 2 1.8 0 .8-.5 1.4-1.2 1.7l1.7 3.5h-1.8l-1.5-3.2h-1v3.2H9V8.5zm1.7 2.4h1.6c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-1.6v1.4z" fill="#FFF" />
      </svg>
    );
  }

  // Java
  if (norm.includes("java") && !norm.includes("javascript")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#EA2D2E" />
        <path d="M10 17.5c2.5.2 5-.5 5-2s-2.5-1.5-3.5-1.5c-2 0-3.5 1-3.5 2 0 1 1 1.3 2 1.5zm6-5c-1 0-2 .5-2 1.5s1.5 1.5 2.5 2c1.5.8 2 1.5 2 2.5 0 2.5-3 3.5-6.5 3.5-4 0-7-1.5-7-4 0-1.5 1-2.5 3-3.2l.6 1.2c-1.5.5-2.2 1.2-2.2 2 0 1.5 2.2 2.5 5.6 2.5 3 0 5-.8 5-2.2 0-.8-.5-1.2-1.5-1.8-1.2-.6-2.5-1.2-2.5-2.5 0-1.8 1.5-2.7 3-2.7 1.2 0 2.2.5 2.8 1.2l-1.2 1c-.4-.5-1-.6-1.6-.6z" fill="#FFF" />
      </svg>
    );
  }

  // Spring / Spring Boot
  if (norm.includes("spring")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#6DB33F" />
        <path d="M12 4.5l6.5 3.8v7.4L12 19.5l-6.5-3.8V8.3L12 4.5zm0 2.4L7.5 9.5v5l4.5 2.6 4.5-2.6v-5L12 6.9z" fill="#FFF" />
        <circle cx="12" cy="12" r="2.2" fill="#FFF" />
      </svg>
    );
  }

  // Angular
  if (norm.includes("angular")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#DD0031" />
        <path d="M12 4l7 2.5-1 9L12 20l-6-4.5-1-9L12 4zm0 2.5L8.5 15h1.8l.7-1.8h2l.7 1.8h1.8L12 6.5zm0 3.2l.7 1.9h-1.4l.7-1.9z" fill="#FFF" />
      </svg>
    );
  }

  // React
  if (norm.includes("react") && !norm.includes("reactive")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#20232A" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="7.5" ry="3" stroke="#61DAFB" strokeWidth="1" />
        <ellipse cx="12" cy="12" rx="7.5" ry="3" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="7.5" ry="3" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#000000" />
        <circle cx="12" cy="12" r="9" stroke="#FFF" strokeWidth="1.2" />
        <path d="M9.5 8v8M14.5 8l-5 8" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14.5 12v4" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes("postgres") || norm.includes("psql") || norm.includes("cloudnativepg")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#336791" />
        <path d="M12 5.5c-3 0-5.5 2-5.5 4.8 0 1.8 1 3.4 2.5 4.2v4l3-2 3 2v-4c1.5-.8 2.5-2.4 2.5-4.2 0-2.8-2.5-4.8-5.5-4.8zm0 2c2 0 3.5 1.2 3.5 2.8s-1.5 2.8-3.5 2.8-3.5-1.2-3.5-2.8 1.5-2.8 3.5-2.8z" fill="#FFF" />
      </svg>
    );
  }

  // Oracle
  if (norm.includes("oracle")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F80000" />
        <rect x="5" y="7" width="14" height="10" rx="5" stroke="#FFF" strokeWidth="2.5" />
      </svg>
    );
  }

  // Redis
  if (norm.includes("redis")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#DC382D" />
        <path d="M12 5l6 3.5v7L12 19l-6-3.5v-7L12 5zm0 3l-3.5 2 3.5 2 3.5-2L12 8z" fill="#FFF" />
      </svg>
    );
  }

  // Kafka
  if (norm.includes("kafka")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#231F20" />
        <circle cx="8" cy="12" r="2.5" fill="#FFF" />
        <circle cx="16" cy="7" r="2" fill="#FFF" />
        <circle cx="16" cy="17" r="2" fill="#FFF" />
        <path d="M8 12l8-5M8 12l8 5" stroke="#FFF" strokeWidth="1.5" />
      </svg>
    );
  }

  // NATS
  if (norm.includes("nats")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#27AAE1" />
        <path d="M6 16V8l5 8V8l7 8V8" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Docker
  if (norm.includes("docker")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#2496ED" />
        <path d="M6 10h2v2H6zm3 0h2v2H9zm3 0h2v2h-2zm-3-3h2v2H9zm3 0h2v2h-2zm3 3h2v2h-2zM4 14c.5 3 3 5 7 5 5 0 8-3 8-6 0-.5 0-1-.2-1.5-1-.2-2 .2-2.8.8-1-.5-2.5-.8-4-.8H4v2.5z" fill="#FFF" />
      </svg>
    );
  }

  // Kubernetes / K8s / K3s
  if (norm.includes("k8s") || norm.includes("kubernetes") || norm.includes("k3s")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#326CE5" />
        <circle cx="12" cy="12" r="7.5" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.2" fill="#FFF" />
        <path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" stroke="#FFF" strokeWidth="1.5" />
      </svg>
    );
  }

  // Tauri
  if (norm.includes("tauri")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#24C8D8" />
        <circle cx="9" cy="12" r="4" stroke="#FFF" strokeWidth="2" />
        <circle cx="15" cy="12" r="4" stroke="#FFC131" strokeWidth="2" />
      </svg>
    );
  }

  // Git / GitHub / GitLab
  if (norm.includes("git")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F05032" />
        <path d="M18.5 10.5l-7-7a1.5 1.5 0 00-2 0l-4 4a1.5 1.5 0 000 2l7 7a1.5 1.5 0 002 0l4-4a1.5 1.5 0 000-2zm-6.5 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#FFF" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#06B6D4" />
        <path d="M7 11.5c1-2 2.5-2.5 4.5-1.5 1.2.6 2 1.6 3 2.5 1.5 1.5 3 2 4.5 1 1-1 2-2 2-2s-1.5.5-2.5 0c-1.2-.6-2-1.6-3-2.5-1.5-1.5-3-2-4.5-1-1.5 1-4 3.5-4 3.5zm-3 5c1-2 2.5-2.5 4.5-1.5 1.2.6 2 1.6 3 2.5 1.5 1.5 3 2 4.5 1 1-1 2-2 2-2s-1.5.5-2.5 0c-1.2-.6-2-1.6-3-2.5-1.5-1.5-3-2-4.5-1-1.5 1-4 3.5-4 3.5z" fill="#FFF" />
      </svg>
    );
  }

  // Default clean code icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="20" x="2" y="2" rx="4" stroke="#10B981" />
      <path d="m9 10-2 2 2 2m6-4 2 2-2 2" stroke="#10B981" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TechBadge({ name, size = "sm" }: { name: string; size?: "xs" | "sm" | "md" }) {
  const sizeClasses = {
    xs: "text-[10px] px-2 py-0.5 gap-1.5",
    sm: "text-xs px-2.5 py-1 gap-1.5",
    md: "text-sm px-3 py-1.5 gap-2",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-200 border border-zinc-800/90 hover:border-zinc-700 font-mono transition-colors shadow-sm ${sizeClasses[size]}`}
    >
      <TechIcon name={name} className={`${iconSizes[size]} flex-shrink-0 rounded-[2px]`} />
      <span className="truncate">{name}</span>
    </span>
  );
}
