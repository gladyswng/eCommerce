import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { auth } from '../../firebase/utils'
import { resetPassword } from '../../state/userSlice'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'


const EmailPassword = ({}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [ error, setError ] = useState([])
  const [ resetStatus, setResetStatus ] = useState('idle')

  const { control, handleSubmit, reset, formState: { errors } } = useForm()
  const errorList = Object.values(errors).map(err => err.message)
  
  const onSubmit = async (data) => {
    const { email } = data
 
    if (email && resetStatus === 'idle') {
      try {
        setResetStatus('pending')
        const resultAction = await dispatch(resetPassword({ email }))
        unwrapResult(resultAction)

        reset({   
          email: "",  
        })

        history.push('/login')
      } catch (err) {
        setError([...errorList, "User not found"])
      } finally {
        setResetStatus('idle')
      }
      
    }
    
  } 
  // useEffect(() => {
  //   if (errorList.length >  0) {
  //     setError([...errorList])
  //   }
  // },[errors])
  
  console.log(error)
  const configAuthWrapper = {
    headline: 'Email Password',
  }
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

 
        {error?.length > 0 && (
          <ul>
            {error.map((err, i) => (
              <li key={i}>
                {err}
              </li>
            ))}
            
          </ul>
        )}
  
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