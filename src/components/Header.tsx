
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="text-xl font-semibold text-primary">
            CaseCustomizer
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Create your unique phone case
        </div>
      </div>
    </div>
  );
};

export default Header;
