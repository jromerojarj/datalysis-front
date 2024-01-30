import React from "react";
import { icons } from "lucide-react";

export type IconProps = {
  name: string;
  color?: string;
  size?: number | string;
  className?: string;
  onClick?: () => void;
};

export const Icon: React.FC<IconProps> = ({
  name,
  color,
  size,
  className,
  onClick,
}) => {
  const PascalCaseName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const LucideIcon = icons[PascalCaseName as keyof typeof icons];

  if (!LucideIcon) {
    return null;
  }

  return (
    <LucideIcon
      className={className}
      color={color}
      size={size}
      onClick={onClick}
    />
  );
};
