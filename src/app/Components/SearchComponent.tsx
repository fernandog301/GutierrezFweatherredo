import React, { useState } from 'react'
import SearchIcon from '../Assets/magnifying-glass.png'
const SearchComponent = (prop: any) => {
    const [userChange, setUserChange] = useState<string>("");
  const handleKeyDown = (e:any )=>{
    if (e.key === "Enter") {
    e.preventDefault();
    prop.setUserInput(userChange);
  }};

  return (
    <div>
      <form className='flex mx-[21px] items-end'>
      <input type="text" className='w-full searchClass h-[52px]' onChange={(e) => setUserChange(e.target.value)}
      onKeyDown={handleKeyDown} />
      <img className='ml-[8px] pt-[41px] flex-auto cursor-pointer' src="../../Assets/Magnifying-glass.png" alt="Search Icon" onClick={() => prop.setUserInput(userChange)} />
    </form>      
    </div>
  )
}

export default SearchComponent
