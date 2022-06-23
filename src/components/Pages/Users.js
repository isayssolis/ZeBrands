import React,{useMemo, useState, useEffect}from "react";
import Table from "../Generic/Table";
import {getAllUsers} from "../Services";

const Users = () => {
    //Set state for users array or axios error
    const [users, setUsers] = useState([]);
    const [axiosError, setAxiosError] = useState('');
    //API call set Users or catch error
    useEffect(() => {
        getAllUsers().then((resp)=>{
            setUsers(resp.data)
        }).catch((e)=>{
            setAxiosError(e.message)
        })
    }, []);

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
                    },
                    {
                        Header: 'GitHub Profile',
                        accessor: 'html_url',
                        Cell: tableProps => (
                            <a target='_blank' href={tableProps.row.original.html_url}>
                                <i className="fa-solid fa-up-right-from-square"> </i>
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
        if(users){
            return <Table columns={columns} data={users} />
        }
        else return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    return(
        <div className="container mt-5 fade-in">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            GitHub Users
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