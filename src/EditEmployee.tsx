import { useFormik } from "formik";
import { HTMLAttributes, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import MockServer from "./assets/MockServer";
import { Employee } from "./assets/types";
import * as Yup from "yup";
import Card from "./Card";

interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  field: keyof Employee;
}

const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  dateStarted: Yup.string().required("Start Date is required"),
  department: Yup.string().required("Department is required"),
  quote: Yup.string().required("Quote is required"),
});

export default function EditEmployee() {
  const [employee, setEmployee] = useState<Employee>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    MockServer.get(parseInt(id)).then(setEmployee);
  }, [id]);

  return (
    <Container>
      <h1>Edit Employee</h1>
      {!employee && <div>Loading...</div>}
      {employee && <Form employee={employee} />}
    </Container>
  );
}
interface FormProps {
  employee: Employee;
}
function Form({ employee }: FormProps) {
  const history = useHistory();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: employee,
    onSubmit: async (values) => {
      const result = await MockServer.patch(values);
      if (result instanceof Error) {
        // Do some error handling
      } else {
        history.push("/");
      }
    },
  });

  const { handleChange, values, handleSubmit, errors, touched } = formik;

  const ErrorMessage = ({ field, ...props }: ErrorMessageProps) => {
    if (errors[field] && touched[field]) {
      return (
        <StyledErrorMessage {...props}>{errors[field]}</StyledErrorMessage>
      );
    }
    return null;
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Card>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            value={values.firstName}
            placeholder="First Name"
            onChange={handleChange}
          />
          <ErrorMessage field="firstName" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            value={values.lastName}
            placeholder="Last Name"
            onChange={handleChange}
          />
          <ErrorMessage field="lastName" />
        </div>
        <div className="form-group">
          <label htmlFor="dateStarted">Start Date</label>
          <input
            name="dateStarted"
            type="text"
            value={values.dateStarted}
            placeholder="Start Date"
            onChange={handleChange}
          />
          <ErrorMessage field="dateStarted" />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            name="department"
            value={values.department}
            onChange={handleChange}
          >
            <option value="Management">Management</option>
            <option value="Engineering">Engineering</option>
            <option value="Food Services">Food Services</option>
            <option value="Operations">Operations</option>
          </select>
          <ErrorMessage field="department" />
        </div>
        <div className="form-group">
          <label htmlFor="quote">Quote</label>
          <textarea name="quote" value={values.quote} onChange={handleChange} />
          <ErrorMessage field="quote" />
        </div>
        <div className="button-container"></div>
        <Button type="submit">Save</Button>
      </Card>
    </StyledForm>
  );
}

const Container = styled.div`
  padding: 32px;
`;

const StyledForm = styled.form`
  width: 600px;
  .form-group {
    label {
      display: block;
      margin-bottom: 4px;
    }

    textarea {
      height: 100px;
    }

    input,
    textarea,
    select {
      width: 100%;
      border: 1px solid var(--light-gray);
      padding: 8px;
      border-radius: 4px;

      &:focus {
        outline-color: var(--primary-color);
      }
    }
    padding-bottom: 12px;
  }
  .button-container {
    padding-top: 8px;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  cursor: pointer;
`;

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 0.1rem;
`;
