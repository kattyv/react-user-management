import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useReduxTyped';
import { UserListSingle } from './UserListSingle';

export const UserList: FC = () => {
  //const users = useSelector((state: RootState) => state.users.value);
  const users = useAppSelector((state) => state.users.value);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <header className='pg-title'>
        <div className="inline-group">
          <h1>Users</h1>
          <Link to="/users/new" className='btn btn-round' title='Add New User'>
            <i className="icon icon-add-user"></i>
          </Link>
        </div>
        
        <div className="form-group">
          <input 
            type="text" 
            placeholder='Search by name...' 
            onChange={(e) => {setSearchText(e.target.value)}}
          />

          {searchText === "" 
            ? (
              <button className='btn' onClick={ () => window.alert('Not working') }>
                <i className="icon icon-search"></i>
              </button>
            )
            : (
              <button className='btn' onClick={ () => window.alert('Not working') }>
                <i className="icon icon-close"></i>
              </button>
            )
          }
        </div>
      </header>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
        {!users || users.length === 0 
          ? (
            <tr>
              <td colSpan={7}>
                <p>No users in the list.</p> 
                <Link to='/users/new' className='btn'>Add user</Link>
              </td>
            </tr>
          )
          : (
            users?.map(user => (
              <UserListSingle 
                key={user.id} 
               {...user}
              />
            ))
          )
        }  
        </tbody>
      </table>

    </>
  )
}
