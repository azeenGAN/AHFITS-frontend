import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp,Filter  } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "motion/react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Productcard from '@/subcomponents/productcard';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface Item {
  _id: string;
  name: string;
  price: number;
  availableSizes: number[];
  category: string;
}
interface ProductsProps {
  whichCategoryFilter: string|null;
}
const Products:React.FC<ProductsProps> = ({whichCategoryFilter}) => {

  const [isCategoryExpanded, setisCategoryExpanded] = useState(true);
  const [isSizeExpanded, setisSizeExpanded] = useState(false);
  const [isSizeExpandedPopOver, setisSizeExpandedPopOver] = useState(true);
  const [isPriceExpanded, setisPriceExpanded] = useState(false);
//loading state
const [loading, setLoading] = useState<boolean>(false);
  //main query state variable
  const [items, setItems] = useState<Item[] | null>(null);
  // const [isPending, startTransition] = useTransition();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [initialCategoryApplied, setInitialCategoryApplied] = useState(false);

  // useRefs array
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleCategoryFirstlyApplied = (whichCategory: string | null) => {
    if (whichCategory === null) {
     clearAllFilters()
    }
    else setSelectedCategories([whichCategory]);

    setInitialCategoryApplied(true);
  };

  const fetchProducts = async (categories: string[], sizes: number[], priceRange: string) => {
    setLoading(true);
    console.log('Fetching products with filters:', { categories, sizes, priceRange });

    const categoryQuery = categories.length > 0 ? `categories=${categories.join(',')}` : '';
    const sizeQuery = sizes.length > 0 ? `sizes=${sizes.join(',')}` : '';
    const priceQuery = priceRange ? `priceRange=${priceRange}` : '';
    const query = [categoryQuery, sizeQuery, priceQuery].filter(Boolean).join('&'); 
 
   
      fetch(`/items?${query}`)
        .then((res) => res.json())
        .then((products: Item[]) => {
         
            setItems(products);      
         })
        .catch((error) => {
          console.error('Error fetching products:', error.message);
        })
        .finally(() => setLoading(false));    
  };
  
  useEffect(() => {
    handleCategoryFirstlyApplied(whichCategoryFilter);
  }, [whichCategoryFilter]);

  useEffect(() => {
    if (initialCategoryApplied) {
      fetchProducts(selectedCategories, selectedSizes, selectedPriceRange);
    }
    }, [selectedCategories, selectedSizes, selectedPriceRange, initialCategoryApplied]);

  // category checkbox onChange function 
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prevCategories) => {
      if (checked) {
        return [...prevCategories, category];
      } else {
        return prevCategories.filter((cat) => cat !== category);
      }
    });
  };

  const handleCategoryChange2=(category:string)=>{
    setSelectedCategories([category])
  }
  // size checkbox onChange function 
  const handleSizeChange = (size: number) => {
    setSelectedSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  const handlePriceChange = (value:string)=>setSelectedPriceRange(value)
  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedPriceRange("");
  }
    
 

  const categoryArray = ["men", "women", "kids"];
  const sizeArray = [30,31,32,33,34,35, 36, 37,38, 39, 40, 41, 42, 43, 44,45];
  return (
    <div className="w-full min-h-svh bg-gray-200 dark:bg-black flex justify-start">
      <div className="hidden sm:block lg:w-64 lg:p-4 w-40 p-2 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <button
            className="w-full bg-stone-400 dark:bg-zinc-700 lg:p-3 p-1 text-sm font-bold flex items-center justify-between"
            onClick={() => setisCategoryExpanded(!isCategoryExpanded)}
          >
            Category
            {isCategoryExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <motion.div
          initial={{ height: 0, opacity: 0 }}
            animate={{ height: isCategoryExpanded ? 'auto' : 0, opacity: isCategoryExpanded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {categoryArray.map((cat, index) => (
                <div key={cat} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id={cat}
                    ref={(el) => (refs.current[index] = el)}//ref
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) => handleCategoryChange(cat, checked as boolean)}
                  />
                  <label
                    htmlFor={cat}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
            <button
            className="w-full bg-stone-400 dark:bg-zinc-700  lg:p-3 p-1 text-sm  text-left font-bold flex items-center justify-between"
            onClick={() => setisSizeExpanded(!isSizeExpanded)}
          >
            Size
            {isSizeExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isSizeExpanded ? 'auto' : 0, opacity: isSizeExpanded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1">
              {sizeArray.map((size) => (
                <div
                  key={size}
                  className={`w-8 h-8 flex items-center justify-center cursor-pointer border ${selectedSizes.includes(size) ? 'bg-stone-600 text-white' : 'bg-white text-black'}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </motion.div>
          {/* price filter section */}
          <button
            className="w-full bg-stone-400 dark:bg-zinc-700 lg:p-3 p-1 text-sm  text-left font-bold flex items-center justify-between"
            onClick={() => setisPriceExpanded(!isPriceExpanded)}
          >
            Price
            {isPriceExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isPriceExpanded ? 'auto' : 0, opacity:isPriceExpanded ?1:0  }}
            transition={{ duration: 0.5 }}
           className='overflow-hidden'
          >
            <RadioGroup value={selectedPriceRange}  onValueChange={handlePriceChange}>
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem value="0,100" id="0,100" />
                <Label htmlFor="0,100">0 to 100&euro;</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100,200" id="100,200" />
                <Label htmlFor="100,200">100&euro; to 200&euro;</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="200,300" id="200,300" />
                <Label  htmlFor="200,300">200&euro; to 300&euro;</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="300,400" id="300,400" />
                <Label  htmlFor="300,400">300&euro; to 400&euro;</Label>
              </div>
            </RadioGroup>
          </motion.div>
          <Button onClick={()=> clearAllFilters()} className='pl-1 text-stone-600 sm:text-sm md:text-base hover:font-bold' variant="link">Clear all</Button>
      </div>
      </div>
      
      <div className="flex-1 p-4">
      <div className="sm:hidden block w-full">
      
      
      <div className="flex flex-row w-full pb-5">
        {/* mobile pop-over category filter */}
        <Popover>
  <PopoverTrigger><Filter  className='text-gray-500 mr-2 '/></PopoverTrigger>
  <PopoverContent side="right" align='start' className='w-[210px] bg-gray-100'> <div className="space-y-2">
          
         
            <button
            className="w-full bg-stone-400 dark:bg-zinc-700  lg:p-3 p-1 text-sm  text-left font-bold flex items-center justify-between"
            onClick={() => setisSizeExpandedPopOver(!isSizeExpandedPopOver)}
          >
            Size
            {isSizeExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isSizeExpandedPopOver ? 'auto' : 0, opacity: isSizeExpandedPopOver ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1">
              {sizeArray.map((size) => (
                <div
                  key={size}
                  className={`w-8 h-8 flex items-center justify-center cursor-pointer border ${selectedSizes.includes(size) ? 'bg-stone-600 text-white' : 'bg-white text-black'}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </motion.div>
          {/* price filter section */}

          <button
            className="w-full bg-stone-400 dark:bg-zinc-700 lg:p-3 p-1 text-sm  text-left font-bold flex items-center justify-between"
            onClick={() => setisPriceExpanded(!isPriceExpanded)}
          >
            Price
            {isPriceExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isPriceExpanded ? 'auto' : 0, opacity:isPriceExpanded ?1:0  }}
            transition={{ duration: 0.5 }}
           className='overflow-hidden'
          >
            <RadioGroup value={selectedPriceRange}  onValueChange={handlePriceChange}>
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem value="0,100" id="0,100" />
                <Label htmlFor="0,100">0 to 100&euro;</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100,200" id="100,200" />
                <Label htmlFor="100,200">100&euro; to 200&euro;</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="200,300" id="200,300" />
                <Label  htmlFor="200,300">200&euro; to 300&euro;</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="300,400" id="300,400" />
                <Label  htmlFor="300,400">300&euro; to 400&euro;</Label>
              </div>
            </RadioGroup>
          </motion.div>
          <Button onClick={()=> clearAllFilters()} className='pl-1 text-stone-600 sm:text-sm md:text-base hover:font-bold' variant="link">Clear all</Button>
      </div></PopoverContent>
</Popover>
        
        
    {categoryArray.map((category) => (
      <div key={category} onClick={() => handleCategoryChange2(category)} className="flex-1  py-1">
        <div className={`w-full text-center py-1 font-bold hover:bg-gray-100 dark:hover:bg-zinc-900 ${selectedCategories.includes(category) ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'} cursor-pointer`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
        <div className={`h-[1px] w-full ${selectedCategories.includes(category) ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
      </div>
    ))}
  </div>
</div>
          {/* product items */}
{loading? <div className="w-full h-full grid place-items-center">
  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
</div>:items && items.length > 0 ? (
  <div className="grid gap-y-6 gap-x-2 max-460:grid-cols-1 grid-cols-2 min-850:grid-cols-3 largeScreens:grid-cols-4 place-items-center">
  {items.map((item) => <Productcard key={item._id} {...item}/>)}
              </div>
      ):
      items && items.length === 0 && <div className="text-lg text-red-500 font-bold italic">Sorry, No product with selected filters.</div> 
      }               
      
      </div>
    </div>
  );
};

export default Products;
