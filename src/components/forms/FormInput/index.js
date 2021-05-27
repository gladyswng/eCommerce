import './styles.scss'

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && (
        <label >
          {label}
        </label>
      )}

      <input className="formInput" type="text" onChange={handleChange} {...otherProps}/>
    </div>
  )
}
export default FormInput