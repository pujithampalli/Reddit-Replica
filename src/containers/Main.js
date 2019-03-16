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
import Posts from '../containers/Posts'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          menu: '/best',
          term: '',
          selectedSort: '',
          theme:'light'
        }


        this.handleMenuChange = this.handleMenuChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTheme = this.handleTheme.bind(this);

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
        const { dispatch } = this.props
        if((localStorage.getItem('subreddit')) && (localStorage.getItem('sort'))){
          var selectedSubreddit = localStorage.getItem('subreddit');
          this.props.dispatch(selectSubreddit(selectedSubreddit))
          this.props.dispatch(selectSort(sort))
          var sort = localStorage.getItem('sort');
          this.setState({selectedSort: sort});
          if(sort=="" && localStorage.getItem('sort')){
            sort = 'best'
          }
          if(localStorage.getItem('theme') && localStorage.getItem('theme')=='dark'){
            this.handleTheme(4.2);
          }
        }
        else {
          var { selectedSubreddit } = this.props
          var sort = ''
          if(localStorage.getItem('theme') && localStorage.getItem('theme')=='dark'){
            this.handleTheme(4.2);
          }
        }
        this.props.dispatch(selectSubreddit(selectedSubreddit))
        this.props.dispatch(selectSort(sort))

        dispatch(fetchPostsIfNeeded(selectedSubreddit,sort))

    }

    componentDidUpdate(){
      const { dispatch, selectedSubreddit } = this.props
      window.onpopstate  = (e) => {
        window.location.reload();
      }
      localStorage.setItem('subreddit', selectedSubreddit);
      localStorage.setItem('sort', this.state.selectedSort);
      localStorage.setItem('theme', this.state.theme);
    }

    componentWillUnmount(){
      const { dispatch, selectedSubreddit } = this.props
      localStorage.setItem('subreddit', selectedSubreddit);
      localStorage.setItem('sort', this.state.selectedSort);
    }

    handleMenuChange(subreddit,sort) {
        const sub = subreddit.replace(/ /g, '')
        this.setState({selectedSort: sort})
        this.props.dispatch(selectSubreddit(sub))
        this.props.dispatch(selectSort(sort))
        this.props.dispatch(fetchPostsIfNeeded(sub,sort))
    }

    handleInputChange (term) {
      const { dispatch } = this.props
      this.setState({ term });
      if(term != ""){
        this.props.dispatch(selectSubreddit('search'))
        this.recvPosts = dispatch(searchPosts(term))
      }
      else{
        this.props.dispatch(selectSubreddit('best'))
        this.recvPosts = dispatch(fetchPostsIfNeeded('best'))
      }

  }
  handleTheme(eventKey){
    if(eventKey == 4.1){
      //light
      var backg = document.getElementById("body-data");
      backg.className = "body-data";
      this.setState({theme: 'light'})


    }
    else if(eventKey == 4.2){
      //dark
      var backg = document.getElementById("body-data");
      backg.className = "body-data-dark";
      this.setState({theme: 'dark'})
    }

  }

    render() {
        const { selectedSubreddit, posts } = this.props

        return (
            <div id="body-data" className="body-data">
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
                  <NavDropdown eventKey={3} title="Sort By" id="basic-sort-dropdown">
                    <MenuItem eventKey={3.1} onSelect={this.handleSort}><Link to={this.state.menu+"/hot"}>Hot</Link></MenuItem>
                    <MenuItem eventKey={3.2} onSelect={this.handleSort}><Link to={this.state.menu+"/new"}>New</Link></MenuItem>
                    <MenuItem eventKey={3.3} onSelect={this.handleSort}><Link to={this.state.menu+"/controversial"}>Controversial</Link></MenuItem>
                  </NavDropdown>
                  <NavDropdown eventKey={4} title="Change Theme" id="basic-theme-dropdown">
                    <MenuItem eventKey={4.1} onSelect={this.handleTheme}>Light Theme Mode</MenuItem>
                    <MenuItem eventKey={4.2} onSelect={this.handleTheme}>Dark Theme Mode</MenuItem>
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
    const { selectedSubreddit, postsBySubreddit } = state;
    if(selectedSubreddit == "search"){
      var { isFetching, items: posts } = postsBySubreddit['undefined'] || { isFetching: true, items: [] }
    }
    else{
      var { isFetching, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }
    }

    return {
        selectedSubreddit,
        posts,
        isFetching
    }
}

export default connect(mapStateToProps)(Main)
