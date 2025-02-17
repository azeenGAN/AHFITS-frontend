// import React from 'react'
// import { Link } from "react-router-dom"
import { MoveRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card"
import { Link } from 'react-router-dom';

interface ProductcardProps {
  // image: string;
  _id: string;
  name: string;
  price: number;
  availableSizes: number[];
  category: string;
  productimage?:{
    filename: string;
    data: any; // Consider using a more specific type if possible (e.g., Buffer)
    type: string;
  }
  
}

const Productcard:React.FC<ProductcardProps>  = ({_id, name, category, price,availableSizes,  productimage}) => {
  return (<div>
    <div   className='max-460:hidden flex flex-col w-[200px] lg:w-[240px] gap-0 ' >
      <img className='object-center object-cover aspect-square' src={productimage? `data:${productimage!.type};base64,${productimage!.data}` : '/staticassets/cardimgsample.jpg'} alt='product card'/>
        <div className='border-l-4 border-dashed border-r-0 border-t-0 border-b-4 border-[#10C4E0] flex flex-col w-full max-h-fit bg-gray-100 dark:bg-zinc-800  pl-3 border'>
            <p className='lg:pt-5 pt-3 text-sm font-semibold '>{name}</p>
            <p className=' lg:pt-2 pt-1 text-sm font-semibold text-gray-700 dark:text-gray-400'>{category.charAt(0).toUpperCase()+category.slice(1)}</p>
            <p className=' lg:pt-2 pt-1 text-sm font-semibold '><span className='text-base lg:text-lg'>size</span> <span className='text-xs lg:text-sm'>= { availableSizes.map((size) => ` ${size},`)}</span></p>
            <p className='lg:pt-2 pt-1 text-lg font-bold'>&#8364;{price}</p>
            
            <Link to={`/products/${_id}`} className='lg:pt-3 pr-7 pb-3 self-end text-lg font-semibold cursor-pointer hover:scale-125 transition-transform duration-200'>< MoveRight className='inline '/> See</Link>
        </div>
    </div>
    {/* for mobile */}
    <Card onClick={()=> console.log(_id)} className="rounded-sm max-460:block hidden w-full max-w-sm overflow-hidden">
      <CardContent className="p-0 bg-slate-300 dark:bg-zinc-800">
        
          {/* Image with padding/frame effect */}
          <div className="px-3 pt-3">        
           <img className='object-center object-cover aspect-square' src={productimage? `data:${productimage!.type};base64,${productimage!.data}` : '/staticassets/cardimgsample.jpg'} alt='product card'/>
           </div>
          
          {/* Product info */}
          <div className="p-3">
            <div className="flex justify-between">
              <h3 className="font-semibold text-sm">{name}</h3>
              <p className="text-lg font-bold">€{price}</p>
            </div>           
            <div className="flex justify-between pt-1">

              {/* category */}
              <p className="text-sm text-muted-foreground text-gray-800">{category.charAt(0).toUpperCase()+category.slice(1)}'s Shoes</p>
             
              <Link to={`/products/${_id}`} className='bg-black text-white text-xs px-2 py-1 hover:underline bg-gradient-to-r from-zinc-600 to-black'>See Detail</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  
    </div>
    
  )
}

export default Productcard
