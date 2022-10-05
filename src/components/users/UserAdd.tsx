import React, { FC, useState } from 'react'
import placeholderAvatar from '../../assets/img/avatar-placeholder.png'
import iconBack from '../../assets/img/icons/icon-arrow-left.svg'
import iconDelete from '../../assets/img/icons/icon-delete.svg'
import addImg from '../../assets/img/icons/icon-add-img.svg'
import { Link } from 'react-router-dom'
import { User } from '../../interfaces/User'
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxTyped'
import { addUser } from '../../features/Users'
import { MessageBox } from '../MessageBox'

type Message = {
  type: 'error' | 'success',
  content: string
}

export const UserAdd: FC = () => {
  const [message, setMessage] = useState<Message>();

  const blankUser = {
    id: 25,
    name: '',
    surname: '',
    email: '',
    phone: '',
    imgURL: '',
    username: '',
    password: '',
    role: 'User',
    isActive: false, 
    permissions: []
  }
  const [newUser, setNewUser] = useState<User>(blankUser);

  // permissions
  const defaultPermissions = useAppSelector((state) => state.permissions.value);

  const permissionSet = [
    {permID: 1, isOn: true},
    {permID: 2, isOn: false},
    {permID: 3, isOn: true}
  ]

  // Buttons
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (newUser !== blankUser) {
      dispatch(addUser(newUser));
      setMessage({type: 'success', content: 'User added succesfuly!'});
      setInterval(() => {
        console.log('redirected');
      }, 5000)
    } 
    else 
    {
      setMessage({type: 'error', content: 'You cant add user with no details!'});
    }
    
  }

  return (
    <>
      <header className='pg-title'>
        <div className='inline-group'>
          <Link to="/users" className='btn btn-round'>
            <img src={iconBack} alt="Back to users list" className='icon' />
          </Link>
        
          <h1>Add new User</h1>
        </div> 
      </header>

      

      {message && 
        <MessageBox type={ message.type } content={ message.content } />
      }

      <div className="user-details">
        <div className="col"> 
          <img src={ placeholderAvatar } alt="" className='avatar' />

          <button className='btn btn-icon'>
            <img src={addImg} className='icon' />
          </button>
          
          <button className='btn btn-icon'>
            <img src={iconDelete} className='icon' />
          </button>
        </div>

        <div className="col">
          <h2>Personal information</h2>

          <div className="even-columns">
            <div className="column">
              <label>Name</label>
              <input type="text" className='error' />
              <p className="text-error">Error text goes here</p>
            </div>
            <div className="column">
              <label>Surname</label>
              <input type="text" />
            </div>
          </div>

          <div className="even-columns">
            <div className="column">
              <label>Email</label>
              <input type="text" />
            </div>
            <div className="column">
              <label>Phone</label>
              <input type="text" />
            </div>
          </div>

          <h2>User details</h2>

          <div className="even-columns">
            <div className="column">
              <label>Username</label>
              <input type="text" />
            </div>
            <div className="column">
              <label>Role</label>
              <select>
                <option value="User">User</option>
                <option value="Admin">Administrator</option>
              </select> 
            </div>
          </div>

          <div className="even-columns">
            <div className="column">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="column">
            <label>Status</label>
              <label>
                <input type="radio" name="userStatus" value="Active" /> Active
              </label>

              <label>
                <input type="radio" name="userStatus" value="Blocked" defaultChecked /> Blocked
              </label>
            </div>
          </div>
        </div>

        <div className="col"> 
        <h2>Select to grant permission</h2>

            { defaultPermissions.map(perm => (
                <label key={perm.id}>
                  <input type="checkbox" 
                    name = "userPermissions"
                    value = { perm.value }
                    //defaultChecked={perm.isOn} 
                    //checked = { perm.isOn }
                    onChange = { e => { console.log(e.target.checked) } }  
                  />
                  {" "}
                  { perm.label }
                </label>
              ))
            }
        </div>
      </div>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <button className='btn btn-default'>Cancel</button>
        <button className='btn btn-default'>Clear</button>
        <button className='btn btn-primary' onClick={ handleSubmit }>Save New User</button>
      </div>

      
    </>
  )
}
