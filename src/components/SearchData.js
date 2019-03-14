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
import App from '../containers/App.js';
import Posts from '../containers/Posts.js';
import { Route, Redirect } from 'react-router-dom';

export default class SearchData extends React.Component {
  constructor(props) {
    super(props);


  }


  render() {
    const { posts } = this.props
    return (
      <div>
              <Posts posts={posts} />
          
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("from mapstateprops searchdata"+ JSON.stringify(state));
    const { selectedSubreddit, postsBySubreddit } = state
    const { isFetching, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }

    return {
        selectedSubreddit,
        posts,
    }
}

export default connect(mapStateToProps)(SearchData)
