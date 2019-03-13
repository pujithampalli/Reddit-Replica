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
import { Route, Redirect } from 'react-router-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      menu: '/best',
    }

  }

  handleSelect(eventKey) {
    if(eventKey==1){
      this.setState({menu: '/best'});
      this.props.handleMenuChange('best',"");
    }
    if(eventKey==2.1){
      this.setState({menu: '/worldnews'});
      this.props.handleMenuChange('r/worldnews/','best');
    }
    if(eventKey==2.2){
      this.setState({menu: '/politics'});
      this.props.handleMenuChange('r/politics/','best');
    }
    if(eventKey==2.3){
      this.setState({menu: '/technology'});
      this.props.handleMenuChange('r/technology/','best');
    }
    if(eventKey==2.4){
      this.setState({menu: '/movies'});
      this.props.handleMenuChange('r/movies/','best');
    }
    if(eventKey==2.5){
      this.setState({menu: '/gaming'});
      this.props.handleMenuChange('r/gaming/','best');
    }
  }
  handleSort(eventKey){
    if(this.props.selectedSub == 'best'||this.props.selectedSub == 'hot'||this.props.selectedSub == 'new'||this.props.selectedSub == 'controversial'){
      if(eventKey==3.1){
        this.setState({menu: ''});
        this.props.handleMenuChange('hot','');
      }
      if(eventKey==3.2){
        this.setState({menu: ''});
        this.props.handleMenuChange('new','');
      }
      if(eventKey==3.3){
        this.setState({menu: ''});
        this.props.handleMenuChange('controversial','');
      }
    }
    else{
      if(eventKey==3.1){
        this.props.handleMenuChange(this.props.selectedSub,'hot');
      }
      if(eventKey==3.2){
        this.props.handleMenuChange(this.props.selectedSub,'new');
      }
      if(eventKey==3.3){
        this.props.handleMenuChange(this.props.selectedSub,'controversial');
      }
    }
  }
  render() {
    return (
      <Navbar class="navbarleft">
        <Navbar.Header>
          <Navbar.Brand pullLeft>
            <a href="/home">Reddit-Replica</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onSelect={this.handleSelect}><Link to="/home">Home</Link></NavItem>
            <NavDropdown eventKey={2} title="Subreddits" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} onSelect={this.handleSelect}><Link to="/worldnews/best">World News</Link></MenuItem>
              <MenuItem eventKey={2.2} onSelect={this.handleSelect}><Link to="/politics/best">Politics</Link></MenuItem>
              <MenuItem eventKey={2.3} onSelect={this.handleSelect}><Link to="/technology/best">Technology</Link></MenuItem>
              <MenuItem eventKey={2.4} onSelect={this.handleSelect}><Link to="/movies/best">Movies</Link></MenuItem>
              <MenuItem eventKey={2.5} onSelect={this.handleSelect}><Link to="/gaming/best">Gaming</Link></MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Sort By" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onSelect={this.handleSort}><Link to={this.state.menu+"/hot"}>Hot</Link></MenuItem>
              <MenuItem eventKey={3.2} onSelect={this.handleSort}><Link to={this.state.menu+"/new"}>New</Link></MenuItem>
              <MenuItem eventKey={3.3} onSelect={this.handleSort}><Link to={this.state.menu+"/controversial"}>Controversial</Link></MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Search Reddit..." />
            </FormGroup>{' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
        <div>
          <Route exact path='/home' render={() => <App selectedTabId={this.props.selectedTabId} updateMainNavId={this.props.updateMainNavId}/>}/>
          <Route path='/programmes' render={(props) => <App updateMainNavId={this.props.updateMainNavId} {...props}/>}/>
          <Route path='/facilities' render={(props) => <App updateMainNavId={this.props.updateMainNavId} {...props}/>}/>
        </div>
      </Navbar>
    );
  }
}
