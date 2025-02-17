import { useState} from 'react'
import {  useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import { Eye,  EyeOff  } from 'lucide-react';


interface LoginProps {
    handleAdminAuthState: (state:boolean) => void;
  }
  

const Login:React.FC<LoginProps>=({handleAdminAuthState})=>{

  

  const navigate = useNavigate();
 
 
  
        

    //Message upon un-successfull submission of form
    const [responseSentence, setResponseSentence] = useState<any>()
    const [errorOccured, setErrorOccured] = useState<boolean>(false)
  
    //React Hook Forms
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    } = useForm()
    
    
    
const [showPassword, setShowPassword] = useState<boolean>(false)
  //Eye for showing password
  let set_Eye_for_password = (): void => {
    setShowPassword(!showPassword)
  }
  
    //onSumit function 
    
    let onSubmit = async <t,>(data: t) => {
      
  
        await fetch("/admin/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(err => { throw new Error(err.message) });                
              }           
                              
                handleAdminAuthState(true)                               
                navigate('/admin', {replace: true});               
                
              })
            .catch((error) => {
                handleAdminAuthState(false)
                setErrorOccured(true)
              setResponseSentence(                
                  <span className='text-red-500 italic font-semibold text-sm self-start'>{error.message}</span> 
              );
            });
        }
  
        return (
      <>
        <div className="bg-gray-200 h-[calc(100svh-120px)]  md:h-[calc(100svh-100px)]  w-full  text-white">
            <div className='grid justify-center place-items-center  grid-rows-[100px_auto] pt-10'>
        <h1 className='text-black passion-one-regular text-5xl self-start '>Admin Panel</h1>

          <div className='bg-[#383838] max-460:px-3 p-[30px] rounded-lg  flex justify-center items-center gap-auto flex-col w-[90vw] sm:w-[537px]'>
          
            <h2 className='font-bold opacity-75 mb-4 underline underline-offset-[6px]'>Login Form</h2>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-y-2.5 max-460:gap-x-4 gap-x-8">
                
  
                
  
                <div className='flex flex-col justify-start gap-1'>
                  <label htmlFor='E-mail' className='text-sm' >E-mail</label>
                  <input id='E-mail' autoComplete='username' className='placeholder:text-sm placeholder:pl-1 rounded-sm px-1 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400' placeholder='E-mail' type='email'
  
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                      },
                      minLength: {
                        value: 5,
                        message: 'Email must be at least 5 characters long'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Email must be less than 50 characters long'
                      }
                    })}
  
                  />
                  {errors.email && <p className="text-red-600 font-light text-xs text-wrap">{String(errors.email.message)}</p>}
                </div>
  
                <div className='flex flex-col justify-start gap-1'>
                  <label htmlFor='Password' className='text-sm' >Password</label>
                  <div id='Password' className="bg-white rounded-sm overflow-clip flex justify-start flex-row items-center">
                  {showPassword ? <EyeOff className=" text-black  w-6 h-4" onClick={set_Eye_for_password}/> : <Eye className="fa-solid fa-eye text-black  w-6 h-4" onClick={set_Eye_for_password}></Eye>}
                  <input className='shrink-1 placeholder:text-sm text-black  rounded-sm placeholder:pl-1 px-1 focus:outline-none  ' placeholder='Password'
                      type={showPassword ? "text" : "password"} autoComplete="current-password"
  
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters long'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Password must be less than 20 characters long'
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: `Password must contain at least:\none uppercase letter,\none lowercase letter,\none number, and one special character`
                        }
                      })}
                    />
                  </div>
                  {errors.password && <pre className="text-red-500 font-light text-xs text-wrap">{`${errors.password.message}`}</pre>}  
                </div>
  
  
                
                
                <div>
                 
                  
                </div>
              </div>
              <button type="submit" className="text-white bg-zinc-800  focus:outline-none focus:ring-2 mt-4 focus:ring-zinc-600 font-medium rounded-md text-sm px-3 py-1 hover:bg-zinc-700 disabled:opacity-20" disabled={isSubmitting} >login</button>
            </form>
            
            {errorOccured &&  responseSentence}
            <div className='pt-3 max-460:text-sm'>Don't have an account, contact <code className='bg-neutral-600 px-2 rounded-2xl font-semibold'>IT Dept.</code>  We cant provide Signup page for Admins.</div>
            
            </div>
        </div>
        </div>
        </>
  )

}

export default Login
