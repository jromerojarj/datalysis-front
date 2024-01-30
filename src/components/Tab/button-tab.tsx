import clsx from "clsx";

export function ButtonTab({
  label,
  onClick,
  active,
  size = "md",
  full = false,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  size?: "sm" | "md";
  full?: boolean;
}) {
  return (
    <div
      className={clsx(
        "select-none rounded-lg text-center text-xs",
        full ? "w-full" : "w-fit",
        {
          "px-3 py-2.5": size === "md",
          "px-3 py-2": size === "sm",
          "ch-button-tab-select ch-button-tab-text-select font-medium bg-slate-600 text-white":
            active,
          "ch-button-tab-text-disabled cursor-pointer bg-transparent": !active,
        }
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
