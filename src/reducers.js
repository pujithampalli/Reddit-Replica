import {
    SELECT_SUBREDDIT,
    SELECT_SORT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SEARCH_POSTS
} from './constants'

import { combineReducers } from 'redux'

// Reducer handling the currently selected subreddit
const selectedSubreddit = (state = 'best', action) => {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}

const selectedSort = (state = 'best', action) => {
    switch (action.type) {
        case SELECT_SORT:
            return action.sort
        default:
            return state
    }
}

// Helper function for handling posts
const posts = (
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return { ...state,
                didInvalidate: true
            }
        case REQUEST_POSTS:
            return { ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_POSTS:
            return { ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        case SEARCH_POSTS:
            return { ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state

    }
}

// Reducer handling posts by subreddit
const postsBySubreddit = (
    state = {},
    action
) => {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case SEARCH_POSTS:
        return { ...state,
            [action.subreddit]: posts(state[action.subreddit], action)
        }
        case REQUEST_POSTS:
            return { ...state,
                [action.subreddit]: posts(state[action.subreddit], action)
            }
        default:
            return state
    }
}

// Combine reducers
const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
})

export default rootReducer
