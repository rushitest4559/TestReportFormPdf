import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AdminDashboard from './Admin/AdminDashboard/AdminDashboard'
import EditC from './Customer/pages/EditC'
import CreateC from './Customer/pages/CreateC'
import DashboardC from './Customer/pages/DashboardC'
import UserManagement from './Admin/UserManagement/UserManagement'

import Dashboard from './TestReport/pages/Dashboard'
import Create from './TestReport/pages/Create'
import Edit from './TestReport/pages/Edit'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:id' element={<Edit />} />
      
      <Route path='/admin' element={<AdminDashboard />}>
        <Route path='customers' element={<DashboardC />} />
        <Route path='customers/create' element={<CreateC />} />
        <Route path='customers/edit/:id' element={<EditC />} />
        <Route path='users' element={<UserManagement />} />
      </Route>
    </Routes>
  )
}

export default App