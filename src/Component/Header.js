import { Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import About  from "./About/About";
import Search from "./Search/Search";
import Add from "./Add/Add";

const HeaderNav = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">Init App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/add">Add</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/" exact>
          <About></About>
        </Route>
        <Route path="/search">
          <Search></Search>
        </Route>
        <Route path="/add">
          <Add></Add>
        </Route>
      </Switch>
    </>
  );
};

export default HeaderNav;
