import { useState } from "react";

{/*
Toggle between boolean hook */}

export const useToggle = () => {
  const [status, setStatus] = useState(false);
  const toggleStatus = () => setStatus((prevStatus) => !prevStatus);

  return { status, toggleStatus };
};
