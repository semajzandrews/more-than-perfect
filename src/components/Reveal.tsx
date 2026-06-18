/* A reveal wrapper whose visibility NEVER depends on JS. It only adds the
   `reveal` class and a stagger delay; the rise-in is a pure CSS animation
   (globals.css) that runs when <html> is armed and always ends visible, so
   content cannot be stranded invisible even if hydration never runs
   (DESIGN_LESSONS 06-08). No hooks, so it is safe in server or client trees. */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "span" | "li";
  className?: string;
}) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={`reveal ${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
