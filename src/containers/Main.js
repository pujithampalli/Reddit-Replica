import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { Route, Redirect } from 'react-router-dom';
import {
    selectSubreddit,
    selectSort,
    fetchPostsIfNeeded,
    invalidateSubreddit,
    searchPosts
} from '../actions/actions'
import Data from '../components/Data'
import Header from '../components/Header'
import Posts from '../containers/Posts'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          menu: '/best',
          term: ''
        }
        

        this.handleMenuChange = this.handleMenuChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);

        if (window.performance) {
        if (performance.navigation.type == 1) {
          console.log("This is state: "+this.state.menu);
          
        }
      }
      this.recvPosts = {};

    }

    handleSelect(eventKey) {
      if(eventKey==1){
        this.setState({menu: '/best'});
        this.handleMenuChange('best',"");
      }
      if(eventKey==2.1){
        this.setState({menu: '/worldnews'});
        this.handleMenuChange('r/worldnews/','best');
      }
      if(eventKey==2.2){
        this.setState({menu: '/politics'});
        this.handleMenuChange('r/politics/','best');
      }
      if(eventKey==2.3){
        this.setState({menu: '/technology'});
        this.handleMenuChange('r/technology/','best');
      }
      if(eventKey==2.4){
        this.setState({menu: '/movies'});
        this.handleMenuChange('r/movies/','best');
      }
      if(eventKey==2.5){
        this.setState({menu: '/gaming'});
        this.handleMenuChange('r/gaming/','best');
      }
    }
    handleSort(eventKey){
      if(this.props.selectedSubreddit == 'best'||this.props.selectedSubreddit == 'hot'||this.props.selectedSubreddit == 'new'||this.props.selectedSubreddit == 'controversial'){
        if(eventKey==3.1){
          this.setState({menu: ''});
          this.handleMenuChange('hot','');
        }
        if(eventKey==3.2){
          this.setState({menu: ''});
          this.handleMenuChange('new','');
        }
        if(eventKey==3.3){
          this.setState({menu: ''});
          this.handleMenuChange('controversial','');
        }
      }
      else{
        if(eventKey==3.1){
          this.handleMenuChange(this.props.selectedSubreddit,'hot');
        }
        if(eventKey==3.2){
          this.handleMenuChange(this.props.selectedSubreddit,'new');
        }
        if(eventKey==3.3){
          this.handleMenuChange(this.props.selectedSubreddit,'controversial');
        }
      }
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
        console.log("This is state did mount: "+this.state.menu);
    }

    componentDidUpdate(){
      const { dispatch, selectedSubreddit } = this.props
      console.log('selected subreddit: '+selectedSubreddit);
      window.onpopstate  = (e) => {
        window.location.reload();
        
      }
      console.log("This is state update: "+this.state.menu);
    }

    handleMenuChange(subreddit,sort) {
        const sub = subreddit.replace(/ /g, '')
        this.props.dispatch(selectSubreddit(sub))
        this.props.dispatch(selectSort(sort))
        this.props.dispatch(fetchPostsIfNeeded(sub,sort))
    }

    handleRefreshClick() {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(invalidateSubreddit(selectedSubreddit))
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    handleInputChange (term) {
      const { dispatch } = this.props
      this.setState({ term });
      console.log("This is search: "+term)
      this.props.dispatch(selectSubreddit('search'))
      this.recvPosts = dispatch(searchPosts(term))
      console.log("Results: "+JSON.stringify(this.recvPosts));
  }

    render() {
        const { selectedSubreddit, posts } = this.props

        return (
            <div>
            <Navbar className="navbarleft">
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
                    <Link to={"/search"}>
                      <FormControl type="text" placeholder="Search Reddit..." value={this.state.term} onChange= {event => this.handleInputChange(event.target.value)}/>
                    </Link>
                  </FormGroup>
                </Navbar.Form>
              </Navbar.Collapse>
            </Navbar>
            <Navbar className="sub-header">
            Posts from Reddit <span className="name">'{selectedSubreddit}'</span>
            </Navbar>
            <div>
              <Redirect from="/" to="/home" />
              <Route exact path='/home' render={() => <Data posts={posts}/>}/>
              <Route exact path='/hot' render={() => <Data posts={posts}/>}/>
              <Route exact path='/new' render={() => <Data posts={posts}/>}/>
              <Route exact path='/controversial' render={() => <Data posts={posts}/>}/>
              <Route path='/worldnews/best' render={() => <Data posts={posts}/>}/>
              <Route path='/politics/best' render={() => <Data posts={posts}/>}/>
              <Route path='/technology/best' render={() => <Data posts={posts}/>}/>
              <Route path='/movies/best' render={() => <Data posts={posts}/>}/>
              <Route path='/gaming/best' render={() => <Data posts={posts}/>}/>
              <Route path='/worldnews/hot' render={() => <Data posts={posts}/>}/>
              <Route path='/politics/hot' render={() => <Data posts={posts}/>}/>
              <Route path='/technology/hot' render={() => <Data posts={posts}/>}/>
              <Route path='/movies/hot' render={() => <Data posts={posts}/>}/>
              <Route path='/gaming/hot' render={() => <Data posts={posts}/>}/>
              <Route path='/worldnews/new' render={() => <Data posts={posts}/>}/>
              <Route path='/politics/new' render={() => <Data posts={posts}/>}/>
              <Route path='/technology/new' render={() => <Data posts={posts}/>}/>
              <Route path='/movies/new' render={() => <Data posts={posts}/>}/>
              <Route path='/gaming/new' render={() => <Data posts={posts}/>}/>
              <Route path='/worldnews/controversial' render={() => <Data posts={posts}/>}/>
              <Route path='/politics/controversial' render={() => <Data posts={posts}/>}/>
              <Route path='/technology/controversial' render={() => <Data posts={posts}/>}/>
              <Route path='/movies/controversial' render={() => <Data posts={posts}/>}/>
              <Route path='/gaming/controversial' render={() => <Data posts={posts}/>}/>
              <Route path='/search' render={() => <Data posts={posts}/>}/>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  console.log("from mapstateprops"+ JSON.stringify(state));
    const { selectedSubreddit, postsBySubreddit } = state
    const { isFetching, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }

    return {
        selectedSubreddit,
        posts,
        isFetching
    }
}

export default connect(mapStateToProps)(Main)
