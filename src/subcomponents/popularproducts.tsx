import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Scrollbar } from 'swiper/modules';
import '../index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Productcard from '@/subcomponents/productcard';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


interface Item {
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
const popularproducts = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string|null>(null);

  const fetchProducts = async () => {
    try{
    let response = await fetch('/items/popularproducts')
     
        if (!response.ok) {
          // Handle HTTP errors
          if (response.status === 404) {
              throw new Error("Product not found.");
          } else {
              const errorResponse = await response.json(); // Await the JSON parsing
              throw new Error(errorResponse.message || "An error occurred.");
          }
      }          
      const products = await response.json(); // Await the JSON parsing for successful response
      setItems(products);
    }
    catch(error){
        console.error('Error fetching products:', (error as Error).message);
        setError((error as Error).message);
      };
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // let sampleobj = {
  //   _id: '1',
  //   name: "Kids' Velcro Sneakers",
  //   category: 'kids',
  //   price: 40,
  //   availableSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // };

  return (
    <div className='bg-gray-200 dark:bg-black'>
      <motion.p
        initial={{ scale: 0 }}
        whileInView={{
          scale: 1,
          transition: {
            duration: 0.7,
          },
        }}
        viewport={{ once: false }}
        className='font-blackOpsOne text-center md:text-[6.667vw] text-[7.5vw] py-8'
      >
        DISCOVER BEST SNICKERS WITHOUT LIMITATIONS
      </motion.p>
      <div className='min-h-fit p-5'>
        {error ? (
          <div className='text-red-500 text-center'>{error}</div>
        ) : (
          <Swiper
            modules={[Navigation, Scrollbar]}
            slidesPerView={1}
            spaceBetween={10}
            navigation={{
              nextEl: '.swipernext',
              prevEl: '.swiperprev',
            }}
            scrollbar={{ draggable: true, el: '.custom-scrollbar' }}
            breakpoints={{
              460: {
                slidesPerView: 2,
              },
              670: {
                slidesPerView: 3,
              },
              1100: {
                slidesPerView: 4,
              },
              1500: {
                slidesPerView: 5,
              },
              2050: {
                slidesPerView: 6,
              },
            }}
          >
            {items.length > 0 ? (
              items.map((item) => (
                <SwiperSlide key={item._id}>
                  <Productcard  {...item}/>
                </SwiperSlide>
              ))
            ) :   <div className="w-full h-full grid place-items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
          </div>}
          </Swiper>
        )}
        <div className='flex justify-between m-3'>
          <div className='swiperprev p-2 rounded-full hover:bg-blue-100 cursor-pointer'>
            <ArrowLeft className='text-[#10C4E0]' strokeWidth={3} size={35} />
          </div>
          <div className='swipernext p-2 rounded-full hover:bg-blue-100 cursor-pointer'>
            <ArrowRight className='text-[#10C4E0]' strokeWidth={3} size={35} />
          </div>
        </div>
        <div className='custom-scrollbar mt-6 h-2'></div>
      </div>
    </div>
  );
};

export default popularproducts;