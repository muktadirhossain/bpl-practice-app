"use client";
import { useEffect, useState } from "react";

const TypingAnimation = ({ ...rest }) => {
  const items = [
    "medicine products",
    "healthcare products",
    "beauty products",
    "lab test",
  ];
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isBackspacing, setIsBackspacing] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const currentItem = items[currentItemIndex];

    if (!isBackspacing && currentLetterIndex < currentItem.length) {
      setTimeout(() => {
        setCurrentLetterIndex((prevIndex) => prevIndex + 1);
      }, 200);
    } else if (!isBackspacing && currentLetterIndex === currentItem.length) {
      setTimeout(() => {
        setIsBackspacing(true);
      }, 2000); // Wait 2 seconds before starting to backspace
    } else if (isBackspacing && currentLetterIndex > 0) {
      setTimeout(() => {
        setCurrentLetterIndex((prevIndex) => prevIndex - 1);
      }, 100);
    } else if (isBackspacing && currentLetterIndex === 0) {
      setIsBackspacing(false);
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    }

    setPlaceholder(items[currentItemIndex].substring(0, currentLetterIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLetterIndex, isBackspacing, currentItemIndex]);

  return (
    <input
      className="outline-none px-5 py-1 text-base text-gray-900 dark:text-gray-100 bg-primary_bg dark:bg-gray-800/65 h-11 w-full border border-primary_bg dark:border-gray-700 font-normal placeholder-gray-600 dark:placeholder-gray-400 placeholder-font-light focus:border-primary dark:focus:border-gray-500 focus:border-l focus:border-b rounded-md"
      type="text"
      {...rest}
      placeholder={`Search for ${placeholder}`}
    />
  );
};

export default TypingAnimation;
