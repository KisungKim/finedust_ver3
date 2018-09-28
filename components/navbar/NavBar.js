import React from "react";
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  return (
    
      <div className="father">        
        <Link to={"/app01/main_page_new/"}><div className="nav-bar">FineDust</div></Link>
        <div></div>
        <div></div>
        <div></div>
        {/* <div className="nav-content">우리동네 미세먼지 & 산책로 알아보기</div> */}
      </div>
    
  );
};

export default NavBar;
// const NavBar = props => {
//   return (
//     <Navbar inverse collapseOnSelect>
//       <Navbar.Header>
//         <Navbar.Brand>
//           <div className="logo">
//             <Link to="/">FineDust</Link>
//           </div>
//         </Navbar.Brand>
//         <Navbar.Toggle />
//       </Navbar.Header>
//       <Navbar.Collapse>
//         <Nav>
//           <NavItem eventKey={1}>
//             <Link to="/details/1">뭐넣지1</Link>
//           </NavItem>
//           <NavItem eventKey={2} href="/details/2">
//             <Link to="/details/2">뭐넣지2</Link>
//           </NavItem>
//           <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
//             <MenuItem eventKey={3.1}>Action</MenuItem>
//             <MenuItem eventKey={3.2}>Another action</MenuItem>
//             <MenuItem eventKey={3.3}>Something else here</MenuItem>
//             <MenuItem divider />
//             <MenuItem eventKey={3.3}>Separated link</MenuItem>
//           </NavDropdown>
//         </Nav>
//         <Nav pullRight>
//           <NavItem eventKey={1} href="#">
//             Link Right
//           </NavItem>
//           <NavItem eventKey={2} href="#">
//             Link Right
//           </NavItem>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

