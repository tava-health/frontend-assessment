import { useEffect, useState } from "react";
import styled from "styled-components";
import MockServer from "./assets/MockServer";
import { Employee } from "./assets/types";
import moment from "moment-timezone";
import { NavLink } from "react-router-dom";
import Card from "./Card";

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
        <Card>
          <DepartmentSection key={key}>
            <header>
              <h2>{key}</h2>
            </header>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>Quote</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {departmentMap[key].map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <NameLink to={`/${employee.id}`}>
                        <Avatar src={employee.avatarUrl} alt="" />
                        {employee.firstName} {employee.lastName}
                      </NameLink>
                    </td>
                    <td>
                      {moment(employee.dateStarted).format("MMM Do, yyyy")}
                    </td>
                    <td>{employee.quote}</td>
                    <td>
                      <StatusLabel status={employee.status}>
                        {employee.status}
                      </StatusLabel>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DepartmentSection>
        </Card>
      ))}
    </>
  );
}

const Container = styled.div`
  padding: 32px;
`;

const NameLink = styled(NavLink)`
  align-items: center;
  display: inline-flex;
  vertical-align: middle;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  margin-right: 8px;
`;

const StatusLabel = styled.span<{ status: "active" | "inactive" }>`
  font-size: 12px;
  background-color: ${(props) =>
    props.status === "inactive" ? "rgb(229, 165, 75)" : "rgb(75, 191, 115)"};
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  font-weight: 700;
  text-transform: capitalize;
`;

const DepartmentSection = styled.section`
  header {
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
      padding: 16px;
      border-bottom: 1px solid var(--light-gray);
    }

    tbody {
      tr:hover {
        background-color: var(--secondary-color);
      }
    }

    /* tr:nth-child(even) {
      background-color: #f4f2f0;
    } */

    thead {
      th {
        border-bottom: 2px solid var(--text-secondary);
        color: var(--text-secondary);
      }
    }
  }
`;
