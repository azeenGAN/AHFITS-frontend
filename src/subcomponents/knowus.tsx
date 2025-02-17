
import Touchusform from "./touchusform"
const Knowus = () => {
  return (
    <div className='bg-gray-200 dark:bg-black pt-5'>
        
      <p className="text-[6.5vw] md:text-[4.167vw]  pt-10 font-semibold underline underline-offset-8 text-center pb-5">Get to know AHFIT</p>
      
       
        <div className="w-full ">
           
        <p className="lg:px-16 px-5 py-5 sm:text-2xl sm:text-justify text-left">Founded in 2014, GentlemanCrafts began as a vision to celebrate individuality and self-expression through custom footwear. Our mission is to inspire confidence and creativity, empowering every gentleman to walk their own path with style and conviction.
        </p>
</div>

   

    {/* </div> */}


<div className="grid lg:grid-cols-2 lg:grid-rows-1 grid-col-1 grid-row-2 gap-5 mt-5 bg-black ">
<div className=" lg:order-1 order-2 flex flex-col items-center text-white"><Touchusform/>
<div className="px-4 self-start hidden lg:block">
  <ul className="list-disc pl-4 mt-5 text-base space-y-3">
   <li> <b className="text-lg text-[#10C4E0]">Tailored for Your Team:</b>  Custom-designed shoes crafted to reflect your company's identity and employee needs.
   </li>
   
<li>
  <b className="text-lg text-[#10C4E0]">Exceptional Comfort & Quality:</b> Premium materials and ergonomic designs ensure maximum comfort and durability.
</li>
<li>
  <b className="text-lg text-[#10C4E0]">Bulk Orders Made Easy:</b> Streamlined ordering process for corporate clients with flexible customization options.
</li>
<li>
  <b className="text-lg text-[#10C4E0]">Employee-Centric Designs:</b> Personalized shoes for your workforce to enhance style and team spirit.
</li>
<li>
  <b className="text-lg text-[#10C4E0]">Sustainable & Ethical Practices:</b> Commitment to eco-friendly materials and ethical production standards.
</li>
  </ul>
  
  </div>
</div>
<div className="lg:order:2 order-1 flex flex-col lg:items-end items-center">
<img src='/stable/images/bgcheck.jpg' className=" w-full object-contain " alt="Our Making"></img>
<img src='/stable//images/knowusimg2.png' className="w-full object-contain "></img>
</div>
</div>
{/* <p>Choose GentlemanCrafts to make a statement that's unmistakably yours. Step into a world where tradition meets innovation, and style knows no limits.</p> */}
      
   
    </div>
  )
}

export default Knowus
