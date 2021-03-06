import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { auth } from "../firebase/utils"
import { handleUserProfile } from '../firebase/utils'
import { selectUser, setCurrentUser } from "../state/userSlice"
 
const useFirebaseAuth = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const getUser = async (authUser) => {
    const userRef = await handleUserProfile(authUser)
    userRef.onSnapshot(snapshot => {
      const { email, displayName, createdDate, userRoles } = snapshot.data()
    
      dispatch(setCurrentUser({ 
        id: snapshot.id,
        createdDate: createdDate.toDate().toString(),
        email,
        displayName,
        userRoles
        
      })
      
    )
    })
  }
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          getUser(authUser)
        }
        dispatch(setCurrentUser(null))
        // history.push('/login')

      }
    )

    return () => {
      unlisten()
    }
  }, [])

  
  const currentUser = useSelector(selectUser)

  return currentUser
}
export default useFirebaseAuth