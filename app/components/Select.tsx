"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type SelectProps = {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
};

const Select = ({ options, selected, setSelected }: SelectProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus();
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "Enter" || event.key === "Space") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    event.preventDefault();

    switch (event.code) {
      case "ArrowUp":
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : options.length - 1
        );
        break;

      case "ArrowDown":
        setFocusedIndex((prevIndex) =>
          prevIndex < options.length - 1 ? prevIndex + 1 : 0
        );
        break;

      case "Enter":
      case "Space": {
        const selectedOption = options[focusedIndex];
        setSelected(selectedOption);
        setIsOpen(false);
        break;
      }

      case "Escape":
        setIsOpen(false);
        break;

      case "Tab":
        event.preventDefault();
        break;
    }
  };

  return (
    <div className="w-full md:w-1/3 relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="listbox"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
        className="w-full flex justify-between items-center px-4 py-2 text-left border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
      >
        {selected}
        <ChevronDownIcon
          className={`size-4 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          id="listbox"
          tabIndex={0}
          aria-activedescendant={`option-${focusedIndex}`}
          onKeyDown={handleListKeyDown}
          className="absolute w-full bg-white mt-2 border rounded-lg shadow-md border-gray-300 overflow-hidden focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {options.map((option, index) => (
            <li
              key={option}
              role="option"
              id={`option-${index}`}
              aria-selected={option === selected}
              className={`px-4 py-2 text-left cursor-pointer ${
                focusedIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
