import React, { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { getUsers } from '@/actions/Users'; // Adjust import path as necessary
import './Users.css';

const Users = () => {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const result = await getUsers(pageIndex + 1, pageSize);
        setData(result.users);
        setTotalUsers(result.totalUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUsers();
  }, [pageIndex, pageSize]);

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
      header: 'Date Joined', // Updated header
      accessorKey: 'dateJoined', // Updated accessorKey
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

  return (
    <div>
      <h1>Users</h1>
      <p>Manage users here.</p>
      {loading ? (
        <div className="loading">Loading...</div> // Loading indicator
      ) : (
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
      )}
      <div className="pagination-controls">
        <button
          onClick={() => table.setPageIndex(prev => Math.max(prev - 1, 0))}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.setPageIndex(prev => Math.min(prev + 1, table.getPageCount() - 1))}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;