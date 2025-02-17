// import { useState } from 'react'
import Uppernav from '@/subcomponents/uppernav.tsx'
import Accountpart from '@/subcomponents/accountpart.tsx'
import Modetoggle from '@/subcomponents/mode-toggle.tsx'
import Sidebar from  '@/subcomponents/sidebar.tsx'
import { SidebarCart } from '@/subcomponents/sidebarcart'
// import { motion } from "motion/react"
//importing shadCN dropdowen
import {Link, useNavigate} from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ChevronDown, Footprints,  House, Hammer} from 'lucide-react';

interface NavbarProps {
  handleCategoryNavigation: (category: string | null) => void;
}



const Navbar:React.FC<NavbarProps> = ({handleCategoryNavigation}) => {

    // const [isMenuOpen, setIsMenuOpen] = useState(false)
  let navigate=useNavigate();

  return (
    <header>
      <Uppernav/>
      
      <nav className="bg-gray-200 dark:bg-black">
      <div className=" px-2 ">
        <div className="flex justify-between items-center h-20 ">
          <div className='h-[50px]  pl-1'> <Link to='/'><img  className="sm:h-[50px] h-[40px]  bg-transparent "  src="/staticassets/ahfitlogotransparentlight.png" alt="AHFit" /></Link>     
    
       </div>
          
            {/* mid portion of Navbar */}
          <div className="hidden md:block  ">
            
              <div className="flex align-items-center content-center md:gap-4 lg:gap-6 ">
              <Link to='/' className='flex items-center gap-1 hover:bg-gray-100 hover:dark:bg-zinc-800  py-1 px-2 rounded-md cursor-pointer'><House size={16}/><p>Home</p></Link>
              {/* shoes portion */}
              <DropdownMenu >
  <DropdownMenuTrigger><div className='flex items-center gap-1 hover:bg-gray-100 hover:dark:bg-zinc-800  py-1 px-2 rounded-md cursor-pointer'><Footprints size={20}/><p>Shoes</p><ChevronDown   size={18}/></div>
  </DropdownMenuTrigger>
  <DropdownMenuContent hideWhenDetached={true} onCloseAutoFocus={(event):void=>
    event?.preventDefault()
  } className="bg-gray-300 dark:bg-zinc-950 w-[10rem] ">
 
  
    <DropdownMenuLabel className='text-center'>Category</DropdownMenuLabel>
    <DropdownMenuSeparator className='bg-gray-200 dark:bg-zinc-800'/>
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation(null); navigate('/products')}} className='cursor-pointer'>ALL</DropdownMenuItem>
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation('men'); navigate('/products')}} className='cursor-pointer'>MEN</DropdownMenuItem>
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation('women'); navigate('/products')}} className='cursor-pointer'>WOMEN</DropdownMenuItem>
    <DropdownMenuItem onClick={()=> {handleCategoryNavigation('kids'); navigate('/products')}} className='cursor-pointer'>KIDS</DropdownMenuItem>    
  </DropdownMenuContent>
</DropdownMenu>
              {/* shoes portion ends */}

  {/* <div className='flex items-center gap-1 hover:bg-gray-100 hover:dark:bg-zinc-800  py-1 px-2 rounded-md cursor-pointer'><Shirt size={16} /><p> Accesories</p></div> */}
  <Link to='/custom' className='flex items-center gap-1 hover:bg-gray-100 hover:dark:bg-zinc-800  py-1 px-2 rounded-md cursor-pointer'><Hammer size={20}/><p>Custom</p></Link>

    </div>  
               
    
     </div>
      {/* mid portion of Navbar ends here*/}

      {/* Right part of navbar starts here */}
     <div className="hidden md:block pr-1 ">
     <div className="flex items-center gap-3">
               <Accountpart />
               <SidebarCart/>
               <Modetoggle/>
    </div>
        
     </div>
                  
                
{/* Sheet for mobile devices */}
<div className=' md:hidden pr-1 cursor-pointer flex gap-4'><SidebarCart/> <Sidebar handleCategoryNavigation={handleCategoryNavigation}/></div>


        </div>
      </div>



      </nav>
    </header>
  )
}

export default Navbar
