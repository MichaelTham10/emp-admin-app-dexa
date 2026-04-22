import React, { useState } from 'react';
import { ResponseAttdByEmpNo } from '../interfaces/Response/ResponseAttdByEmpNo';
import { attendanceApi, GetAttdByEmpNo } from '../constants/UrlConstans';
import { useQuery } from '@tanstack/react-query';

export const AttendanceSummaryComponent = ({
  empNo
}: {
  empNo: string;
}) => {

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [filter, setFilter] = useState({
    dateFrom: '',
    dateTo: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useQuery<ResponseAttdByEmpNo[]>({
    queryKey: ['attendance', empNo, filter],
    queryFn: async () => {
      const res = await attendanceApi.get<ResponseAttdByEmpNo[]>(
        GetAttdByEmpNo,
        {
          params: {
            empNo,
            ...(filter.dateFrom && { dateFrom: filter.dateFrom }),
            ...(filter.dateTo && { dateTo: filter.dateTo }),
          }
        }
      );
      return res.data;
    }
  });

  const list = data ?? [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Attendance Summary</h2>

        <div className="flex flex-wrap items-end gap-4 mb-8">
          <div>
            <label className="text-xs font-semibold text-gray-500">FROM</label>
            <input
              type="date"
              className="border p-2 rounded"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">TO</label>
            <input
              type="date"
              className="border p-2 rounded"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setFilter({ dateFrom, dateTo });
              setCurrentPage(1);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Filter
          </button>

          <button
            onClick={() => {
              setDateFrom('');
              setDateTo('');
              setFilter({ dateFrom: '', dateTo: '' });
              setCurrentPage(1);
            }}
            className="text-gray-500"
          >
            Reset
          </button>
        </div>

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
            {currentItems.map((item: ResponseAttdByEmpNo) => (
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
            {Math.min(indexOfLastItem, list.length)} dari {list.length}
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