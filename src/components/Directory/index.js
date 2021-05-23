import './styles.scss'
import Men from '../../assets/men.jpg'
import Women from '../../assets/women.jpg'


const Directory = ({}) => {
  return (
    <div className="directory"> 
      <div className="wrap">
        <div className="item" style={{
          backgroundImage: `url(${Women})`
        }}>
          <a >Shop Womens</a>
        </div>
        <div className="item"  style={{
          backgroundImage: `url(${Men})`
        }}>
          <a >Shop Mens</a>
        </div>
        

      </div>
    </div>
  )
}
export default Directory