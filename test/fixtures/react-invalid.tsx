import { useState } from "react";

export function Demo({ flag }: { flag: boolean }) {
  if (flag) {
    const [value] = useState("conditional");
    return <p>{value}</p>;
  }
  return null;
}
