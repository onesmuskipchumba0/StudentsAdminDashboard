import React from 'react';
import { AiOutlineUser, AiOutlineBook } from 'react-icons/ai';

// Read from database
const activities = [
  {
    icon: AiOutlineUser,
    title: 'New Student Enrolled',
    description: 'John Doe enrolled in Web Development',
    time: '2 hours ago',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: AiOutlineBook,
    title: 'Course Updated',
    description: 'React Fundamentals course material updated',
    time: '5 hours ago',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4 border-b pb-4 hover:cursor-pointer hover:bg-gray-100 px-4">
            <div className={`p-2 ${activity.bgColor} rounded-full`}>
              <activity.icon className={activity.iconColor} />
            </div>
            <div>
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 