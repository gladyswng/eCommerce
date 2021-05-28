import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { auth } from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'


const EmailPassword = ({}) => {
  const history = useHistory()
  const [ error, setError ] = useState()
   const { control, handleSubmit, reset, formState: { errors }} = useForm()
  const errorList = Object.values(errors).map(err => err.message)
  
  const onSubmit = async (data) => {
    const { email } = data
    const config = {
      url: 'http://localhost:3000/login'
    }
    try {
      await auth.sendPasswordResetEmail(email, config)

      history.push('/login')
      
      reset({   
        email: "",  
      })

      // if succedd, redirect

    } catch (err) {
      setError("User not found")
    }
  } 
  console.log(error)

  const configAuthWrapper = {
    headline: 'Email Password',
  }
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

 
        {errorList.length > 0 && (
          <ul>
            {errorList.map((err, i) => (
              <li key={i}>
                {err}
              </li>
            ))}
            
          </ul>
        )}
        {error && <li>{error}</li> }
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Email" type="email" value={value || ''} handleChange={onChange} />
            )}
            rules={{ required: "Not valid email" }}
          />

          
          <Button type="submit">Email password</Button>
        </form>

     
      </div>
    </AuthWrapper>
  )
}
export default EmailPassword