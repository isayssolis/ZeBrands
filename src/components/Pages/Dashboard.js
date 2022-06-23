import React from "react";
import {Link} from 'react-router-dom';
import {styleLink} from "../../css/Dashboard.style";

const Dashboard = () => {
    return(
        <div className="container mt-5 fade-in">
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header text-center">
                            <h4>Welcome</h4>
                        </div>
                        <div className="card-body">
                            <Link to="/users" style={styleLink}>
                                <i className="fa-solid fa-link"> </i> Search for users
                            </Link>
                            <hr/>
                            <Link to="/repositories" style={styleLink}>
                                <i className="fa-solid fa-link"> </i> Search for repositories
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Dashboard;