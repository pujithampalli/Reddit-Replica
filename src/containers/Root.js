import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import Main from './Main.js'

// Configure redux store
const store = configureStore()

// Base of the app
export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}
