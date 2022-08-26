import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

const Routes: React.FunctionComponent = () => (
    <Router>
        <Switch>
            <Route path="/" component={Dashboard} key="dashboard" />
        </Switch>
    </Router>
)

export default Routes;