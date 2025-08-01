
function List({pfrases}) {
  
  return (
    <>
      <ul className="lista">
        {
          pfrases.map((item, index) => (
            <li className="frase" key={index}>
              <div className="frase-personaje-container">
              <p>{item.frase}</p>
              <p>{`(${item.nombre} ${item.apellido})`}</p>
              </div>

            </li>
            
          ))
        }
      </ul>
    </>
  )
}

export default List
