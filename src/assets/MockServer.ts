import { data } from "./data";
import { Employee, EmployeeCreate, EmployeePatch } from "./types";

class MockServer {
  constructor(private data: Employee[]) {}

  public get(id: number) {
    const employee = this.data.find((emp) => emp.id === id);
    const promise = new Promise<Employee>((resolve, reject) => {
      setTimeout(() => {
        if (employee) {
          resolve(employee);
        } else {
          if (!employee) {
            reject(Error("Employee record not found"));
          }
        }
      }, 500);
    });

    return promise;
  }

  public getList() {
    const promise = new Promise<Employee[]>((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 500);
    });
    return promise;
  }

  public patch(update: EmployeePatch) {
    const existingIndex = this.data.findIndex((emp) => emp.id === update.id);
    const existingRecord = this.data[existingIndex];
    const promise = new Promise<Employee>((resolve, reject) => {
      setTimeout(() => {
        if (!existingRecord) {
          reject(Error("Employee record not found"));
        }

        const newRecord = { ...existingRecord, ...update };
        this.data.splice(existingIndex, 1, newRecord);
        resolve(newRecord);
      }, 1000);
    });
    return promise;
  }

  public create(employee: EmployeeCreate) {
    const promise = new Promise<Employee>((resolve) => {
      setTimeout(() => {
        const newEmployee: Employee = { ...employee, id: this.data.length + 1 };
        this.data.push(newEmployee);
        resolve(newEmployee);
      }, 1000);
    });
    return promise;
  }
}

export default new MockServer(data);
