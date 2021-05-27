import './styles.scss'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user'
import { auth } from '../../firebase/utils'



const Header = ({}) => {
  const { currentUser } = useContext(UserContext)
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
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span onClick={() => auth.signOut()}>
                  LOGOUT
                </span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>

          )}
        </div>
      </div>



      
    </header>
  )
}


export default Header