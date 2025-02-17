import {useState} from 'react'
import { useForm } from "react-hook-form"
import ReactFlagsSelect from "react-flags-select";
import { motion } from "motion/react"
import '../index.css'
const Touchusform = () => {

    // useForm imports
    const {
        register,
        handleSubmit,        
        formState: { errors },
        setValue,
        reset
      } = useForm()

      //response sentence state
      const [responseSentence, setResponseSentence] = useState<any>()
      const [isPending, setisPending] = useState<boolean>(false)
      const [disableSwitch, setdisableSwitch] = useState<boolean>(false)
      //selected country state
      const [selected, setSelected] = useState("");

      let onSubmit = async <t,>(data: t) => {
        // if(recaptchaSucess){
        // localStorage.setItem('userData', JSON.stringify(data));
        setisPending(true)

         fetch("http://localhost:3000/general/touchus", {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data)
        })
          .then((res) => res.json())
    
          .then((sentence) => {
            setResponseSentence(sentence.message)
            
            setdisableSwitch(true)
            reset()
            setSelected("")
          })    
          .catch((error) => {
            setResponseSentence(
              error.message ?
                <span className='text-red-500 '>{error.message}</span> : 'unknown error')
          }).finally(() => 
            setisPending(false)
)
          // }
          // else {
          //   setResponseSentence("Please verify the reCAPTCHA")
          // }
        
      }

  return (
    <div className=' max-w-[80%]'>
        <div className='lg:text-[3.41vw] text-[7.7878vw] text-white pt-7 '>Get in touch now</div>
        {/* our form */}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-6 gap-x-8 pt-2 sm:grid-cols-2 grid-col-1">
        <div className='flex flex-col justify-start gap-y-2'>
                <label htmlFor='Firstname' className='text-md'>Firstname</label>
                <input id='Firstname' className='placeholder:text-sm placeholder:pl-2 rounded-sm px-2 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400 ' placeholder="Firstname"{...register("firstname", { minLength: { value: 3, message: "Min length is 3 words" } })} />
                {errors.firstname && <p className="text-red-500 font-normal text-sm">{String(errors.firstname.message)}</p>}
              </div>

              <div className='flex flex-col justify-start gap-y-2'>
                <label htmlFor='Lastname' className='text-md' >Lastname</label>
                <input id='Lastname' className='placeholder:text-sm placeholder:pl-2 rounded-sm px-2 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400 ' placeholder='Lasttname' {...register("Lastname", { required: { value: true, message: "Must fill this field" }, minLength: { value: 3, message: "Min length is 3 words" } })} />
                {errors.Lastname && <p className="text-red-500 font-normal text-sm">{String(errors.Lastname.message)}</p>}
              </div>

              <div className='flex flex-col justify-start gap-y-2'>
                <label htmlFor='E-mail' className='text-md' >E-mail</label>
                <input id='E-mail' className='placeholder:text-sm placeholder:pl-2 rounded-sm px-2 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400' placeholder='E-mail' type="text"

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
                {errors.email && <p className="text-red-500 font-normal text-sm">{String(errors.email.message)}</p>}
              </div>

              


             
              {/* country dropdown */}
              <div className='flex flex-col justify-start gap-y-2'>
                <label htmlFor='Country'>Country</label>
                <div  
                  id='Country' className='text-black'
                  
                >
                  {/* <option className="text-black" value="">Select your country</option>
                  <option className="text-black" value="usa">USA</option>
                  <option className="text-black" value="canada">Canada</option>
                  <option className="text-black" value="mexico">Mexico</option>
                  <option className="text-black" value="uk">UK</option> */}
                 <ReactFlagsSelect className='border-white  bg-white rounded-sm  text-black h-[26px]'
                       selectedSize={15} selectButtonClassName="selectButtonClassName3"

    selected={selected}
    onSelect={(code) => { 
      setValue("country", code)       
        setSelected(code)
        }}
        placeholder="Select your country" searchable searchPlaceholder="Search countries"

  />
                </div>
                {errors.country && <p className="text-red-500 font-normal text-sm">{String(errors.country.message)}</p>}
              </div>
             
              <div className='sm:col-span-2'>
                <p className='text-md pb-2'>Type of employment</p>
                <div className='flex flex-wrap flex-col sm:flex sm:flex-row sm:justify-start sm:w-max pt-2 gap-2 '>
                  <label className='text-sm  '>
                    <input {...register("employment", { required: "Employment selection is required" })} className='mr-1 tex' type='radio' value='Govt Employee' />
                    Govt Employee
                  </label>
                  <label className='text-sm'>
                    <input {...register("employment", { required: "Employment selection is required" })} className='mr-1' type='radio' value='Private Employee' />
                    Private Employee
                  </label>
                  <label className='text-sm'>
                    <input className='mr-1' {...register("employment", { required: "Employment selection is required" })} type='radio' value='Business' />
                    Business
                  </label>
                  <label className='text-sm'>
                    <input {...register("employment", { required: "Employment selection is required" })} className='mr-1' type='radio' value='Health Sector' />
                    Health Sector
                  </label>
                 
                </div>
                <label className='text-sm pt-2 block'>
                    <input {...register("employment", { required: "Employment selection is required" })} className='mr-1' type='radio' value='Other' />
                    Other
                  </label>
                {errors.employment && <p className="text-red-500 font-normal text-sm pt-2">{String(errors.employment.message)}</p>}

              </div>
         
            </div>
            {/* <div className='mt-4 w-max'>
            <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={clientsidecaptchakey}
        onChange={googleCaptchaOnChange}
        theme='dark' size= 'compact'
      />
      </div> */}
    <div className="w-full flex flex-col py-6">
            <button type="submit" className="text-white w-[50%] bg-zinc-800 focus:outline-none focus:ring-2 mt-4 focus:ring-zinc-600 font-medium rounded-md text-md px-3 py-1 m-auto hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={isPending || disableSwitch} >
                { isPending? <div className='h-full w-full flex items-center justify-center'>
                <div className="relative flex items-center justify-center w-5 h-5">
  {/* <!-- Background outline --> */}
  <div className="absolute w-full h-full rounded-full border-4 border-gray-300"></div>
  {/* <!-- Rotating border --> */}
  <div className="w-full h-full rounded-full border-4 border-blue-400 border-t-transparent border-b-transparent  animate-spin"></div>
</div>
</div>: disableSwitch? "submitted" : "submit"}</button>
  {responseSentence && <motion.div
  initial={{scale:1.5}} animate={{scale:1}} transition={{duration:0.6, ease:'easeInOut'}}
  className='italic font-semibold text-md pt-5  my-auto'>{responseSentence}</motion.div>}

            </div>
          </form>
    </div>
  )
}

export default Touchusform
