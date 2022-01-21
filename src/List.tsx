import { useEffect, useState } from "react";
import styled from "styled-components";
import MockServer from "./assets/MockServer";
import { Employee } from "./assets/types";
import moment from "moment-timezone";
import { NavLink } from "react-router-dom";

export default function List() {
  const [employees, setEmployees] = useState<Employee[] | undefined>();

  useEffect(() => {
    MockServer.getList().then(setEmployees);
  }, []);

  return (
    <Container>
      <h1>Employees</h1>
      {!employees && <div>Loading...</div>}
      {employees && <GroupedEmployeesList employees={employees} />}
    </Container>
  );
}

interface GroupedEmployeesListProps {
  employees: Employee[];
}

interface DepartmentMap {
  [department: string]: Employee[];
}

function GroupedEmployeesList({ employees }: GroupedEmployeesListProps) {
  const departmentMap: DepartmentMap = {};
  employees.forEach((employee) => {
    if (departmentMap[employee.department]) {
      departmentMap[employee.department].push(employee);
    } else {
      departmentMap[employee.department] = [employee];
    }
  });

  return (
    <>
      {Object.keys(departmentMap).map((key) => (
        <DepartmentSection key={key}>
          <header>
            <h3>{key}</h3>
          </header>
          <table>
            <thead>
              <tr>
                <th style={{ width: "180px" }}>Name</th>
                <th style={{ width: "180px" }}>Start Date</th>
                <th>Quote</th>
              </tr>
            </thead>
            <tbody>
              {departmentMap[key].map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <NavLink to={`/${employee.id}`}>
                      {employee.firstName} {employee.lastName}
                    </NavLink>
                  </td>
                  <td>{moment(employee.dateStarted).format("MMM Do, yyyy")}</td>
                  <td>{employee.quote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DepartmentSection>
      ))}
    </>
  );
}

const Container = styled.div`
  padding: 32px;
`;

const DepartmentSection = styled.section`
  margin-bottom: 32px;
  header {
    background-color: var(--secondary-color);
    border-radius: var(--border-radius);
    padding: 8px;
    margin-bottom: 16px;
    h3 {
      margin-bottom: 0;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    td,
    th {
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #f4f2f0;
    }
  }
`;
