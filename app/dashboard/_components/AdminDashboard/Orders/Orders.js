import React, { useState, useRef, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { getUsers, deleteUser, makeUserAdmin } from '@/actions/Users'; // Import new functions
import { useDebounce } from '@/hooks/useDebounce'; // Adjust import path as necessary
import './Orders.css';
import { MoonLoader } from 'react-spinners';
import { BsThreeDots } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Users = () => {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order
  const [roleFilter, setRoleFilter] = useState(''); // Role filter state
  const [selectedUser, setSelectedUser] = useState(null); // For selected user in the popup
  const [showPopup, setShowPopup] = useState(false); // To control the visibility of the popup
  const popupRef = useRef(null);

  // Debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await getUsers(pageIndex + 1, pageSize, debouncedSearchQuery, sortOrder, roleFilter);
      setData(result.users);
      setTotalUsers(result.totalUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageIndex, pageSize, debouncedSearchQuery, sortOrder, roleFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      cell: ({ row }) => {
        const { email, isEmailVerified } = row.original;
        return email ? (
          <span className={isEmailVerified ? 'status-verified' : 'status-not-verified'}>
            {email} {isEmailVerified ? '(Verified)' : '(Not Verified)'}
          </span>
        ) : (
          <span className="status-not-set">Not Set</span>
        );
      },
    },
    {
      header: 'Role',
      cell: ({ row }) => {
        const { isAdmin, isFreelancer, isUser } = row.original;
        return isAdmin ? 'Admin' : isFreelancer ? 'Freelancer' : 'User';
      },
    },
    {
      header: 'Number',
      cell: ({ row }) => {
        const { number, isNumberVerified } = row.original;
        return number ? (
          <span className={isNumberVerified ? 'status-verified' : 'status-not-verified'}>
            {number} {isNumberVerified ? '(Verified)' : '(Not Verified)'}
          </span>
        ) : (
          <span className="status-not-set">Not Set</span>
        );
      },
    },
    {
      header: 'Location',
      cell: ({ row }) => {
        const { location, isEmailVerified, isNumberVerified } = row.original;
        if (location) {
          return (
            <span className={isEmailVerified && isNumberVerified ? 'status-verified' : 'status-not-set'}>
              {location} {isEmailVerified && isNumberVerified ? '(Verified)' : ''}
            </span>
          );
        }
        return <span className="status-not-set">Not Set</span>;
      },
    },
    {
      header: 'Date Joined',
      accessorKey: 'dateJoined',
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => {

        const { isAdmin, isFreelancer, isUser } = row.original;

        return (
          <>
            <button
              className="action-button"
              onClick={() => {
                setSelectedUser(row.original); // Set the user for actions
                setShowPopup(true); // Show the popup
              }}
            >
              <BsThreeDots />
            </button>
            {
              showPopup ?
                <>
                  {
                    selectedUser.id === row.original.id ?
                      <div className="action-popup" ref={popupRef}>
                        <button className='action-popup-item' onClick={() => handleMakeAdmin(row.original.id)}>
                          <div className="icon">
                            <MdAdminPanelSettings />
                          </div>
                          <div className="text">
                            Make Admin
                          </div>
                        </button>
                        <button className='action-popup-item delete-button' onClick={() => handleDeleteUser(row.original.id)}>
                          <div className="icon">
                            <MdDelete />
                          </div>
                          <div className="text">
                            Delete User
                          </div>
                        </button>
                      </div>
                      :
                      <></>
                  }
                </>
                :
                <></>
            }
          </>
        )
      },
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

  const handleMakeAdmin = async (id) => {
    try {
      await makeUserAdmin(id);
      await fetchUsers();
    } catch (error) {
      console.error('Error making user admin:', error);
    } finally {
      setShowPopup(false);
    }
  };

  const handleDeleteUser = async (id) => {

    try {
      await deleteUser(id);
      setShowPopup(false);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-select"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Freelancer">Freelancer</option>
          <option value="User">User</option>
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
                        <td key={cell.id} className={cell.column.id === 'actions' ? 'action' : ''}>
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
