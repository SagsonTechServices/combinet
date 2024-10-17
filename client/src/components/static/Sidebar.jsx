import React from 'react'
import logoBase from '../../assets/images/logo-base.png';
import home from '../../assets/images/icons/home.png';
import post from '../../assets/images/icons/post.png';
import communities from '../../assets/images/icons/communities.png';
import profile from '../../assets/images/icons/profile.png';
import categories from '../../assets/images/icons/categories.png';
import loginIcon from '../../assets/images/icons/loginIcon.png'
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { logoutUser } from '../../redux/features/user/userSlice';

function Sidebar() {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function onLogoutClick(){
    dispatch(logoutUser());
  }
  return (
    <div>
      <div className="drawer lg:drawer-open z-20 fixed left-0 top-0">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-between">
          {/* Page content here */}
          <div className='lg:hidden bg-primary flex align-middle gap-5 justify-start w-full py-2 px-4'>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-outline btn-secondary drawer-button"
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          </label>

            <div className='flex gap-2 align-middle justify-end w-full'>
            <img src={logoBase} className='w-12' />
            <h1 className='text-2xl text-base-100 py-2'>Combinet</h1>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-primary text-base-100 text-lg min-h-full w-64 p-4">
          {user && <li className='my-2'>
              <button className='btn btn-secondary' onClick={onLogoutClick}>Logout</button>
            </li>}
            {/* Sidebar content here */}
            <li className='mb-4'>
              <Link to={'/'}><span><img src={logoBase} alt="Logo" className='w-52' /></span><h1 className='text-2xl text-center'>Combinet</h1></Link>
            </li>
            <li className='my-2'>
              <Link to={'/'}><span><img src={home} className='w-8' alt="" /></span> Home</Link>
            </li>
            <li className='my-2'>
              <Link to={'/categories'}><span><img src={categories} className='w-8' alt="" /></span> Categories</Link>
            </li>
            <li className='my-2'>
              <Link to={'/blog/post'}><span><img src={post} className='w-8' alt="" /></span> Post Blog</Link>
            </li>
            <li className='my-2'>
              <Link to={'/communities'}><span><img src={communities} className='w-8' alt="" /></span> My Communities</Link>
            </li>
            <li className='my-2'>
              {!user ? <Link to={'/login'}><span><img src={profile} className='w-8' alt="" /></span>Log in</Link> : <Link to={'/profile'}><span><img src={profile} className='w-8' alt="" /></span> My Profile</Link>}
            </li>
            {!user && <li className='my-2'>
              <Link to={'/register'}><span><img src={profile} className='w-8' alt="" /></span>Sign up</Link>
            </li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
