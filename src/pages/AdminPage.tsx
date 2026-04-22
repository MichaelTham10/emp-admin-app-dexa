import { useQuery } from '@tanstack/react-query'
import { empApi, GetEmployeeByEmpNoUrl } from '../constants/UrlConstans'
import { jwtDecode } from 'jwt-decode'
import { TokenPayload } from '../interfaces/General/TokenPayload'
import { ResponseEmpProfile } from '../interfaces/Response/ResponseEmpProfile'
import { EmpUpdateComponent } from '../components/EmpUpdateComponent'
import { useState } from 'react'
import { AttendanceSummaryComponent } from '../components/AttendanceSummaryComponent'
import { EmpAddComponent } from '../components/EmpAddComponent'
import { AttendanceAdminSummaryComponent } from '../components/AttendanceAdminSummaryComponent'

export const AdminPage = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isAttd, setIsAttd] = useState<boolean>(false);
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const token = localStorage.getItem('token')
    const decoded = jwtDecode<TokenPayload>(token!)
    const { data, isLoading, isError } = useQuery<ResponseEmpProfile>({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await empApi.get<ResponseEmpProfile>(`${GetEmployeeByEmpNoUrl}/${decoded.empNo}`)
            return data
        },
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-sm text-gray-400">Loading...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-sm text-red-400">Failed to load profile</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50  gap-2 p-4">
            <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">

                <div className="flex flex-col items-center mb-6">
                    {data?.EmpPhotos && data.EmpPhotos.length > 0 ? (
                        <img
                            src={data.EmpPhotos[0].Base64}
                            alt={data.EmpName}
                            className="w-24 h-24 rounded-full object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border border-gray-200">
                            <span className="text-2xl font-medium text-blue-600">
                                {data?.EmpName?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                    <h1 className="text-lg font-medium text-gray-900 mt-3">{data?.EmpName}</h1>
                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-1">
                        {data?.EmpPosition?.EmpPositionName}
                    </span>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                <div className="space-y-4">

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Company Email</p>
                            <p className="text-sm text-gray-800">{data?.Email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Phone Number</p>
                            <p className="text-sm text-gray-800">{data?.PhoneNumber}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Position</p>
                            <p className="text-sm text-gray-800">{data?.EmpPosition?.EmpPositionName}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-between gap-2 mb-3'>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setIsAttd(false);
                                setIsAdd(true);
                            }}
                            className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60
            text-white text-sm font-medium rounded-lg mt-2"
                        >
                            Add Employee
                        </button>
                        <button
                            onClick={() => {
                                setIsEditing(true);
                                setIsAttd(false);
                                setIsAdd(false);
                            }}
                            className="w-full h-10 bg-red-600 hover:bg-red-700 disabled:opacity-60
            text-white text-sm font-medium rounded-lg mt-2"
                        >
                            Edit Employee
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setIsAdd(false);
                        setIsEditing(false);
                        setIsAttd(true);
                    }}
                    className="w-full h-10 bg-purple-600 hover:bg-purple-700 disabled:opacity-60
            text-white text-sm font-medium rounded-lg mt-2"
                >
                    Attendance All Employee Summary
                </button>

            </div>
            {isAdd && <EmpAddComponent />}
            {isEditing && <EmpUpdateComponent />}
            {isAttd && <AttendanceAdminSummaryComponent />}
        </div>
    )
}