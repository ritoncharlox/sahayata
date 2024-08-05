import React, { useState, useRef, useEffect } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { getUsers, deleteUser, makeUserAdmin } from '@/actions/Users'; // Import new functions
import { useDebounce } from '@/hooks/useDebounce'; // Adjust import path as necessary
import './Users.css';
import { MoonLoader } from 'react-spinners';
import { BsThreeDots } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';

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
  const [actionInfo, setActionInfo] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

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
      cell: ({ row }) => {
        const { name, avatar } = row.original;
        return (
          <div className="name-with-avatar">
            {
              avatar ? (
                <Image className="profile-avatar-image" width={40} height={40} src={avatar} alt="User Avatar" />
              ) : (
                <div className="profile-avatar-image-alt">
                  <FaUserCircle />
                </div>
              )
            }
            <span className="user-name">{name}</span>
          </div>
        );
      },
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

    if (actionLoading) {
      return;
    }

    setActionLoading(true);

    const makeAdmin = await makeUserAdmin(id);

    if (makeAdmin.success) {
      setActionInfo(`User made admin successfully`);

      setTimeout(async () => {
        setActionLoading(false);
        await fetchUsers();
        setActionInfo('');
      }, 2000);

      return;
    }

    if (makeAdmin.error) {
      setActionError("Something went wrong, please try again after a while");

      setTimeout(() => {
        setActionLoading(false);
        setActionError('')
      }, 2000);

      return;
    }

    if (makeAdmin.actionError) {
      setActionError(makeAdmin.actionError);

      setTimeout(() => {
        setActionLoading(false);
        setActionError('');
      }, 2000);

      return;
    }

    setActionLoading(false);
    setShowPopup(false);

  };

  const handleDeleteUser = async (id) => {

    if (actionLoading) {
      return;
    }

    setActionLoading(true);

    const deleteAction = await deleteUser(id);

    if (deleteAction.success) {
      setActionInfo(`User deleted successfully`);

      setTimeout(async () => {
        setActionLoading(false);
        await fetchUsers();
        setActionInfo('')
      }, 2000);

      return;
    }

    if (deleteAction.error) {
      setActionError("Something went wrong, please try again after a while");

      setTimeout(() => {
        setActionLoading(false);
        setActionError('');
      }, 2000);

      return;
    }

    if (deleteAction.actionError) {
      setActionError(deleteAction.actionError);

      setTimeout(() => {
        setActionLoading(false);
        setActionError('');
      }, 2000);

      return;
    }

    setActionLoading(false);
    setShowPopup(false);

  };

  const actionLoadingCloseHandler = () => {
    setActionLoading(false);
    setActionInfo('');
    setActionError('');
  }

  const handleContainerClick = (e) => {
    if (e.target.classList.contains('action-loading')) {
      setActionLoading(false);
      setActionInfo('');
      setActionError('');
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
      {
        actionLoading ?
          <div className="action-loading" onClick={handleContainerClick}>
            <div className="action-loading-content">
              <>
                {
                  actionInfo ? (
                    <>
                      <div className="main-icon info">
                        <FaCheckCircle />
                      </div>
                      <div className="info-field">
                        <div className="icon">
                          <FaCheckCircle />
                        </div>
                        <div className="text">
                          {actionInfo}
                        </div>
                      </div>
                      <button className="action-loading-content-button" onClick={actionLoadingCloseHandler}>OK</button>
                    </>
                  ) : (
                    <>
                      {
                        actionError ? (
                          <>
                            <div className="main-icon error">
                              <MdError />
                            </div>
                            <div className="error-field">
                              <div className="icon">
                                <MdError />
                              </div>
                              <div className="text">
                                {actionError}
                              </div>
                            </div>
                            <button className="action-loading-content-button" onClick={actionLoadingCloseHandler}>OK</button>
                          </>
                        ) : (
                          <>
                            <MoonLoader className='loading-icon' size={100} color='var(--theme-color)' />
                          </>
                        )
                      }
                    </>
                  )
                }
              </>
            </div>
          </div>
          :
          <>
          </>
      }
    </div>
  );
};

export default Users;
