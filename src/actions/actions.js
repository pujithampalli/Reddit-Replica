import {
    SELECT_SUBREDDIT,
    SELECT_SORT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SEARCH_POSTS
} from '../constants'

// Import fetch API in case of browser compatiblity issues
import fetch from 'cross-fetch'

// Action creators for all functionality
// Basically wraps up type and subreddit selected into an object

export const selectSubreddit = (subreddit) => (
    {
        type: SELECT_SUBREDDIT,
        subreddit
    }
)

export const selectSort = (sort) => (
    {
        type: SELECT_SORT,
        sort
    }
)

export const invalidateSubreddit = (subreddit) => (
    {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
)

const requestPosts = (subreddit, sort) => (
    {
        type: REQUEST_POSTS,
        subreddit,
        sort
    }
)

const recievePosts = (subreddit, sort, json) => (
    {
        type: RECEIVE_POSTS,
        subreddit,
        sort,
        posts: json.data.children.map(child => child.data),
        recievedAt: Date.now()
    }
)

const recieveSearchPosts = (term, json) => (
    {
        type: SEARCH_POSTS,
        term,
        posts: json.data.children.map(child => child.data),
        recievedAt: Date.now()
    }
)

// Helper function to fetch JSON data from Reddit API
const fetchPosts = (subreddit,sort) => {
  if(sort==undefined){
    var subredditsort = subreddit;
  }
  else{
    var subredditsort = subreddit+sort;
  }
    return (dispatch) => {
        // Dispatch requestPosts action just before attempting to fetching data
        dispatch(requestPosts(subreddit, sort))

        // Fetch data and dispatch recievePosts if no errors
        // Catch shouldn't be used to handle errors as

          return fetch(`https://www.reddit.com/${subredditsort}.json`)
          .then(
              response => response.json(),
              error => console.log('An error occured', error)
          )
          .then(
              json => dispatch(recievePosts(subreddit, sort, json))
          )
        }
}

export const searchPosts = (term) => {
    if(term==undefined || ""){
      var term = "pol";
    }

      return (dispatch) => {

            return fetch(`https://www.reddit.com/subreddits/search.json?q=${term}`)
            .then(
                response => response.json(),
                error => console.log('An error occured', error)
            )
            .then(
                json => dispatch(recieveSearchPosts(term, json))
            )
          }
  }

const shouldFetchPosts = (state, subreddit, sort) => {
  if(sort == undefined){
    sort = "best";
  }
    // Get posts by subreddit from state
    const posts = state.postsBySubreddit[subreddit+sort]

    // Should fetch posts if no posts exists and not fetching already
    // If posts exists and not fetching then depends on if posts have invalidated
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export const fetchPostsIfNeeded = (subreddit,sort) => {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit, sort)) {
            return dispatch(fetchPosts(subreddit,sort))
        }
    }
}
