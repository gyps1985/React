import { Nav, Navbar } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import About  from "./About/About";
import Add from "./Add/Add";
import PageNotFound from './PageNotFound';
import Search from "./Search/Search";

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
        <Route path="/" exact component ={About}/>
        <Route path="/search" component ={Search}/>
        <Route path="/add"component ={Add}/>

        <Route component={PageNotFound} />
      </Switch>
    </>
  );
};

export default HeaderNav;
