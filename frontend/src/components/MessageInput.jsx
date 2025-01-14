import { useState, useRef } from "react";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const fileInputRef = useRef(null);
  return <div>MessageInput</div>;
};
