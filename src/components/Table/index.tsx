import clsx from "clsx";

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <table className={clsx("table-auto overflow-y-auto", className)}>
      {children}
    </table>
  );
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <thead>
      <tr
        className={clsx(
          "ch-text-secondary ch-table-background-secondary ch-table-stroke h-5 border-y",
          className
        )}
      >
        {children}
      </tr>
    </thead>
  );
}

export function TableBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tbody className={clsx(className)}>{children}</tbody>;
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={clsx("hover:ch-table-background-secondary", className)}>
      {children}
    </tr>
  );
}

export function TableItemHead({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <th
      className={clsx("select-none p-3 text-sm font-medium", {
        "cursor-pointer": onClick,
        className,
      })}
      onClick={onClick}
    >
      {children}
    </th>
  );
}

export function TableItem({
  children,
  onClick,
  className,
  position = "center",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  position?: "left" | "right" | "center";
}) {
  return (
    <td
      className={clsx("ch-table-stroke border-b px-3 py-4", className)}
      onClick={onClick}
    >
      <div
        className={clsx("flex h-8 items-center whitespace-nowrap p-1 text-sm", {
          "justify-center text-center": position === "center",
          "justify-start text-start": position === "left",
          "justify-end text-end": position === "right",
        })}
      >
        {children}
      </div>
    </td>
  );
}
