import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, ChangeEvent } from "react";

const ChatInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    if (textareaRef.current) {
      // Reset field height
      textareaRef.current.style.height = "inherit";

      // Get the computed styles for the element
      const computed = window.getComputedStyle(textareaRef.current);

      // Calculate the height
      const height = `${
        textareaRef.current.scrollHeight +
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10)
      }px`;

      textareaRef.current.style.height = height;
    }
  };

  return (
    <div className="flex items-start rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm">
      <textarea
        ref={textareaRef}
        className="w-full outline-none focus:outline-none resize-none rounded-lg bg-transparent"
        placeholder="Your message here..."
        value={inputValue}
        onChange={handleInputChange}
        style={{ overflow: "hidden", resize: "none" }}
      />
      <button type="submit" className="self-end mt-2 ml-2">
        <PaperAirplaneIcon className="w-8 text-primary" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ChatInput;
