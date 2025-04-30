import React from 'react'
import { Routes, Route } from 'react-router-dom'

import TestReport from './Form/TestReport'
import AdminDashboard from './Admin/AdminDashboard/AdminDashboard'
import CustomersDashboard from './Admin/CustomerManagement/CustomerManagement'
import CreateCustomer from './Admin/CustomerManagement/CreateCustomer/CreateCustomer'
import EditCustomer from './Admin/CustomerManagement/EditCustomer/EditCustomer'
import UserManagement from './Admin/UserManagement/UserManagement'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<TestReport />} />
      <Route path='/admin' element={<AdminDashboard />}>
        <Route path='customers' element={<CustomersDashboard />} />
        <Route path='customers/create' element={<CreateCustomer />} />
        <Route path='customers/edit/:id' element={<EditCustomer />} />
        <Route path='users' element={<UserManagement />} />
      </Route>
    </Routes>
  )
}

export default App