import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import './styles.scss';

const SignIn = ({}) => {

   const { control, handleSubmit, watch, reset, formState: { errors }} = useForm()
  const errorList = Object.values(errors).map(err => err.message)

  
  const onSubmit = async (data) => {
    const { email, password } = data
    
    try {
      await auth.signInWithEmailAndPassword(email, password)
      reset({   
        email: "",
        password: "",    
      })
    } catch (err) {
      // console.log(err)
    }
  } 

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