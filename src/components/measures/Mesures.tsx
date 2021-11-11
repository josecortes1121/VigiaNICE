import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase'
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { ref, onValue } from 'firebase/database';
import './measures.css'

export const Mesures = () => {
  const [measures, setMeasures] = useState([]);

  const getMesures = async () => {
    const data = ref(db, '/Mesures');
    onValue(data, (snapshot) => {
      const data = snapshot.val();
      setMeasures(Object.values(data));
      // console.log(data);
    })
  }

  useEffect(() => {
    getMesures();
    console.log(measures);
  }, [])

  return (
    <table className="table">
      <thead>
        <th>Corriente</th>
        <th>Potencia</th>
        <th>Consumo</th>
      </thead>
      <tbody>
        {measures.map((data: any, index) => {
          return (
            <tr key={index}>
              <td>{data.I}</td>
              <td>{data.P}</td>
              <td>{data.C}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
