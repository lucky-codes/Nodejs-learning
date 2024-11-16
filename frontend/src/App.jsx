import React from 'react'
import Signup from './components/signup/Signup'
import Head from './components/signup/Head'

const App = () => {
  return (
    <div>
        <div className='flex flex-col min-h-screen'>
        <Head/>
        <Signup/>
        </div>
    </div>
  )
}

export default App