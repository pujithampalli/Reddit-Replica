import React from 'react';
import {
  MenuItem,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavDropdown,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  DropdownItem } from 'react-bootstrap';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import Posts from '../containers/Posts.js';
import { Route, Redirect } from 'react-router-dom';

export default class Data extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {
    const { posts } = this.props
    return (
      <div>
          {posts.length > 0 &&
              <Posts posts={posts} />
          }
      </div>
    );
  }
}
