import { useEffect, useState } from 'react'
import './App.css'
import { Mesures } from './components/measures/Mesures';

function App() {
  // const [ mesure, setMesure] = useState({})
  // useEffect(() => {
  //   (async() => {
  //     const data = await getMesures();
  //     console.log(data);
  //     // setMesure(data);

  //   })()
  // },[mesure]);

  return (
    <div className="App">
      <h1 className='title'>Jose Antonio Cortes García: Validación telemática</h1>
      <Mesures />
    </div>
  )
}

export default App
