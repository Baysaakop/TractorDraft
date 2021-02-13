import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './layout/Home';
import Login from './user/Login';
import Signup from './user/Signup';
import Profile from './user/Profile';
import ItemList from './item/ItemList';
import ItemDetail from './item/ItemDetail';
import ItemCreate from './item/ItemCreate';
import ItemUpdate from './item/ItemUpdate';
import ProfileEdit from './user/ProfileEdit';
import SeasonList from './season/SeasonList';
import ManagerList from './manager/ManagerList';
import ManagerDetail from './manager/ManagerDetail';
import StatsList from './stats/StatsList';
import DuelCompare from './duel/DuelCompare';
import Season19 from './season/Season19';
import SeasonCreate from './season/SeasonCreate';
import Logout from './user/Logout';
import GameweekUpdate from './duel/GameweekUpdate';
import Blogs from './blog/Blogs';
import BlogDetail from './blog/BlogDetail';
import BlogCreate from './blog/BlogCreate';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            {/* Item urls */}
            <Route exact path="/items" component={ItemList} />
            <Route exact path="/items/:itemID" component={ItemDetail} />
            <Route exact path="/newitem" component={ItemCreate} />
            <Route exact path="/updateitem/:itemID" component={ItemUpdate} />
            {/* User urls */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/editprofile" component={ProfileEdit} />
            {/* Pages */}
            {/* Seasons */}
            <Route exact path="/seasons" component={SeasonList} />
            <Route exact path="/season19" component={Season19} />
            <Route exact path="/newseason" component={SeasonCreate} />
            <Route exact path="/updategameweek/:weekID" component={GameweekUpdate} />
            {/* Managers */}
            <Route exact path="/managers" component={ManagerList} />
            <Route exact path="/managers/:itemID" component={ManagerDetail} />
            <Route exact path="/compare" component={DuelCompare} />
            {/* Stats */}
            <Route exact path="/stats" component={StatsList} />                        
            {/* Blog */}
            <Route exact path="/posts" component={Blogs} />
            <Route exact path="/posts/:postID" component={BlogDetail} />
            <Route exact path="/newpost" component={BlogCreate} />
        </Switch>
    )    
}
export default BaseRouter;