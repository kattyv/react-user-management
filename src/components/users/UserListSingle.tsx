import React from 'react'
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../../assets/img/avatar-placeholder.png'
import { User } from '../../interfaces/User'
import { useAppDispatch } from '../../hooks/useReduxTyped';
import { deleteUser } from '../../features/Users';

export const UserListSingle = (props: User) => {
  const user = props;

  const dispatch = useAppDispatch();

  return (
    <tr>
      <td>
        <img src={user.imgURL ? user.imgURL : avatarPlaceholder} alt='' className="avatar" />
      </td>
            
      <td>
        { user?.name + " " + user?.surname }
      </td>

      <td>
        { user?.email } 
      </td>

      <td>
        { user?.phone ? user?.phone : "N/A" } 
      </td>

      <td>
        { user.role }
      </td>

      <td>
        { user.isActive ? 'Active' : 'Blocked' }
      </td>

      <td className='a-right'>
        <Link to={`/users/${user.id}`}
          className='btn btn-icon'
          >
            <i className="icon icon-edit"></i>
          </Link>
          
          <button 
            onClick={() => { dispatch(deleteUser({id: user.id})) }}
            className="btn btn-icon"
          >
            <i className="icon icon-delete"></i>
          </button>
      </td>
    </tr>        
  )
}