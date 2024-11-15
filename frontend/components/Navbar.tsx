import React from 'react'
import Link from 'next/link'
import { AiOutlineGithub, AiOutlineInfoCircle, AiOutlineMail } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { 
    AiOutlineUser, 
    AiOutlineBook, 
    AiOutlineTeam,
    AiOutlineBarChart,
    AiOutlineSetting,
    AiOutlineDashboard,
    AiOutlineCalendar,
    AiOutlineDollar,
    AiOutlineFileText,
    AiOutlineNotification,
    AiOutlineIdcard,
    AiOutlineSchedule,
    AiOutlineRead,
    AiOutlineAudit,
    AiOutlineAppstore
} from 'react-icons/ai'

export default function Navbar() {
  return (
    <div className="min-h-screen bg-base-200">
        {/* Logo and Title Section */}
        <Link href="/" className="block p-4 border-b">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                    <AiOutlineAppstore className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold ">EduAdmin Pro</h1>
                    <p className="text-sm text-gray-500">School Management System</p>
                </div>
            </div>
        </Link>

        {/* Navigation Menu */}
        <ul className='menu p-4'>
            <li>
                <Link href="/dashboard" className="flex items-center gap-2">
                    <AiOutlineDashboard className="w-5 h-5" />
                    Dashboard
                </Link>
            </li>
            
            {/* Student Management */}
            <li>
                <Link href="/students" className="flex items-center gap-2">
                    <AiOutlineUser className="w-5 h-5" />
                    Students
                </Link>
            </li>
            <li>
                <Link href="/attendance" className="flex items-center gap-2">
                    <AiOutlineAudit className="w-5 h-5" />
                    Attendance
                </Link>
            </li>
            <li>
                <Link href="/grades" className="flex items-center gap-2">
                    <AiOutlineRead className="w-5 h-5" />
                    Grades
                </Link>
            </li>

            {/* Academic */}
            <li>
                <Link href="/courses" className="flex items-center gap-2">
                    <AiOutlineBook className="w-5 h-5" />
                    Courses
                </Link>
            </li>
            <li>
                <Link href="/departments" className="flex items-center gap-2">
                    <AiOutlineTeam className="w-5 h-5" />
                    Departments
                </Link>
            </li>
            <li>
                <Link href="/schedule" className="flex items-center gap-2">
                    <AiOutlineSchedule className="w-5 h-5" />
                    Class Schedule
                </Link>
            </li>

            {/* Administrative */}
            <li>
                <Link href="/admissions" className="flex items-center gap-2">
                    <AiOutlineIdcard className="w-5 h-5" />
                    Admissions
                </Link>
            </li>
            <li>
                <Link href="/calendar" className="flex items-center gap-2">
                    <AiOutlineCalendar className="w-5 h-5" />
                    Academic Calendar
                </Link>
            </li>
            <li>
                <Link href="/fees" className="flex items-center gap-2">
                    <AiOutlineDollar className="w-5 h-5" />
                    Fees & Payments
                </Link>
            </li>

            {/* Communication */}
            <li>
                <Link href="/announcements" className="flex items-center gap-2">
                    <AiOutlineNotification className="w-5 h-5" />
                    Announcements
                </Link>
            </li>
            <li>
                <Link href="/messages" className="flex items-center gap-2">
                    <AiOutlineMail className="w-5 h-5" />
                    Messages
                </Link>
            </li>

            {/* Reports & Settings */}
            <li>
                <Link href="/reports" className="flex items-center gap-2">
                    <AiOutlineBarChart className="w-5 h-5" />
                    Reports
                </Link>
            </li>
            <li>
                <Link href="/documents" className="flex items-center gap-2">
                    <AiOutlineFileText className="w-5 h-5" />
                    Documents
                </Link>
            </li>
            <li>
                <Link href="/settings" className="flex items-center gap-2">
                    <AiOutlineSetting className="w-5 h-5" />
                    Settings
                </Link>
            </li>
            <li>
                <Link href="https://github.com/onesmuskipchumba0" className="flex items-center gap-2">
                    <AiOutlineGithub className="w-5 h-5" />
                    Contact Developer
                </Link>
            </li>
        </ul>
    </div>
  )
}
