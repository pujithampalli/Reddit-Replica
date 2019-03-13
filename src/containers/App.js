import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    selectSubreddit,
    selectSort,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from '../actions/actions'

import Header from '../components/Header'
import Posts from '../containers/Posts'


class App extends Component {
    constructor(props) {
        super(props)

        this.handleMenuChange = this.handleMenuChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)

        if (window.performance) {
        if (performance.navigation.type == 1) {
          this.handleRefreshClick();
        }
      }
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    componentDidUpdate(){
      const { dispatch, selectedSubreddit } = this.props
      console.log('selected subreddit: '+selectedSubreddit);
      window.onpopstate  = (e) => {
        window.location.reload();
      }
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

    render() {
        const { selectedSubreddit, posts, isFetching } = this.props

        return (
            <div>
                <Header selectedSub={selectedSubreddit}
                    handleMenuChange={this.handleMenuChange}
                    handleRefreshClick={this.handleRefreshClick}
                    />
                {posts.length > 0 &&
                    <Posts posts={posts} />
                }
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

export default connect(mapStateToProps)(App)
