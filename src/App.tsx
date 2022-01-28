import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Stylesheet from "./Stylesheet";
import logo from "./assets/logo.png";
import List from "./List";
import EditEmployee from "./EditEmployee";

export default function App() {
  return (
    <Router>
      <Stylesheet />
      <LeftColumn>
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div>
          <StyledNavLink to="/board" isActive={(match) => !!match}>
            Board of Directors
          </StyledNavLink>
          <StyledNavLink to="/" isActive={(match) => !!match}>
            Employees
          </StyledNavLink>
        </div>
      </LeftColumn>
      <RightColumn>
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/:id" exact component={EditEmployee} />
        </Switch>
      </RightColumn>
    </Router>
  );
}

const LeftColumn = styled.aside`
  height: 100%;
  width: 240px;
  background-color: #fff;
  box-shadow: var(--card-shadow);
  position: sticky;
  top: 0;

  .logo-container {
    padding: 16px;
    width: 100%;
    text-align: center;
    img {
      max-width: 150px;
      width: 100%;
    }
  }
`;

const RightColumn = styled.main`
  height: 100%;
  flex: 1;
`;

const StyledNavLink = styled(NavLink)`
  border-radius: 6px;
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: var(---primary-color);
  font-weight: 500;
  margin: 0 8px 8px;
  &:hover {
    background-color: #eee;
  }

  &.active {
    background-color: var(--primary-color);
    color: #fff;
  }
`;
