
import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { signup } from '../../state/userSlice'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'

import './styles.scss'


const Signup = ({}) => {
  // const { currentUser } = useFirebaseAuth()
  const dispatch = useDispatch()
  const [ signupStatus, setSignupStatus ] = useState('idle')

  
  // Form
  const { control, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm()
  
  const errorList = Object.values(errors).map(err => err.message)
  
  // signup status
  const canSignup = [isValid && signupStatus === 'idle']

  
  const onSubmit = async (data) => {
    const { displayName, email, password } = data
      if (canSignup) {
        try {
          setSignupStatus('pending')
          const resultAction = dispatch(signup({ email, password, displayName }))

          unwrapResult(resultAction)
          
          reset({   
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
          })

        } catch (err) {
          console.log(err)
        } finally {
          setSignupStatus('idle')
        }
      }
      // const { user } = await auth.createUserWithEmailAndPassword(email, password)
      // await handleUserProfile(user, { displayName })
      
  
  }

  const configAuthWrapper = {
    headline: "Registration"
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
        
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
          <Controller 
            control={control}
            name="displayName"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Full Name" value={value} handleChange={onChange} />
            )}
            
            rules={{ required: "Not valid name", maxLength:{ value: 10, message: "Name must not be longer than 10 characters"} }}
          />
          
          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Email" value={value || ''} handleChange={onChange} />
            )}
            rules={{ required: "Not valid email" }}
          />
          
          <Controller 
            control={control}
            name="password"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Password"  value={value || ''} handleChange={onChange} type="password" />
            )}
            rules={{ required: "Not valid password", maxLength:{ value: 10, message: "Password must not be longer than 10 characters"}}}
          />
          
          <Controller 
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange }}) => (
              <FormInput placeholder="Confirm Password" handleChange={onChange} value={value} type="password" />
            )}
            rules={{ required: "Not valid password input" ,  validate: value => value === watch("password") || "The passwords do not match" }}
          />
          

          <Button type="submit">Rgister</Button>
 
        </form>

        </div>


    
    </AuthWrapper>
  )
}
export default Signup