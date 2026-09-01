import { useRef, useState } from "react";

function buildItems() {
  return ["a", "b"];
}

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

export function Toggle() {
  // The setter deliberately breaks the set<State> convention, which we allow,
  // while the eager initialiser below is still worth reporting.
  const [open, setIsOpen] = useState(false);
  const [items] = useState(buildItems());
  return (
    <button type="button" onClick={() => setIsOpen(!open)}>
      {open ? items.join(",") : "closed"}
    </button>
  );
}
