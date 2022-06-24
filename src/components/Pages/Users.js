import React,{useMemo, useState, useEffect, useContext}from "react";
import Table from "../Generic/Table";
import {getAllUsers} from "../Services";
import {UserValuesContext} from "../../context/UserContext";
import {useNavigate} from "react-router-dom";

const Users = () => {
    //Set state for users array or axios error
    const [users, setUsers] = useState([]);
    const [axiosError, setAxiosError] = useState(null);
    const [context, setContext] = useContext(UserValuesContext);
    const navigate = useNavigate();
    //API call set Users or catch error
    useEffect(() => {
        getAllUsers().then((resp)=>{
            setUsers(resp.data)
        }).catch((e)=>{
            setAxiosError(e.message)
            console.log(e.message)
        })
    }, []);

    //Check Repo. from user and pass profile image ref.
    const handleCheckRepos = (avatar, name) => {
        setContext({avatar, name});
        navigate(`/repositories/${name}`);
    }

    //Define columns values
    const columns = useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'ID',
                        accessor: 'id',
                    },
                    {
                        Header: 'Avatar',
                        accessor: 'avatar_url',
                        Cell: tableProps => (
                            <img
                                src={tableProps.row.original.avatar_url}
                                className='rounded-circle imgShadow'
                                width={60}
                                alt='avatar'
                            />
                        )
                    },
                    {
                        Header: 'User Login',
                        accessor: 'login',
                        Cell: tableProps => (
                            <span className='text-capitalize' >{tableProps.row.original.login}</span>
                        )
                    },
                    {
                        Header: 'Repositories',
                        accessor: null,
                        Cell: tableProps => (
                            <a href='#' onClick={
                                ()=>handleCheckRepos(tableProps.row.original.avatar_url, tableProps.row.original.login)}>
                                Repositories <i className="fa-solid fa-up-right-from-square"> </i>
                            </a>
                        )
                    },
                ],
            }
        ],
        []
    )

    //Method/Function to Render table, spinner or error alert.
    const renderTable = () => {
        if(axiosError){
            return <div className="alert alert-danger" role="alert">Something went wrong, please try again!</div>
        }
        if(users.length > 0){
            return <Table columns={columns} data={users} />
        }
        else return (
            <div className='text-center'>
                <div className="spinner-border text-primary" role="status"> </div>
                <br/>
                <span><small>Loading...</small></span>
            </div>
        )
    }

    return(
        <div className="container mt-5 fade-in">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header bg-zebrands">
                            <p className='my-title text-light'>GitHub Users</p>
                        </div>
                        <div className="card-body">
                            {renderTable()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Users;