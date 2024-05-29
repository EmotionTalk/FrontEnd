import React from 'react'
import Profile from "../../assets/pro.jpg"

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='검색'/>
      </div>
     <div className="users">
        <img src={Profile}/>
        <div className="userChatInfo">
            <span>dud</span>
        </div>
     </div>
    </div>
  )
}

export default Search
