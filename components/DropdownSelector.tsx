'use client'; // Declare this as a client-side component

import { useState } from 'react';

interface DropdownSelectorProps {
  onSelectionChange: (value: string) => void; // type for function prop
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ onSelectionChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('testdrives'); // default is 'testdrives'

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelectionChange(value); // notify parent about selection change
  };

  return (
    <div className="relative inline-block w-full max-w-xs ml-[38%]">
      <select
        value={selectedOption}
        onChange={handleSelectionChange}
        className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
      >
        <option value="testdrives">Testdrives</option>
        <option value="preorders">Preorders</option>
        <option value="repairs">Repairs</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default DropdownSelector;
