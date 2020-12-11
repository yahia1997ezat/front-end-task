import React, {useEffect} from 'react'
import {Loader} from './Helpers/Loader';
import {Suspense} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Provider, rootStore} from "./models/RootStore";
import {connectReduxDevtools} from "mst-middlewares";
import remotedev from "remotedev";
import makeInspectable from "mobx-devtools-mst";
import AddBook from "./Commands/AddBook";
import DeleteBook from "./Commands/DeleteBook";
import Books from "./Books";

connectReduxDevtools(remotedev, rootStore)

makeInspectable(rootStore);
export default function App() {
    return (
        <Provider value={rootStore}>
            <Suspense fallback={<Loader/>}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12">
                            <Router>
                                <Switch>

                                    <Route path={`/add-book/:id`}>
                                        <AddBook/>
                                    </Route>
                                    <Route path={`/add-book/`}>
                                        <AddBook/>
                                    </Route>
                                    <Route path={`/delete-book/:id`}>
                                        <DeleteBook/>
                                    </Route>

                                    <Books/>

                                </Switch>

                            </Router>
                        </div>
                    </div>
                </div>
            </Suspense>
        </Provider>
    );
}