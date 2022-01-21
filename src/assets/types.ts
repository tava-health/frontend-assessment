export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateStarted: string;
  department: string;
  quote: string;
}

export type EmployeeCreate = Omit<Employee, "id">;

export type EmployeePatch = Pick<Employee, "id"> & Partial<EmployeeCreate>;
