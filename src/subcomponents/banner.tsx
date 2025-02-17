// import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const banner = () => {
  return (
    <>
    <div className="relative w-full h-[calc(100svh-120px)]  md:h-[calc(100svh-100px)] 
    ">
      <picture>
  {/* Mobile First (<= 465px) */}

  <source srcSet="/staticassets/bannerforlargepc.jpg" media="(min-width: 1300px)" />
  <source srcSet="/staticassets/bannerforpc.jpg" media="(min-width: 768px)" />
  <source srcSet="/staticassets/bannerformobile.jpg" media="(max-width: 425px)" />
  
  
  
  {/* Fallback Image */}
  <img src="/staticassets/bannerfortab.jpg"  className="w-full h-full object-fill" alt="AHFit banner" />
</picture>

<div 
  className="flex gap-6 min-425:gap-16 z-50 absolute
    bottom-[12%] min-425:bottom-[7%] left-1/2 -translate-x-1/2
    md:bottom-[15%] md:left-[6%] md:translate-x-0 lg:left-[11%]"
>
  <Button 
    variant="secondary"
    className="rounded-full font-semibold
      text-xs min-425:text-sm px-2 min-425:px-4
      md:text-sm md:py-2 md:px-3 
      lg:text-base lg:py-4 lg:px-5
      min-2000:text-2xl min-2000:py-8 min-2000:px-9"
    asChild
  >
    <Link to="/products">SHOP&nbsp;NOW</Link>
  </Button>
  <Button 
    className="rounded-full font-semibold
      text-xs min-425:text-sm px-2 min-425:px-4
      md:text-sm md:py-2 md:px-3
      lg:text-base lg:py-4 lg:px-5
      min-2000:text-2xl min-2000:py-8 min-2000:px-9"
    asChild
  >
    <Link to="/custom">Explore Custom Designs</Link>
  </Button>
</div>


    </div>

  
    
     </>
  )
}

export default banner
