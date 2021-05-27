import { useEffect, useState } from "react"
import { auth } from "../firebase/utils"
import { handleUserProfile } from '../firebase/utils'
 
const useFirebaseAuth = () => {

  // const [ authUser ,setAuthUser ] = useState(null)

  const [ currentUser, setCurrentUser ] = useState(null)

  const getUser = async (authUser) => {
    const userRef = await handleUserProfile(authUser)
    userRef.onSnapshot(snapshot => {
      setCurrentUser({ 
        id: snapshot.id,
        ...snapshot.data()
      })
    })
  }
  console.log(currentUser)
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(
      authUser => {
        // authUser
        //   ? setAuthUser(authUser)
        //   : setAuthUser(null)
        if (authUser) {
          getUser(authUser)
        }
        setCurrentUser(null)
      }
    )

    return () => {
      unlisten()
    }
  }, [])

  return currentUser
}
export default useFirebaseAuth