import { AxiosFetcher } from "../fetcher/AxiosFetcher"


export const empApi    = AxiosFetcher(process.env.REACT_APP_EMPLOYEE_API!)
export const attendanceApi = AxiosFetcher(process.env.REACT_APP_ATTENDANCE_API!)

export const loginUrl = '/v1/Auth/Login'
export const GetEmployeeByEmpNoUrl = "/v1/Employee/GetEmployeeByEmpNo";
export const CheckInUrl = "/v1/Attendance/CheckIn";
export const CheckOutUrl = "/v1/Attendance/CheckOut";
export const UpdateEmployeeByIdUrl = "/v1/Employee/UpdateEmployeeById";
export const GetAttdByEmpNo = "/v1/Attendance/GetAttendancesByEmpNo";