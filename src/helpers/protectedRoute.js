// Not used - only for practice

import { Redirect, Route, useLocation } from "react-router"
import { auth } from "../firebase/utils"

const ProtectedRoute = ({children, currentUser, ...rest}) => {
  const location = useLocation()
  return (
    <Route {...rest}>
      {currentUser? 
        children
        : 
        <Redirect to={{ 
          pathname: "/login",
          state: { from: location }
        }}/>


        
      }
    </Route>
  )
}
export default ProtectedRoute