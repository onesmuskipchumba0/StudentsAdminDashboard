'use client'
import React from 'react'
import { AiOutlineUser, AiOutlineBook, AiOutlineDollar, AiOutlineCheckCircle } from 'react-icons/ai'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { EnrollmentChart } from '@/components/dashboard/EnrollmentChart'
import { CourseDistribution } from '@/components/dashboard/CourseDistribution'
import { AttendanceChart } from '@/components/dashboard/AttendanceChart'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

const enrollmentData = [
  { month: "Jan", students: 65 },
  { month: "Feb", students: 78 },
  { month: "Mar", students: 90 },
  { month: "Apr", students: 81 },
  { month: "May", students: 86 },
  { month: "Jun", students: 95 },
  { month: "Jul", students: 88 },
];

const statsData = [
  {
    title: "Total Students",
    value: "1,234",
    icon: AiOutlineUser,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    title: "Active Courses",
    value: "42",
    icon: AiOutlineBook,
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    title: "Revenue",
    value: "$52,000",
    icon: AiOutlineDollar,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    title: "Completion Rate",
    value: "85%",
    icon: AiOutlineCheckCircle,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600"
  }
];

export default function Dashboard(): React.JSX.Element {
  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <div className="col-span-2">
          <EnrollmentChart data={enrollmentData} />
        </div>

        {/* Course Distribution */}
        <CourseDistribution />

        {/* Attendance Chart */}
        <AttendanceChart />
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <RecentActivity />
      </div>
    </div>
  )
} 