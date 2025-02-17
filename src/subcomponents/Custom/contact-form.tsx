import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, Controller } from "react-hook-form";
//phone number input imports
import 'react-phone-number-input/style.css'
import PhoneInput,{	isPossiblePhoneNumber
} from 'react-phone-number-input'
import { motion } from "motion/react"



// type FileWithPreview = {
//   file: File;
//   preview: string;
// };

interface FormDataType {
  gender: string;
  firstname: string;
  Lastname: string;
  company: string;
  houseStreet: string;
  localArea: string;
  city: string;
  country: string;
  pairs: number;
  images?: File[];
  phone: string;
  email: string;
  notes?: string;
  permission: string;
}

export function ContactForm() {

  const [responseSentence, setResponseSentence] = useState<any>()
      const [isPending, setisPending] = useState<boolean>(false)
      const [disableSwitch, setdisableSwitch] = useState<boolean>(false)
      // image files array
      const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
      //ref for reset previewimage state
      const resetPreviewsRef = useRef<() => void>(() => {});


      let handleSelectedFiles = (some:File[])=>{
        setSelectedFiles(some)
      }
  const {
    register,
    handleSubmit,        
    formState: { errors },
    control,
    reset,
  } = useForm<FormDataType>()

  // const [phoneNo, setphoneNo] = useState<string | undefined>()
  // const [phoneError, setphoneError] = useState<boolean>(true)

  // const handlePhoneNo = (value:string | undefined) => {
  //   setphoneNo(value)
  //   if(value){
  //   setphoneError(isPossiblePhoneNumber(value))
  //   }
  // }

  const onSubmit= async (data:FormDataType) => {
  
    console.log(data)
    // if(recaptchaSucess){
    // localStorage.setItem('userData', JSON.stringify(data));
    setisPending(true)

    const formdata= new FormData()

    for (const [key,value] of Object.entries(data)) {
      formdata.append(key, value)
      }
        // Append image files to FormData
  if (selectedFiles.length > 0) {

    selectedFiles.forEach((file) => {
      formdata.append('images', file); // 'images' is the field name to receive the files

    });
  }
console.log(formdata);
     fetch("/mutlerdata/freequote", {
      method: 'POST',
      body: formdata
    })
    .then(res => {
      if (!res.ok) {
        // If status is not 200, throw an error with the status text
       return res.json()
        .then((errormsg) => {throw new Error(`ERROR: ${errormsg.message}`)})
         
      }
      return res.json(); // Parse JSON if the response is ok
    })

      .then((sentence) => {
        setResponseSentence(sentence.message)        
        setdisableSwitch(true)
        setisPending(false)
        reset()//resetting formstate after sucessfull submission
        resetPreviewsRef.current(); // Reset the previews

      })    
      .catch((error) => {
        setResponseSentence(
          error.message ?
            <span className='text-red-500 '>{error.message}</span> : 'unknown error')
            setisPending(false)
          })
      // }
      // else {
      //   setResponseSentence("Please verify the reCAPTCHA")
      // }
    
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-12 place-items-center ">
      <Card>
        <CardContent className="p-6 ">
          <div className="space-y-4 flex flex-col">
            <h3 className="text-lg font-semibold">Your contact person:</h3>
            <img
              src="/stable/images/salesrep.jpeg"
              alt="Franziska Buchele"
            
              className="rounded-lg object-cover object-center h-[250px] md:h-fit md:w-fit self-center"
            />
            <div>
              <p className="font-medium">Franziska Buchele</p>
              <a 
                href="mailto:aazeenahmad@AHFit.com"
                className="text-sm text-blue-600 hover:underline"
              >
                Franziska Buchele@AHFits.com
              </a>
              <p className="text-sm text-gray-500">Tel: +49 1234 567890</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Please feel free to request drafts and a quote free of charge.</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
            name="gender"
            defaultValue="Miss"
            control={control}
            rules={{ required: "Gender selection is required" }}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mr" id="Mr" />
                  <Label htmlFor="Mr">Mr</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Miss" id="Miss" />
                  <Label htmlFor="Miss">Miss</Label>
                </div>
              </RadioGroup>
            )}
          />

          {errors.gender && <p className="text-red-500 font-normal text-sm pt-2">{String(errors.gender.message)}</p>}


          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input {...register("firstname", { required: { value: true, message: "Must fill this field" }, minLength: { value: 3, message: "Min length is 3 words" }, maxLength:{value: 50, message:"Max length is 50 words" } })} id="firstName"  />
              {errors.firstname && <p className="text-red-500 font-normal text-sm">{String(errors.firstname.message)}</p>}

            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input {...register("Lastname", { required: { value: true, message: "Must fill this field" }, minLength: { value: 3, message: "Min length is 3 words" }, maxLength:{value: 50, message:"Max length is 50 words" } })}  id="lastName"  />
              {errors.Lastname && <p className="text-red-500 font-normal text-sm">{String(errors.Lastname.message)}</p>}

            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input {...register("company", { required: { value: true, message: "Must fill this field" }, minLength:{value: 3, message:"Min length is 3 words" }, maxLength:{value: 40, message:"Max length is 40 words" } } )} id="company" />
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
    <Label htmlFor="houseStreet">House & Street No.</Label>
    <Input
      {...register("houseStreet", {
        required: { value: true, message: "House and street number is required." },
        minLength: { value: 5, message: "Must be at least 5 characters long." },
        maxLength:{value: 60, message:"Max length is 60 words" }
      })}
      id="houseStreet"
      placeholder="e.g., 123 Main St"
    />
    {errors.houseStreet && (
      <p className="text-red-500 font-normal text-sm">
        {String(errors.houseStreet.message)}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label htmlFor="localArea">Local Area</Label>
    <Input
      {...register("localArea", {
        required: { value: true, message: "Local area is required." },
        minLength: { value: 6, message: "Must be at least 6 characters long." },
      })}
      id="localArea"
      placeholder="e.g., Green Valley"
    />
    {errors.localArea && (
      <p className="text-red-500 font-normal text-sm">
        {String(errors.localArea.message)}
      </p>
    )}
  </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
    <Label htmlFor="city">City</Label>
    <Input
      {...register("city", {
        required: { value: true, message: "City is required." },
        pattern: { value: /^[A-Za-z\s]+$/, message: "City must contain only letters." },
        minLength: { value: 3, message: "Must be at least 3 characters long." },
        maxLength:{value: 50, message:"Max length is 50 words" }

      })}
      id="city"
      placeholder="e.g., Los Angeles"
    />
    {errors.city && (
      <p className="text-red-500 font-normal text-sm">{String(errors.city.message)}</p>
    )}
  </div>

  <div className="space-y-2">
    <Label htmlFor="country">Country</Label>
    <Input
      {...register("country", {
        required: { value: true, message: "Country is required." },        pattern: { value: /^[A-Za-z\s]+$/, message: "Country must contain only letters." },
        maxLength:{value: 100, message:"Max length is 50 words" },         minLength:{value: 3, message:"Min length is 3 words" }
      })}
      id="country"
      placeholder="e.g., United States"
    />
    {errors.country && (
      <p className="text-red-500 font-normal text-sm">{String(errors.country.message)}</p>
    )}
  </div>
</div>

<div className="space-y-2">
  <Label htmlFor="pairs">Number of pairs</Label>
  <Input
    {...register("pairs", {
      required: { value: true, message: "Number of pairs is required." },
      validate: {
        isPositive: (value) =>
          Number(value) > 0 || "The number must be greater than 0.",
        isInteger: (value) =>
          Number.isInteger(Number(value)) || "The number must be an integer.",
      },
    })}
    id="pairs"
    type="number"
    placeholder="Enter the number of pairs"
  />
  {errors.pairs && (
    <p className="text-red-500 font-normal text-sm">{String(errors.pairs.message)}</p>
  )}
</div>

<div className="space-y-2">

 < ImageUpload handleSelectedFilesfunc={handleSelectedFiles } resetPreviewsRef={resetPreviewsRef}/>
</div>

{/* phone number input */}
          <div className="space-y-2 text-black dark:text-black">
            <Label htmlFor="phone">Phone</Label>
            <Controller
        name="phone"
        control={control}
        rules={{
          required: { value: true, message: "Phone number is required." },
          validate: (value) =>
            isPossiblePhoneNumber(value) || "Invalid phone number.",
        }}
        render={({ field }) => (
          <PhoneInput
            international
            countryCallingCodeEditable={false}

            defaultCountry="DE"
            value={field.value}
            onChange={field.onChange}
            // placeholder="Enter phone number"
          />
        )}
      />
 {/* {!phoneError && <p className="text-red-500 font-normal text-sm">Invalid phone number</p>}  */}
{errors.phone && (
    <p className="text-red-500 font-normal text-sm">{String(errors.phone.message)}</p>
  )}
            </div>

          <div className='flex flex-col justify-start gap-y-2'>
                <label htmlFor='E-mail' className='text-md' >E-mail Adress</label>
                <Input type="email" id='E-mail' className='placeholder:text-sm placeholder:pl-2 rounded-sm px-2 text-black focus:ring-2 focus:outline-none   focus:ring-zinc-400' placeholder='E-mail' 

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


          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea  {...register('notes', {
                   
                    maxLength: {
                      value: 500,
                      message: 'Notes must be less than 500 characters long'
                    }
                  })} id="notes" />
        {errors.notes && <p className="text-red-500 font-normal text-sm">{String(errors.notes.message)}</p>}

          </div>

          <div className="flex items-start space-x-2">
            <Checkbox {...register('permission', {required:"Permission is required"})} required={true} value={"permission is granted"} id="permission" />
            <Label htmlFor="permission" className="text-sm">
              *Consent: I accept the storage of my data for the purpose of contacting me.
            </Label>
          </div>

          {/* <div className="space-y-2">
            <Label>Spam protection – Please enter the following text:</Label>
            <div className="flex gap-4 items-center">
              <code className="bg-gray-100 px-2 py-1 rounded">F XNW</code>
              <Input className="max-w-[200px]" required />
            </div>
          </div> */}

<div className="w-full flex flex-col py-6">
            <Button type="submit" className="" disabled={isPending || disableSwitch} >
                { isPending? <div className='h-full w-full flex items-center justify-center'>
                <div className="relative flex items-center justify-center w-5 h-5">
  {/* <!-- Background outline --> */}
  <div className="absolute w-full h-full rounded-full border-4 border-gray-300"></div>
  {/* <!-- Rotating border --> */}
  <div className="w-full h-full rounded-full border-4 border-blue-400 border-t-transparent border-b-transparent  animate-spin"></div>
</div>
</div>: disableSwitch? "submitted" : "Request free quote"}</Button>
  {responseSentence && <motion.div
  initial={{scale:1.5}} animate={{scale:1}} transition={{duration:0.6, ease:'easeInOut'}}
  className='italic font-bold text-md pt-5  my-auto['>{responseSentence}</motion.div>}

            </div>
        </form>
      </div>
    </div>
  )
}


//image functionality
interface Imageprops{
  handleSelectedFilesfunc : (yeah:File[]) => void,
  resetPreviewsRef: React.MutableRefObject<() => void>
}
const ImageUpload:React.FC<Imageprops> = ({handleSelectedFilesfunc,  resetPreviewsRef}) => {
  // State to store selected files, errors, and previews
  type ErrorMessages = string[];
  const [errors, setErrors] = useState<ErrorMessages>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Function to validate files
  const validateFiles = (files: File[]): ErrorMessages => {
    const newErrors: ErrorMessages = [];

    // Check number of files
    if (files.length > 3) {
      newErrors.push('You can upload a maximum of 3 images');
      return newErrors;
    }

    // Validate each file
    files.forEach((file) => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        newErrors.push(`${file.name} is not an image file`);
      }
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        newErrors.push(`${file.name} exceeds 5MB size limit`);
      }
    });

    return newErrors;
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
  
    const fileArray = Array.from(files);
    console.log("Selected files:", fileArray); // Debugging
  
    const newErrors = validateFiles(fileArray);
    console.log("Validation errors:", newErrors); // Debugging
  
    if (newErrors.length === 0) {
      handleSelectedFilesfunc(fileArray);
      // setValue('images', fileArray); // Set the selected files in the form
      console.log("Files set in state:", fileArray); // Debugging
  
      // Create preview URLs for the files
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => {
        // Clean up old preview URLs
        prev.forEach((url) => URL.revokeObjectURL(url));
        return newPreviews;
      });
      console.log("Previews set:", newPreviews); // Debugging
    }
  
    setErrors(newErrors);
  };

   // Reset previews function
   const resetPreviews = () => {
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
  };

  // Assign resetPreviews function to the ref
  resetPreviewsRef.current = resetPreviews;

  return (
    <div className="w-full ">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Upload logo images (Max 3)
        </label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 
                   file:text-sm file:font-semibold file:bg-blue-100 dark:file:bg-slate-600 file:text-blue-700 dark:file:text-blue-200
                   hover:file:bg-blue-200 w-full"
        />
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-4">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Preview Images */}
      {previews.length > 0 && (
        <div className="flex gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative aspect-square border-[1px] rounded-md border-white border-spacing-3 p-1 dark:border-white">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-[50px] h-[50px] object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


