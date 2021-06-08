import './styles.scss'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import { auth } from '../../firebase/utils'
import { useSelector } from 'react-redux'
import { selectUser } from '../../state/userSlice'
import { selectTotalItem } from '../../state/cartSlice'



const Header = ({}) => {
  // const { currentUser } = useContext(UserContext)
  const currentUser = useSelector(selectUser)
  const totalItem = useSelector(selectTotalItem)
  useEffect(() => {
    
  }, [currentUser])
  return (
    <header>
      <div className="wrap">
        <div className="logo">
          <Link to="/">

            <img src={Logo} alt="logo"/> 
          </Link>
          
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/" className="headerLink" style={{ color: 'black' }}>
                 Home
              </Link>
            </li>
            <li>
              <Link to="/search" style={{ color: 'black' }}>
                Search
              </Link>
            </li>
          </ul>
        
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/cart" style={{ color: 'black' }}>Your Cart ({totalItem})</Link>
            </li>


            {!currentUser && (
              <>
                <li>
                  <Link to="/registration" style={{ color: 'black' }}>Register</Link>
                </li>
                <li>
                  <Link to="/login" style={{ color: 'black' }}>Login</Link>
                </li>
              </>

            )}
            {currentUser && (

              <li>
                <span onClick={() => auth.signOut()}>
                  LOGOUT
                </span>
              </li>

            )}
          </ul>
        </div>
        </nav>
      </div>



      
    </header>
  )
}


export default Header