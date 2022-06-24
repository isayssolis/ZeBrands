import React from "react";
import Nav from "./components/Navigation/Nav";
import Dashboard from "./components/Pages/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Users from "./components/Pages/Users";
import Repositories from "./components/Pages/Repositories";
import NotFound from "./components/Pages/NotFound";

export default  () => {
    return (
        <Router>
            <>
                <Nav></Nav>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/repositories/:user" element={<Repositories />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </>
        </Router>
    );
}