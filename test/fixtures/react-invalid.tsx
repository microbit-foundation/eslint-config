import { useState } from "react";

export function Demo({ flag }: { flag: boolean }) {
  if (flag) {
    const [value] = useState("don't");
    return <p>{value}'s</p>;
  }
  return null;
}
