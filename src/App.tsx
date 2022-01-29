import { useEffect, useState } from 'react'
import './App.css'
import { Mesures } from './components/measures/Mesures';

function App() {

  return (
    <div className="App">
      <h1 className='title'>VigiaNICE</h1>
      <Mesures />
    </div>
  )
}

export default App
