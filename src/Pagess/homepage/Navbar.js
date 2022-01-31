import React, { useState,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Avatar from 'react-avatar';
import { db } from '../../firebaseConfigaration'; 
import {collection, getDoc ,query, where,doc} from 'firebase/firestore';

function Navbar({login,setLogin}) {
    let histry=useHistory();
    const[userName,setUserName]=useState('')
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

 const getLogout=async()=>{
     setLogin(false);
   //window.location.reload();

 }
 useEffect(async() => {
   let id=localStorage.getItem('id');
   console.log(id);
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setUserName(docSnap.data().firstName)
    console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
    
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='logOut'>
              <div className='content-logout'>
                  <Button className='logout-btn' onClick={()=> getLogout()}> <Link to='/' >LogOut</Link></Button>
              </div>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className='userProfile'>
                <div className='row'>
                    <div className='col'>
                        <Avatar size="100" onClick={()=>{histry.push('/userProfile')}}round="50px" className='avtar' src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" />
                        <span className='userName'>{userName}</span>
                    </div>
                </div>
          </div>
          </ul>
          
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;