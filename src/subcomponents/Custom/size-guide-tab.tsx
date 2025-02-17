import { memo } from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

import { Ruler } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface sizeguideprops {
  
 handleSize:(size:number|null)=>void;
}

const sizeData = [
  
    { US: 6, UK: 5, EU: 39, CM: 24.5 },
    { US: 7, UK: 6, EU: 40, CM: 25 },
    { US: 8, UK: 7, EU: 41, CM: 25.5 },
    { US: 9, UK: 8, EU: 42, CM: 26 },
    { US: 10, UK: 9, EU: 43, CM: 26.5 },

]

const SizeGuideTab:React.FC<sizeguideprops>= ({handleSize})=> {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  return (   <>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start "
          onClick={() => setIsDialogOpen(true)}
        >
          <Ruler className="mr-2 h-4 w-4" />
          Size Guide
          <span className="ml-auto text-xs text-gray-500 text-wrap max-460:hidden">Check our size guide to find the right fit.</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Find Your Perfect Shoe Size</DialogTitle>
          <DialogDescription>
            Use the tabs below to view sizes in different systems or search for your size.
          </DialogDescription>
        </DialogHeader>
        
        
          <div  className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-neutral-900">
                    <th className="border p-2">US Size</th>
                    <th className="border p-2">UK Size</th>
                    <th className="border p-2">EU Size</th>
                    <th className="border p-2">CM Length</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((size, index) => (
                    <tr
                      key={index}
                      className={`cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-900 ${
                        selectedSize === size.EU ? 'bg-blue-100  dark:bg-zinc-700' : ''
                      }`}
                      onClick={() => { 
                        setSelectedSize(size.EU) 
                        handleSize(size.EU); 
                      }}
                    >
                      <td className="border p-2">{size.US}</td>
                      <td className="border p-2">{size.UK}</td>
                      <td className="border p-2">{size.EU}</td>
                      <td className="border p-2">{size.CM} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
        
        <div className="mt-4 flex justify-between">
          <Button 
            onClick={() => {
              setShowImagePopup(true);
              setIsDialogOpen(false);
            }} 
            variant="outline"
          >
            Learn More About Shoe Sizes
          </Button>
          <Button onClick={() => {setSelectedSize(null); handleSize(null)}}>Reset Size</Button>
        </div>
      </DialogContent>
    </Dialog>

    {showImagePopup && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
        onClick={() => {
          setShowImagePopup(false);
          setIsDialogOpen(false);
        }}
      >
        <div 
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src="/stable/images/shoe-size-chart.png" 
            alt="Shoe Size Guide" 
            className="w-[800px] "
            
          />
          <Button
            className="absolute top-2 right-2"
            onClick={() => {
              setShowImagePopup(false);
              setIsDialogOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      </div>
    )}
  </>
)
}

export default memo(SizeGuideTab)
  