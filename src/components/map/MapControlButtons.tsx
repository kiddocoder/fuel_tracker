
import React from 'react';

type MapControlButtonsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const MapControlButtons = ({ onZoomIn, onZoomOut }: MapControlButtonsProps) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[400]">
      <button
        onClick={onZoomIn}
        className="bg-white rounded-md shadow-md w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-orange-50 border border-gray-200 transition-colors"
        aria-label="Zoom in"
      >
        <span className="text-xl font-bold text-orange-500">+</span>
      </button>
      <button
        onClick={onZoomOut}
        className="bg-white rounded-md shadow-md w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-orange-50 border border-gray-200 transition-colors"
        aria-label="Zoom out"
      >
        <span className="text-xl font-bold text-orange-500">-</span>
      </button>
    </div>
  );
};

export default MapControlButtons;
