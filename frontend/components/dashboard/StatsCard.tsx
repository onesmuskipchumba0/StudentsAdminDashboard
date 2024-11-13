import React from 'react';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  bgColor: string;
  iconColor: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white transition-all duration-200 hover:cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${bgColor} rounded-full`}>
          <Icon className={`${iconColor} text-xl`} />
        </div>
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}; 