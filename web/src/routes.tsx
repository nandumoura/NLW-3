import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/app"exact component={OrphanagesMap}></Route>

                <Route path="/orphanages/create"exact component={CreateOrphanage}></Route>
                <Route path="/orphanages/:id"exact component={Orphanage}></Route>

            </Switch>

        </BrowserRouter>
    );
}

export default Routes;