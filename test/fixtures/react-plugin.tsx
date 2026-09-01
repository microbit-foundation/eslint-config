import { useRef } from "react";

export function List({ items }: { items: string[] }) {
  // Ref naming is deliberately off-convention: we disable those rules.
  const container = useRef<HTMLDivElement>(null);
  return (
    <ul ref={container}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
