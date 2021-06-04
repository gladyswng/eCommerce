import { Link } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import './styles.scss';

const AdminToolbar = ({}) => {
  // const adminUser = useAdminAuth()

  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">
            My admin
          </Link>
        </li>
      </ul>
      

    </div>
  )
}
export default AdminToolbar