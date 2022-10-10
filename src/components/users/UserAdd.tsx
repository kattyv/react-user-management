import React, { FC, useState } from 'react'
import placeholderAvatar from '../../assets/img/avatar-placeholder.png'
import { Link, useNavigate } from 'react-router-dom'
import { User, UserRole } from '../../interfaces/User'
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxTyped'
import { addUser } from '../../features/Users'
import { MessageBox } from '../MessageBox'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type Message = {
  type: 'error' | 'success',
  content: string
}
type UserData = {
  name: string,
  surname: string,
  email: string,
  phone: string,
  imgURL: string,
  username: string,
  password: string,
  role: UserRole,
  isActive: boolean,
  permissions: {
    id: number,
    isOn: boolean
  }[]
}

export const UserAdd: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState<Message>();

  const users = useAppSelector(state => state.users.value);

  // permissions
  const permissions = useAppSelector((state) => state.permissions.value);
  const defaultPerms = permissions.map(p => {
    const id = p.id;
    return {id, isOn: false};
  });

  const [userPerms, setUserPerms] = useState(defaultPerms);

  const onPermissionCheck = (id: number) => {
    setUserPerms(
      userPerms.map(perm => (perm.id === id) ? {...perm, isOn: !perm.isOn} : perm)
    )
  }
  // Form validation
  
  // validation schema
  const schema = yup.object({
    name: yup.string().required('Required field'),
    surname: yup.string().required('Required field'),
    email: yup.string().email('Invalide email address').required('Required field'),
    phone: yup.string(),
    imgURL: yup.string(),
    username: yup.string().required('Required field'),
    password: yup.string().required('Required field').min(4, "Too short (at least 4 characters)").max(20, "Too long (up to 4 characters)"),
    role: yup.string().required('Required field'),
    isActive: yup.boolean().required('Required field')
    //permissions: yup.array(yup.number())
  })
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserData>({
    resolver: yupResolver(schema),
    //defaultValues: { role: "User", isActive: true }
  });

  //const doSubmit: SubmitHandler<User> = (data: User) => {
  const doSubmit = (data: UserData) => {
    dispatch(addUser({
      id: users[users.length - 1].id + 1,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      imgURL: '',
      username: data.username,
      password: data.password,
      role: data.role,
      isActive: data.isActive, 
      permissions: userPerms
    }));

    setMessage({type: 'success', content: 'User added succesfuly!'});
    reset();
    navigate('/users');
  }

  const doReset = () => {
    reset();
  }

  const doCancel = () => {
    reset();
    navigate('/users');
  }

  return (
    <>
      <header className='pg-title'>
        <div className='inline-group'>
          <Link to="/users" className='btn btn-round'>
            <i className="icon icon-back"></i>
          </Link>
        
          <h1>Add new user</h1>
        </div> 
      </header>

      {message && 
        <MessageBox type={ message.type } content={ message.content } />
      }

    
    <form onSubmit = { handleSubmit(doSubmit) } autoComplete='off'>
      <div className="user-details">
        <div className="col"> 
          <img src={ placeholderAvatar } alt="" className='avatar' />

          <button className='btn btn-icon' title='Add image'>
            <i className="icon icon-add-img"></i>
          </button>
          
          <button className='btn btn-icon' title='Delete image'>
          <i className="icon icon-delete"></i>
          </button>
        </div>

        <div className="col">

          <div className="even-columns">
            <div className="column">
              <h2>Personal information</h2>
              
              <label className='req'>Name</label>
              <input 
                type="text" 
                { ...register('name') }
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <p className="text-error">
                { errors.name.message }
              </p> }

              <label className='req'>Surname</label>
              <input 
                type="text" 
                { ...register('surname') }
                className={errors.surname ? 'error' : ''}
              />
              {errors.surname && <p className="text-error">
                { errors.surname.message }
              </p> }

              <label className='req'>Email</label>
              <input 
                type="text" 
                { ...register('email') }
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <p className="text-error">
                { errors.email.message }
              </p> }
              
              <label>Phone</label>
              <input 
                type="text" 
                { ...register('phone') }
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <p className="text-error">
                { errors.phone.message }
              </p> }
            </div>

            <div className="column">
              <h2>User details</h2>

              <label className='req'>Username</label>
              <input 
                type="text" 
                { ...register('username') }
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <p className="text-error">
                { errors.username.message }
              </p> }

              <label className='req'>Password</label>
              <input 
                type="password" 
                { ...register('password') }
                className={errors.password ? 'error' : ''}
                autoComplete='off'
              />
              {errors.password && <p className="text-error">
                { errors.password.message }
              </p> }

              <label className='req'>Role</label>
              <select { ...register('role') } defaultValue="User">
                <option value="User">User</option>
                <option value="Administrator">Administrator</option>
              </select>
              {errors.role && <p className="text-error">
                { errors.role.message }
              </p> }

              <span className='label req'>Status</span>
              <div className="inline-group">
                <label>
                  <input 
                    type="radio" 
                    defaultChecked
                    value="true" 
                    { ...register('isActive') }
                  /> Active
                </label>

                <label>
                  <input 
                    type="radio" 
                    value="false" 
                    { ...register('isActive') }
                  /> Blocked
                </label>
                {errors.isActive && <p className="text-error">
                { errors.isActive.message }
              </p> }
              </div>
            </div>
          </div>
        </div>

        <div className="col"> 
        <h2>Select to grant permission</h2>

            { userPerms.map(perm => (
                <label key={perm.id}>
                  <input type="checkbox"
                    name = "permissions"
                    value = { perm.id }
                    checked = {perm.isOn}
                    onChange = {() => onPermissionCheck(perm.id)}
                  /> 
                  {" "}
                  Permission ID: { perm.id }
                </label>
              ))
            }
        </div>
      </div>

      <div className="form-footer">
        <p>
          <b className="text-error">*</b> Requred fields
        </p>

        <div>
          <button className='btn btn-default' onClick={doCancel}>Cancel</button>
          <button type='reset' className='btn btn-default' onClick={doReset}>Clear Fields</button>
          <button type='submit' className='btn btn-primary'>Save New User</button>
        </div>
      </div>

    </form>  
    </>
  )
}
