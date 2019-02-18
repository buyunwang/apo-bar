import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Court from './components/court';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Brewery from './components/brewery';
import Winery from './components/winery';
import { Provider } from 'react-redux';
import configureStore from './_store/configureStore';


const store = configureStore();

const routing =(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Court} />
                <Route path="/winery" component={Winery} />
                <Route path="/brewery" component={Brewery} />
                <Route component={Court} />
            </Switch>
        </Router>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));


