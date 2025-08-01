import './styles/App.scss'
import Header from './components/Header'
import List from './components/List'
import { useEffect, useState } from 'react'


function App() {

  const [frases, setFrases] = useState([]);

  useEffect(() => {
    fetch("https://modulo-4-evaluacion-final-bpw-angelicagh.onrender.com/frases")
      .then(response => response.json())
      .then(data => {
          setFrases(data.results);
          
      })
  }, []) 

  //de cada endpoint tengo que hacer un fetch distinto y preparar cómo quiero que se vea --> next step

 /*    useEffect(() => {
    fetch("https://modulo-4-evaluacion-final-bpw-angelicagh.onrender.com/frases/:id")
      .then(response => response.json())
      .then(data => {
          setFrases(data.results);
          
      })
  }, []) */

/*     useEffect(() => {
    fetch("https://modulo-4-evaluacion-final-bpw-angelicagh.onrender.com/personajes")
      .then(response => response.json())
      .then(data => {
          setFrases(data.results);
          
      })
  }, [])

    useEffect(() => {
    fetch("https://modulo-4-evaluacion-final-bpw-angelicagh.onrender.com/capitulos")
      .then(response => response.json())
      .then(data => {
          setFrases(data.results);
          
      })
  }, []) */

  
  
  return (
    <>
    <Header/>
    <List pfrases={frases}/> 
    

    </>
  )
}

export default App


