import { MapPin ,  Mail, PhoneCall,  ArrowUpFromLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Footerprops{
    navbarRef: React.RefObject<HTMLElement>,
    handleScrollToFAQ: () => void
}

const Footer :React.FC<Footerprops>= ({navbarRef, handleScrollToFAQ}) => {
  const navigate = useNavigate();

  const handleFAQClick = () => {
    navigate('/custom', { replace: false });
    // Add a small delay to ensure navigation completes
    setTimeout(() => {
      handleScrollToFAQ();
    }, 100);
  };

     const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth" });
        }
      };
  return (
    <div className="h-max w-full bg-gray-200 dark:bg-black px-4 pb-[12px] pt-32  ">
        <div >
      <div className="w-full h-fit max-460:p-2 p-4 flex items-center  bg-neutral-400 dark:bg-zinc-900 rounded-t-3xl">
        <img src="/staticassets/ahfitroundlogo.png" className="h-12 sm:h-14 rounded-full mr-4 hidden min-500:block "/>
        <div className="h-8 w-[2px] bg-black dark:bg-white hidden min-500:block"></div>
        <div className="italic font-semibold justify-self-end grow text-center  hidden min-870:block"><span className="font-bold text-2xl">" </span>Great shoes aren't just made, they're crafted with purpose, built to carry dreams step by step<span className="font-bold text-2xl">" </span></div>
        <div className="italic  font-semibold justify-self-end grow text-center text-sm sm:text-base max-460:hidden block min-870:hidden"><span className="font-bold text-2xl">" </span>Stitch by stitch, dreams are woven into every sole<span className="font-bold text-2xl">" </span></div>
        <div className="italic  font-semibold justify-self-end grow text-center text-sm sm:text-base max-460:block hidden"><span className="font-bold text-2xl">" </span>Soles crafted, journeys yet unwritten.<span className="font-bold text-2xl">" </span></div>
       
      </div>
      <div className='bg-gradient-to-bl from-stone-200 to-stone-600 dark:from-slate-900 dark:to-black h-max'>
      <div className="flex gap-3 w-full h-max p-5 ">
        <div className="grow md:basis-1/2 flex flex-col gap-y-4 text-sm min-500:text-base">
        <div className="text-2xl min-500:text-3xl lg:text-4xl font-semibold">Get in touch</div>
        <div className='flex items-center gap-2 pr-4'><MapPin/> <p className='font-medium'>01/Main Street, Simly Dam Road, Islamabad, PK. </p></div>
        <div className='flex items-center gap-2'><Mail size={21}/> <p className='font-medium italic'>info@ahfits.com</p></div>
        <div className='flex items-center gap-2'><PhoneCall size={21}/> <p className='font-medium'>+92 300 5551246</p></div>
        <div className="block md:hidden">
        <div className='pl-1 flex gap-4 w-full items-center'>
       <a className='hover:scale-125 transition-transform duration-200 font-medium flex gap-2 items-center'><img src="/stable/images/instagram.svg" className='h-6 w-6'/></a>
       <a className='hover:scale-125 transition-transform duration-200 font-medium flex gap-2 items-center'><img src="/stable/images/tiktok.svg" className='h-6 w-6'/></a>
       <a className='hover:scale-125 transition-transform duration-200 font-medium flex gap-2 items-center'><img src="/stable/images/facebook.svg" className='h-6 w-6'/></a>
       <a className='hover:scale-125 transition-transform duration-200 font-medium flex gap-2 items-center'><img src="/stable/images/whatsapp.svg" className='h-6 w-6'/></a>
       </div>
        </div>
       
        </div>
        <div className='md:basis-1/4 max-400:hidden block'>
        <div className="flex flex-col  gap-y-4 w-max pr-0 min-500:pr-5 md:pr-0 text-sm min-500:text-base">
        <div className="text-2xl min-500:text-3xl lg:text-4xl font-semibold underline-offset-4 underline ">Company</div>
       <p className='hover:underline hover:underline-offset-4 hover:cursor-pointer font-medium'>Mission</p>
       <p className='hover:underline hover:underline-offset-4 hover:cursor-pointer font-medium'>Our People</p>
       <p onClick={handleFAQClick} className='hover:underline hover:underline-offset-4 hover:cursor-pointer font-medium'>FAQ's</p>
       <p className='hover:underline hover:underline-offset-4 hover:cursor-pointer font-medium'>Refund Policy</p>
      
        </div>
        </div>
        <div className='basis-1/4 hidden md:block'>
        <div className="flex flex-col gap-y-4">
        <div className="text-3xl lg:text-4xl font-semibold underline-offset-4 underline">Socials</div>
       <a className='hover:underline hover:underline-offset-4 cursor-pointer font-medium flex gap-2 items-center'><img src="/stable/images/instagram.svg" className='h-6 w-6'/><p >Instagram</p></a>
       <a className='hover:underline hover:underline-offset-4 cursor-pointer font-medium flex gap-2 items-center'><img src="/stable/images/tiktok.svg" className='h-6 w-6'/><p >Tiktok</p></a>
       <a className='hover:underline hover:underline-offset-4 cursor-pointer font-medium flex gap-2 items-center'><img src="/stable/images/facebook.svg" className='h-6 w-6'/><p >Facebook</p></a>
       <a className='hover:underline hover:underline-offset-4 cursor-pointer font-medium flex gap-2 items-center'><img src="/stable/images/whatsapp.svg" className='h-6 w-6'/><p >Whatsapp</p></a>
        </div>
        </div>        
       </div>
       <div className=" h-[1.5px] bg-black dark:bg-white mx-14 "></div>
       <div className="flex px-5 min-500:px-14 py-4 text-xs min-500:text-base">
        <div className='font-medium grow pr-2'>Copyright&copy; AHFit 2025.<span className=' hidden lg:inline'> All rights reserved.</span> </div>
       <pre className="font-semibold basis-1/4 text-end md:text-start hover:underline cursor-pointer hover:underline-offset-4">Privacy Policy</pre>
       <div onClick={ ()=>scrollToSection(navbarRef) } className="font-medium hover:underline hover:underline-offset-4 hover:cursor-pointer basis-1/4 text-end hidden md:block">Back to Top <ArrowUpFromLine size={22} className='inline'/></div>
       </div>
       </div>
      </div>
    </div>
  )
}

export default Footer
