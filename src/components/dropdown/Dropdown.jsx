import React, { useState } from 'react'
import "./dropdown.scss"
export const Dropdown = ({items, setSelected, selected}) => {
    const [isActive, setIsActive] = useState(false)
    const handleSelect = (el)=>{
        setSelected(el.size)
        setIsActive(false)
    }
  return (
    <div className="dropdown">
        <div className="dropdown-button" onClick={()=> setIsActive(!isActive)}>{selected}
        <img className='drop-down-image' src="images/caretDown.svg" alt="Open" /></div>
        {isActive && (
            <div className="dropdown-content">
            {items.map((el, index)=> (
                            <div key={index} className="dropdown-item" onClick={()=>handleSelect(el)}>
                                {el.size}
                            </div>
            ))}
        </div>
        )}
        
    </div>
  )
}
