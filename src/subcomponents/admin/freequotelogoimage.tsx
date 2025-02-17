import {useEffect, useState} from 'react'
import Adminloading from './adminloading';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import {  Image } from 'lucide-react';
import type { logoImages } from './types';


interface freequotelogoimageProps {
    id: string;
}
const Freequotelogoimage = ({id}:freequotelogoimageProps) => {


    const [logoImages, setlogoImages] = useState<logoImages[]>([]);
    const [Imageloading, setImageLoading] = useState(false);

    function fetchLogoImages(id: string) {
        setImageLoading(true);
        fetch(`/admin/freequotelogoimages/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch logo images.");
            }
            return res.json();
          })
          .then((data) => {
            // data should be { logoimages: [...] }
            setlogoImages(data.logoimages);
           
          })
          .catch((err) => {
            console.log(err);
            setlogoImages([]);
        })
        .finally(() => setImageLoading(false));
    }

    useEffect(() => {
        fetchLogoImages(id);    
    },[]);
    

  return (   
      <Dialog>
  <DialogTrigger ><div  className="flex items-center text-sm text-blue-600">
                  <Image className="w-4 h-4 mr-1" />
                  view logo images
                </div>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Logo Images</DialogTitle>
      <DialogDescription>
    Logos of customer submitted to us by Form to make custom shoes.
      </DialogDescription>
    </DialogHeader>
    
    <Carousel>
<CarouselContent className=''>
    {Imageloading? <div className='flex w-full justify-center' >
        <Adminloading/>
    </div>:
    ( logoImages.length > 0 && (
    logoImages.map((logo, index) => (
        <CarouselItem className='' key={index}>
            <img
                src={`data:${logo?.type};base64,${logo?.data}`}
                alt={logo?.filename}
                className="aspect-4/3 "
            />
        </CarouselItem>
    ))) 
)
        

}
</CarouselContent>
  <CarouselPrevious className='-left-5 bg-zinc-600' />
  <CarouselNext className='-right-5 bg-zinc-600'/>
</Carousel>
{!Imageloading && logoImages.length === 0 && <p className='font-bold'>No images submitted</p>}
  </DialogContent>
</Dialog>

  )

}
export default Freequotelogoimage
