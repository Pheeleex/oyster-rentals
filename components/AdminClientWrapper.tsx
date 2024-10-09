// components/AdminClientWrapper.tsx (Client Component)
'use client'; // Declare this as a client-side component

import { useState, ReactNode } from 'react';
import DropdownSelector from '@/components/DropdownSelector'; // Dropdown Selector

// Define the props type for the AdminClientWrapper component
interface AdminClientWrapperProps {
  testdrivesComponent: ReactNode;
  preordersComponent: ReactNode;
  repairsComponent: ReactNode;
}

const AdminClientWrapper: React.FC<AdminClientWrapperProps> = ({
  testdrivesComponent,
  preordersComponent,
  repairsComponent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('testdrives'); // default is 'testdrives'

  const handleSelectionChange = (category: string) => {
    setSelectedCategory(category); // Update the selected category
  };

  // Determine which component to render based on selected category
  const renderSelectedComponent = () => {
    switch (selectedCategory) {
      case 'testdrives':
        return testdrivesComponent;
      case 'preorders':
        return preordersComponent;
      case 'repairs':
        return repairsComponent;
      default:
        return testdrivesComponent; // fallback to testdrives
    }
  };

  return (
    <div>
      <DropdownSelector onSelectionChange={handleSelectionChange} />
      {/* Render the selected component */}
      {renderSelectedComponent()}
    </div>
  );
};

export default AdminClientWrapper;

