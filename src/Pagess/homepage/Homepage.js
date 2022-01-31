import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserProfile from './UserProfile';

const homepage = ({login,setLogin}) => {
    return <div>
        <Router>
            <Navbar login={login} setLogin={setLogin} />
            <Switch>
                <Route path='/userProfile' component={UserProfile} />
            </Switch>
        </Router>
    </div>;
};

export default homepage;
