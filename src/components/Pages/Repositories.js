import React, {useEffect, useMemo, useState} from "react";
import {getAllRepos} from "../Services";
import {Link, useParams} from "react-router-dom";
import Table from "../Generic/Table";

const Repositories = () => {
    let { user } = useParams();
    const [repos, setRepos] = useState([]);
    const [axiosError, setAxiosError] = useState(null);

    useEffect(() => {
        if(user){
            setAxiosError(null)
            getAllRepos(user).then((resp)=>{
                setRepos(resp.data);
            }).catch((e)=>{
                setAxiosError(e.message)
                console.log(e.message)
            })
        }else{
            setAxiosError('Error. please try again.')
        }

    }, [user]);

    //Define columns values
    const columns = useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: 'Repository ID',
                        accessor: 'id',
                    },
                    {
                        Header: 'Name',
                        accessor: null,
                        Cell: tableProps => (
                            <span>{tableProps.row.original.name}</span>
                        )
                    },
                    {
                        Header: 'Check on GitHub',
                        accessor: 'name',
                        Cell: tableProps => (
                            <a target="_blank" href={tableProps.row.original.html_url} >
                                <i className="fa-solid fa-link"> </i>  {tableProps.row.original.name}
                            </a>
                        )
                    },
                ],
            }
        ],
        []
    )

    const renderTable = () => {
        if(axiosError){
            return <div className="alert alert-danger" role="alert">Something went wrong, please try again!</div>
        }
        if(repos.length > 0){
            return <Table columns={columns} data={repos} />
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
                        <div className="card-header">
                            <div className="row">
                                <div className='col'>
                                    <p className='my-title'>GitHub repositories for user: <b className='text-capitalize'>{user} </b></p>
                                </div>
                                <div className='col'>
                                    <div className="d-grid d-md-flex justify-content-md-end">
                                        <Link to='/users' className="btn btn-sm btn-primary text-uppercase" type="button">
                                            <i className="fa-solid fa-angle-left"> </i> Go back to users
                                        </Link>
                                    </div>
                                </div>
                            </div>
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


export default Repositories;