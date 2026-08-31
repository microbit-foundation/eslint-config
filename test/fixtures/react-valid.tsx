import { useState } from "react";

interface DemoProps {
  initial: string;
}

export function Demo({ initial }: DemoProps) {
  const [value] = useState(initial);
  return <p>{value}</p>;
}
