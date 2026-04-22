export interface ResponseAttdByEmpNo {
    AttendanceNo : string;
    EmpNo : string;
    CheckIn: Date | undefined | null;
    CheckOut: Date | undefined | null;
}