import { useState } from "react";

export const WithState = {
  render: () => {
    const [value] = useState("story");
    return <p>{value}</p>;
  },
};
