import React from "react";
import Nav from "./components/Navigation/Nav";
import Dashboard from "./components/Pages/Dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Users from "./components/Pages/Users";
import Repositories from "./components/Pages/Repositories";

export default  () => {
    return (
        <Router>
            <>
                <Nav></Nav>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/repositories" element={<Repositories />} />
                </Routes>
            </>
        </Router>
    );
}