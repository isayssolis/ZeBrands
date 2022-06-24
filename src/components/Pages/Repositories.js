import React, {useContext, useEffect, useMemo, useState} from "react";
import {getAllRepos} from "../Services";
import {Link, useParams} from "react-router-dom";
import Table from "../Generic/Table";
import {UserValuesContext} from "../../context/UserContext";

const Repositories = () => {
    let { user } = useParams();
    const [repos, setRepos] = useState([]);
    const [axiosError, setAxiosError] = useState(null);
    const [context, setContext] = useContext(UserValuesContext);

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
                        Header: 'ID',
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
                        <div className="card-header bg-zebrands">
                            <div className="row">
                                <div className='col'>
                                    <h4 className="d-inline-block float-star my-title text-light mt-1">GitHub repositories</h4>
                                    <Link to='/users' className="btn btn-sm btn-primary text-uppercase float-end" type="button">
                                        <i className="fa-solid fa-angle-left"> </i> Back
                                    </Link>
                                </div>
                                <div className="col-12 text-center mt-2">
                                    <img src={context.avatar}
                                         className='rounded-circle imgShadow'
                                         width={90} alt="user avatar"/>
                                    <hr className='text-light'/>
                                    <h5 className='text-capitalize text-light' >{user}</h5>
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