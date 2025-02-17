// import React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const Uppernav = () => {
    return (
        <div className="w-full max-h-min">
            <Carousel orientation="horizontal" className="text-sm font-semibold text-white bg-[#333333] w-full py-2">
            <div className="px-9">
                <CarouselContent className="max-h-min text-wrap items-center ">
                    <CarouselItem className="text-center"><b>Welcome </b>to Store!</CarouselItem>
                    <CarouselItem className="text-center">Free Delivery nationwide for orders above EUR 300/-</CarouselItem>
                    <CarouselItem className="text-center">From 10 to 20 April we have our pre summer sale!</CarouselItem>
                </CarouselContent>
                </div>
                <CarouselPrevious variant="ghost" className="sm:left-10 left-3 h-6 w-6"/>
                <CarouselNext variant="ghost"  className="sm:right-10 right-3 h-6 w-6"/>
            </Carousel>
        </div>
    )
}

export default Uppernav
