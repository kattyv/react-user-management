
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { LayoutAdmin } from './components/layout/LayoutAdmin'
import { UserList } from './components/users/UserList'
import { UserAdd } from './components/users/UserAdd'
import { UserEdit } from './components/users/UserEdit'
import { Preloader } from './components/layout/Preloader' 
import './App.css'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={ <Login /> } />
          <Route element={ <LayoutAdmin /> }>
            <Route path='/users' element={ <UserList /> } />
            <Route path='/users/:id' element={ <UserEdit /> } />
            <Route path='/users/new' element={ <UserAdd /> } />
          </Route>
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </Router>

      <Preloader />
    </div>
  )
}

export default App
