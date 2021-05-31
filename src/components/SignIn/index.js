import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import './styles.scss';


import { signIn } from '../../state/userSlice'
import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

const SignIn = ({}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const signInStatus = useSelector(state => state.user.status)
  const userError = useSelector(state => state.user.error)

  const { control, handleSubmit, reset, formState: { errors }} = useForm()
  const errorList = Object.values(errors).map(err => err.message)

  
  const onSubmit = async (data) => {
    console.log(data)
    const { email, password } = data
    const resultAction = dispatch(signIn({email, password}) )
    unwrapResult(resultAction)
 
  } 
  console.log(userError)

  useEffect(() => {
    if (signInStatus === 'succeeded') {
      reset({   
        email: "",
        password: "",    
      })
      history.push('/')
    }
  }, [signInStatus, history, reset])

  const configAuthWrapper = {
    headline: "Login",
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
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <Controller 
              control={control}
              name="email"
              render={({ field: { value, onChange }}) => (
                <FormInput placeholder="Email" type="email" value={value || ''} handleChange={onChange} />
              )}
              rules={{ required: "Not valid email" }}
            />

            <Controller 
              control={control}
              name="password"
              render={({ field: { value, onChange }}) => (
                <FormInput placeholder="Password" type="password" value={value || ''} handleChange={onChange} />
              )}
              rules={{ required: "Not valid password", maxLength:{ value: 10, message: "Password must not be longer than 10 characters"}}}
            />
            <Button type="submit">LogIn</Button>
          </form>
            <div className="socialSignin">
              <div className="row">
                <Button onClick={signInWithGoogle} type="submit" className="">Sign in with Google</Button>


              </div>
              
              <div className="links">
                <Link to="/recovery">Reset Password</Link> 
              </div>
            </div>
        </div>
     

    </AuthWrapper>
  )
}
export default SignIn