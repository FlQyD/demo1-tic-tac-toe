import React from 'react'
import Row from "../Row/Row.jsx"
import "./Rows.css"

const Rows = ({table, claimTile, mode}) => {
  return (
    <>
      {table.map((item, index) => {        
        return <div className='row' key={`${index}`}> 
            <Row key={`${index}-${item.join("")}`}
                 row={item} 
                 rowIndex={index} 
                 claimTile={claimTile}
            />
        </div>
        })}
    </>
  )
}

export default Rows