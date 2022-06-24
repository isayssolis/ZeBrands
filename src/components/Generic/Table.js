import React from 'react'
import { useTable, usePagination } from 'react-table'
// Use react-table library
const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )
    // Render the Table
    return (
        <>
            <div className='table-responsive'>
                <table className='table table-striped table-hover' {...getTableProps()}>
                    <thead className='dark'>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th style={{padding: '0 .5rem', borderWidth: '0'}} {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr style={{verticalAlign: 'middle'}} {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <button className='btn btn-sm btn-primary'onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <i className="fa-solid fa-angles-left"> </i>
                    </button>{' '}
                    <button className='btn btn-sm btn-primary' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className="fa-solid fa-angle-left"> </i>
                    </button>{' '}
                    <button className='btn btn-sm btn-primary' onClick={() => nextPage()} disabled={!canNextPage}>
                        <i className="fa-solid fa-angle-right"> </i>
                    </button>{' '}
                    <button className='btn btn-sm btn-primary' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <i className="fa-solid fa-angles-right"> </i>
                    </button>{' '}
                </div>
                <div className="col-sm-2 col-lg-4">
                    <p className='mt-2'>
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </p>
                </div>
                <div className="col-sm-3">
                    <select
                        className='form-select'
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default Table