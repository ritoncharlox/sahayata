// app/users/page.js
import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { getUsers } from '@/actions/Users';
import './Users.css';

const Users = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchData = async (pageIndex, pageSize) => {
        setLoading(true);
        const { users, totalUsers } = await getUsers(pageIndex + 1, pageSize);
        setData(users);
        setPageCount(Math.ceil(totalUsers / pageSize));
        setLoading(false);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Role',
                accessor: (row) => row.isAdmin ? 'Admin' : row.isFreelancer ? 'Freelancer' : 'User',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        gotoPage,
        nextPage,
        previousPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex, pageSize },
            manualPagination: true,
            pageCount: pageCount,
            autoResetPage: false,
        },
        usePagination
    );

    useEffect(() => {
        fetchData(pageIndex, pageSize);
    }, [pageIndex, pageSize]);

    return (
        <div className="users">
            <h1>Users</h1>
            <p>Manage users here.</p>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} key={column.id}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length}>Loading...</td>
                        </tr>
                    ) : (
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.original.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <span>
                    Page {pageIndex + 1} of {pageCount}
                </span>
            </div>
        </div>
    );
};

export default Users;
