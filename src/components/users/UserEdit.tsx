import React, { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { User, UserRole } from '../../interfaces/User';
import placeholderAvatar from '../../assets/img/avatar-placeholder.png'
import iconBack from '../../assets/img/icons/icon-arrow-left.svg'
import iconDelete from '../../assets/img/icons/icon-delete.svg'
import iconEdit from '../../assets/img/icons/icon-edit.svg'
import addImg from '../../assets/img/icons/icon-add-img.svg'
import { useAppSelector } from '../../hooks/useReduxTyped';
import { useAppDispatch } from '../../hooks/useReduxTyped';
import { updateUser, deleteUser } from '../../features/Users';

export const UserEdit: FC = () => {
  const users = useAppSelector((state) => state.users.value);
  const permissions = useAppSelector((state) => state.permissions.value);

  const { id } = useParams();
  const userID: number = Number(id);
  const user: User | undefined = users.find(item => item.id === userID);

  const userPermissions = permissions.map(el => ({...el, isOn: (user?.permissions.includes(el.id))}));

  const dispatch = useAppDispatch();

  return (
    <div>
      {!user
        ? (
          <>
            <header className='pg-title'>
                <div className='inline-group'>
                  <Link to="/users" className='btn btn-round'>
                    <img src={iconBack} alt="Back to users list" className='icon' />
                  </Link>
                
                  <h1>User not found</h1>
                </div> 
            </header>
            
            <p>It looks like that such user does not exist.</p>

            <p>What you want to do now:</p>
            <ul role="list">
              <li><Link to='/users/'>View all users</Link></li>
              <li><Link to='/users/new'>Add new user</Link></li>
            </ul>

          </>
        )
        : (
          <>
            <header className='pg-title'>
              <div className='inline-group'>
                <Link to="/users" className='btn btn-round'>
                  <img src={iconBack} alt="Back to users list" className='icon' />
                </Link>
              
                <h1>
                  {`${ user.name } ${ user.surname }`}
                  <span className={`pill ${user.isActive ? 'on' : 'off'}`}>
                    {user.isActive ? 'Active' : 'Blocked'}
                  </span>
                </h1>
              </div> 
            </header>

            <div className="user-details">
              <div className="col">
              <img src={user?.imgURL ? user.imgURL : placeholderAvatar} alt='' className="avatar" />

              {user?.imgURL 
                ? (
                  <button className='btn btn-icon'>
                    <img src={iconEdit} className='icon' />
                  </button>
                ) : (
                  <button className='btn btn-icon'>
                    <img src={addImg} className='icon' />
                  </button>
                ) 
              }

              <button className='btn btn-icon'>
                <img src={iconDelete} className='icon' />
              </button>
              </div>

              <div className="col">

                <div className="even-columns">
                  <div className="column">
                    <h2>Personal information</h2>
                      <p>
                      Name: <b>{user?.name}</b>
                      {/*
                        <br /> 
                        <input type="text" />
                        <button className='btn' onClick={() => { 
                          dispatch(updateUser({id: user.id, keyName: "name", keyVal: "Samson"}));
                        }}>
                          Save
                        </button>
                      */}
                    </p>

                    <p>
                      Surname: <b>{user?.surname}</b> 
                      {/*
                        <br /> 
                        <input type="text" />
                        <button className='btn' onClick={() => { 
                          dispatch(updateUser({id: user.id, keyName: "surname", keyVal: "Danes"}));
                        }}>
                          Save
                        </button>
                      */}
                    </p>
                    <p>Email: <b>{ user?.email ? user?.email : "N/A" }</b> </p>
                    <p>Phone: <b>{ user?.phone ? user?.phone : "N/A" }</b> </p>

                    <p>&nbsp;</p>

                    <button className='btn btn-default'>
                        <img src={iconEdit} className='icon' />
                        Edit information
                      </button>
                  </div>

                  <div className="column">
                    <h2>User details</h2>
                    <p>Role: <b>{ user?.role }</b> [Change]</p>
                    <p>
                      Status: <b>{ user?.isActive ? 'Active' : 'Blocked' }</b> 
                      {" "}
                      <button>
                        [{ user?.isActive ? 'Block' : 'Activate' }]
                      </button>
                    </p>

                    <p>Username: <b>{ user?.username }</b></p>
                    <p>Password: <b>{user?.password.slice().replace(/./g, '*')}</b></p>
                  </div>
                </div>
              </div>

              <div className="col">
                <h2>Permissions</h2>

                <ul role="list">
                  {userPermissions.map((item, index) => (
                    <li key={index}>
                      <span className={`ball ${item.isOn ? 'on' : 'off'}`}></span>
                      {" "}
                      {item.label} 
                    </li>
                  ))}
                </ul>
              </div>
            </div> 
            
          
          <div className="userDetails">
 
            <div className="col-half">
              
            </div>

            
          </div>
          </>
        )
      }
      
    </div>
  )
}