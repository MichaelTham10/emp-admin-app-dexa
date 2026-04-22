import React, { useState } from 'react';
import { ResponseAttdByEmpNo } from '../interfaces/Response/ResponseAttdByEmpNo';
import { attendanceApi, GetAllAttdsUrl } from '../constants/UrlConstans';
import { useQuery } from '@tanstack/react-query';
import { ResponsePagination } from '../interfaces/Response/ResponsePagination';

export const AttendanceAdminSummaryComponent = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useQuery<ResponsePagination<ResponseAttdByEmpNo[]>>({
    queryKey: ['attendance', currentPage],
    queryFn: async () => {
      const res = await attendanceApi.get<ResponsePagination<ResponseAttdByEmpNo[]>>(
        GetAllAttdsUrl,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        }
      );
      return res.data;
    }
  });

  const list = (data && data.data) ?? [];
  console.log(data);
  const indexOfLastItem = currentPage * itemsPerPage;
  const totalPages = data && data.perPage ? Math.ceil(data.perPage.total / itemsPerPage) : Math.ceil(list.length / itemsPerPage);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Attendance Summary</h2>

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th>Attendance No</th>
              <th>Employee No</th>
              <th>Check In</th>
              <th>Check Out</th>
            </tr>
          </thead>
          <tbody>
            {data && data.data.map((item: ResponseAttdByEmpNo) => (
              <tr key={item.AttendanceNo} className="border-b">
                <td>{item.AttendanceNo}</td>
                <td>{item.EmpNo}</td>
                <td>{item.CheckIn ? item.CheckIn.toString() : '-'}</td>
                <td>{item.CheckOut ? item.CheckOut.toString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <p>
            {Math.min(indexOfLastItem, list.length)} from {data?.perPage.total} data
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};