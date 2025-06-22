import React from 'react'
import './SearchComponents.css'
import SearchUserCard from './SearchUserCard'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../Redux/User/Action';

const SearchComponents = () => {
  
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store);
  

  const handleSearch=(e)=>{
    dispatch(searchUserAction(e.target.value));
  }


  return (
    <div className='searchContainer'>
        <div className='text-center pb-5'>
            <h1 className='text-xl pb-5'>Search</h1>
            <input onChange={handleSearch} className='searchInput' type="text" placeholder='Search...'/>
        </div>

        <hr />
        <div className='px-2 mt-5'>
            {user.searchUser?.map((item) => <SearchUserCard user={item}/>)}
        </div>
    </div>
  )
}

export default SearchComponents