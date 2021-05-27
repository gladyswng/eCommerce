
import { Controller, useForm } from 'react-hook-form'
import { auth, handleUserProfile } from '../../firebase/utils'
import useFirebaseAuth from '../../hooks/useFirebaseAuth'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'

import './styles.scss'


const Signup = ({}) => {
  // const { currentUser } = useFirebaseAuth()

  const { control, handleSubmit, watch, reset, formState: { errors }} = useForm()
  const errorList = Object.values(errors).map(err => err.message)

  
  const onSubmit = async (data) => {
    const { displayName, email, password } = data
    
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await handleUserProfile(user, { displayName })
      
      reset({   
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <div className="signup">
      <div className="wrap">
        <h2>Signup</h2>
        {errorList.length > 0 && (
          <ul>
            {errorList.map((err, i) => (
              <li key={i}>
                {err}
              </li>
            ))}
          </ul>
        )}
        <div className="formWrap">

        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller 
            control={control}
            name="displayName"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Full Name" value={value} handleChange={onChange}/>
            )}
            
            rules={{ required: "Not valid name", maxLength:{ value: 10, message: "Name must not be longer than 10 characters"} }}
          />
          
          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Email" value={value} handleChange={onChange}/>
            )}
            rules={{ required: "Not valid email" }}
          />
          
          <Controller 
            control={control}
            name="password"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Password"  value={value} handleChange={onChange} type="password"/>
            )}
            rules={{ required: "Not valid password", maxLength:{ value: 10, message: "Password must not be longer than 10 characters"}}}
          />
          
          <Controller 
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Confirm Password" handleChange={onChange} value={value} type="password"/>
            )}
            rules={{ required: "Not valid password input" ,  validate: value => value === watch("password") || "The passwords do not match" }}
          />
          

          <Button type="submit">Rgister</Button>
 
        </form>

        </div>


      </div>
    </div>
  )
}
export default Signup