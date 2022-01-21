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
  background-color: rgb(237, 242, 244);

  .logo-container {
    padding: 16px;
    width: 100%;
    img {
      width: 100%;
    }
  }
`;

const RightColumn = styled.main`
  height: 100%;
  flex: 1;
`;

const StyledNavLink = styled(NavLink)`
  border-radius: 8px;
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: var(---primary-color);
  margin: 0 4px 4px 4px;
  &:hover {
    background-color: #969e9e;
  }

  &.active {
    background-color: var(--primary-color);
    color: #fff;
  }
`;
