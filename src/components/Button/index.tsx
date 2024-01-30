import { Icon, IconProps, Spinner } from "@/components";

import clsx from "clsx";

export function Button({
  label,
  onClick,
  type = "primary",
  className,
  disabled,
  size = "md",
  icon,
  iconPosition = "left",
  isLoading,
}: {
  label: string;
  onClick: () => void;
  type?: "primary" | "secondary" | "alert";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: IconProps["name"] | string;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}) {
  return (
    <button
      type="button"
      className={clsx(
        "flex w-fit items-center justify-center gap-2 whitespace-nowrap font-medium",
        {
          " border border-blue-400": type === "primary" && !disabled,
          "border border-red-400": type === "secondary" && !disabled,
          "ch-button-alert ch-button-content-alert":
            type === "alert" && !disabled,
          " bg-slate-400": disabled,
        },
        {
          "rounded-lg px-4 py-2 text-xs": size === "sm",
          "rounded-xl px-5 py-3 text-sm": size === "md",
          "rounded-xl px-5 py-[0.875rem] text-sm": size === "lg",
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <Spinner width="20" oneColor color="white" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Icon name={icon as IconProps["name"]} size={16} />
          )}
          {label}
          {icon && iconPosition === "right" && (
            <Icon name={icon as IconProps["name"]} size={16} />
          )}
        </>
      )}
    </button>
  );
}
