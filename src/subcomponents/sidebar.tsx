import {useNavigate} from 'react-router-dom'
// import { SidebarCart } from '@/subcomponents/sidebarcart'

import{
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import Modetoggle from '@/subcomponents/mode-toggle.tsx'
  import {useState, useEffect} from 'react'
  import Accountpart from '@/subcomponents/accountpart.tsx'
  

  import { Link } from "react-router-dom";
  import { ChevronDown, ChevronUp,Footprints,  House, Menu, Hammer} from 'lucide-react';

  interface SidebarProps {
    handleCategoryNavigation: (category: string | null) => void;
  }
  

const Sidebar:React.FC<SidebarProps> = ({handleCategoryNavigation}) => {
  

    const [issidebarOpened, setissidebarOpened ] = useState<boolean>(false)
    const[authorizedContext, setauthorizedContext] = useState<boolean>(true)
    useEffect(() => {
        setauthorizedContext(false)
    }, []);

    let navigate=useNavigate();

  return (
    
      <Sheet>
  <SheetTrigger asChild><Menu/></SheetTrigger>
  <SheetContent side="left" className="py-6 pr-3 pl-4 bg-gray-200 dark:bg-zinc-900 md:hidden ">
    <SheetHeader className="pb-4">
      <SheetTitle asChild><div className=" flex justify-start items-center gap-2 "><img className='h-10' src='/staticassets/ahfitlogotransparentlight.png'/></div></SheetTitle>
      <SheetDescription className="text-justify pt-2">
      Step into a world of style and comfort at your shoe store, where every pair is handpicked to offer quality, fashion, and affordability for all
      </SheetDescription>
      {/* theme functionality */}
      <div className="flex w-full justify-end items-center">
            {/* <SheetClose asChild>
              <div>
                <SidebarCart />
              </div>
            </SheetClose> */}
            <p className='tracking-wider font-bold text-gray-500 dark:text-zinc-400 pr-1'>Theme </p>
            <Modetoggle/>
          </div>
        </SheetHeader>
    

    {/* Sheet content */}
    
    <div className="flex flex-wrap text-sm">
    <SheetClose asChild className='basis-1/2'>
    <Link to='/' className=' flex items-center gap-2 hover:font-semibold  hover:scale-110 transition-transform  transform origin-bottom-left  py-2  rounded-md cursor-pointer'><House size={16}/><p>Home</p></Link>
    </SheetClose>
              {/* shoes portion */}
              
              <DropdownMenu onOpenChange={():void=>setissidebarOpened(!issidebarOpened) }>
  <DropdownMenuTrigger ><div className='flex items-center gap-2 hover:font-semibold  hover:scale-110 transition-transform  transform origin-bottom-left  py-2 rounded-md cursor-pointer'><Footprints size={20}/><p>Shoes</p>
  {issidebarOpened? <ChevronUp size={18}/>:
  <ChevronDown size={18}/>
}
  
  </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent  onCloseAutoFocus={(event):void=>
    event?.preventDefault()
  } className="bg-gray-300 dark:bg-zinc-950 w-[10rem]">
 
  
    <DropdownMenuLabel className='text-center'>Category</DropdownMenuLabel>
    <DropdownMenuSeparator className='bg-gray-200 dark:bg-zinc-800'/>
    <SheetClose asChild >
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation(null); navigate('/products')}} className='cursor-pointer'>ALL</DropdownMenuItem>
    </SheetClose>
    <SheetClose asChild >
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation('men'); navigate('/products')}} className='cursor-pointer'>MEN</DropdownMenuItem>
    </SheetClose>
    <SheetClose asChild >
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation('women'); navigate('/products')}} className='cursor-pointer'>WOMEN</DropdownMenuItem>
    </SheetClose>
    <SheetClose asChild>
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation('kids'); navigate('/products')}} className='cursor-pointer'>KIDS</DropdownMenuItem>
    </SheetClose> 
  </DropdownMenuContent>
</DropdownMenu>

              {/* shoes portion ends */}
 {/* <SheetClose asChild className='basis-1/2'>
  <div className=' flex items-center gap-2 hover:font-semibold transition-transform   hover:scale-110 transform origin-bottom-left  py-2  rounded-md cursor-pointer'><Shirt size={16} /><p> Accesories</p></div>
  </SheetClose> */}
  <SheetClose asChild className='basis-1/2'>
  <Link to="/custom" className=' flex items-center gap-2 hover:font-semibold transition-transform  hover:scale-110 transform origin-bottom-left  py-2  rounded-md cursor-pointer text-nowrap'><Hammer size={20}/><p>Custom</p></Link>
  </SheetClose>
  </div>

  <SheetFooter className="absolute bottom-0 flex flex-col">
  {
    authorizedContext?<Accountpart/>:(<><div className="flex items-center"><Accountpart/>Your Account</div>
    <div>
    <Link  to="/login" className="text-blue-600 underline text-xs pl-2"> Login</Link> or <Link className="text-blue-600 underline text-xs" to="/signup" >SignUp</Link>
    </div> 
    </>)

  }


  </SheetFooter>
  </SheetContent>
  
</Sheet>
    
  )
}

export default Sidebar
