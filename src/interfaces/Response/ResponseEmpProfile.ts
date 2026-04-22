import { EmpPhoto } from "../General/EmpPhoto"
import { EmpPosition } from "../General/EmpPosition"

export interface ResponseEmpProfile {
  EmpId: number;
  EmpName: string
  EmpNo: string
  Email: string
  EmpPosition: EmpPosition
  EmpPhotos: EmpPhoto[]
  PhoneNumber: string
}