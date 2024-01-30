import { ButtonTab } from "./button-tab";
import clsx from "clsx";

export type TabItemType = {
  label: string;
  [key: string]: any;
};

export function Tab({
  items,
  active,
  size = "md",
  onClick,
  full = false,
}: {
  items: TabItemType[];
  active: number;
  size?: "sm" | "md";
  onClick: (item: TabItemType) => void;
  full?: boolean;
}) {
  return (
    <div
      className={clsx(
        "ch-button-tab-background grid w-fit rounded-xl p-1 bg-slate-300",
        {
          "w-full ": full,
        }
      )}
      style={{
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      }}
    >
      {items.map((item) => (
        <ButtonTab
          key={item.id}
          label={item.label}
          onClick={() => onClick(item)}
          active={active === item.id}
          size={size}
          full
        />
      ))}
    </div>
  );
}
