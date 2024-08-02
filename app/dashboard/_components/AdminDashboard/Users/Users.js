import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { getUsers } from '@/actions/Users'; // Adjust import path as necessary
import './Users.css';
import { MoonLoader } from 'react-spinners';

const Users = () => {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await getUsers(pageIndex + 1, pageSize, searchQuery, sortOrder);
        setData(result.users);
        setTotalUsers(result.totalUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageIndex, pageSize, searchQuery, sortOrder]);

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Location',
      accessorKey: 'location',
    },
    {
      header: 'Date Joined',
      accessorKey: 'dateJoined',
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(totalUsers / pageSize),
  });

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < table.getPageCount() - 1;

  return (
    <div className="users-container">
      <h1>Users</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-select"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      {loading ? (
        <div className="loading">
          <MoonLoader size={100} color='var(--theme-color)' />
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-users">No users found</div>
          )}
          {data.length > 0 && (
            <div className="pagination-wrapper">
              <div className="pagination-controls">
                <button
                  onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <span>
                  Page {pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                  onClick={() => setPageIndex(prev => Math.min(prev + 1, table.getPageCount() - 1))}
                  disabled={!canNextPage}
                >
                  Next
                </button>
              </div>
              <div className="user-count">
                {`Showing ${data.length} users out of ${totalUsers}`}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
