import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { selectUser } from "../state/userSlice"
import { checkUserIsAdmin } from "../Utils"

const useAdminAuth = () => {
  const history = useHistory()
  const currentUser = useSelector(selectUser)
  const [ adminUser, setAdminUser ] = useState(null)
  useEffect(() => {
    // if (!currentUser) {
    //   return
    // }
    
    if (checkUserIsAdmin(currentUser)) {
      // history.push('/login')
      setAdminUser(currentUser)
      console.log('check admin false')
    }
  }, [currentUser])
  return adminUser
}
export default useAdminAuth