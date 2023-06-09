/**
 * External dependencies
 */
import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";

/**
 * Internal dependencies
 */
import Header from "./components/layout/Header";
import routes from "./routes";
import "./hooks";

const App = () => {
    return (
        <HashRouter>
            <Header />
            <div>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.element />}
                        />
                    ))}
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;
