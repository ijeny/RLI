import type { HTMLAttributes } from "react";

export function Alert({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border px-4 py-3 text-sm ${className}`}
      {...props}
    />
  );
}
