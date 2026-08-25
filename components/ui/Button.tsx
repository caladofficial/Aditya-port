"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { Magnetic } from "@/components/system/Magnetic";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "text";
  href?: string;
  external?: boolean;
  magnetic?: boolean;
  cursorLabel?: "VIEW" | "EXPLORE";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

/** Shared portfolio action. It can render as a button or semantic link. */
export function Button({
  children,
  variant = "primary",
  href,
  external = false,
  magnetic = variant === "primary",
  cursorLabel,
  className = "",
  onClick,
}: Readonly<ButtonProps>) {
  const classes = `${variant === "primary" ? "button-primary" : "button-text"} ${className}`.trim();
  const decoration = variant === "primary" ? <ArrowUpRight /> : <i aria-hidden="true" />;

  const action = href ? (
    <a
      className={classes}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
    >
      <span>{children}</span>
      {decoration}
    </a>
  ) : (
    <button
      className={classes}
      type="button"
      onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
    >
      <span>{children}</span>
      {decoration}
    </button>
  );

  return magnetic ? (
    <Magnetic cursorLabel={cursorLabel}>{action}</Magnetic>
  ) : action;
}
