import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FootprintsIcon as Shoe, HeartIcon, CheckCircle } from 'lucide-react'
import { LogoCloud } from '@/subcomponents/Custom/logo-cloud'
import { ProductCard } from '@/subcomponents/Custom/product-card'
import { Configurator } from '@/subcomponents/Custom/configurator'
import { SuccessMetrics } from '@/subcomponents/Custom/sucess-metrics'
import { ContactForm } from "@/subcomponents/Custom/contact-form"
import { FAQAccordion } from "@/subcomponents/Custom/faq-accordion"
import '@/index.css'
import { useEffect, useRef } from "react"

interface CorporateShoesLandingProps {
  scrollToFAQ: boolean;
  setScrollToFAQ: (value: boolean) => void;
}

export default function CorporateShoesLanding({ scrollToFAQ, setScrollToFAQ }: CorporateShoesLandingProps) {
  //FAQ reference
  const faqRef = useRef<HTMLDivElement>(null)
  const contactformRef = useRef<HTMLElement>(null)
  const howitwoksRef = useRef<HTMLElement>(null)

  let scrollToSection= (someref: React.RefObject<HTMLElement>)=>{
    someref.current?.scrollIntoView({behavior:"smooth"})
  }

  useEffect(() => {
    if (scrollToFAQ && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" })
      setScrollToFAQ(false)
    }
  }, [scrollToFAQ])

  const products = [
    {
      title: "Classic Corporate Sneaker",
      image: "/stable/images/customshoesproduct1.jpg",
      category: "Sneakers",
      colors: 6,
      minOrder: 40,
    },
    {
      title: "Business Casual",
      image: "/stable/images/customshoesproduct1.jpg",
      category: "Casual",
      colors: 4,
      minOrder: 40,
    },
    {
      title: "Executive Collection",
      image: "/stable/images/customshoesproduct1.jpg",
      category: "Business",
      colors: 3,
      minOrder: 40,
    },
    {
      title: "Premium Socks",
      image: "/stable/images/customshoesproduct1.jpg",
      category: "Accessories",
      colors: 8,
      minOrder: 100,
    },
  ]

  const customerReviews=[
    {
      src: "cusimg1.jpeg",
      companyName: "TechCorp Inc.",
      testimonial: "The custom shoes were a huge hit at our company event. The quality and attention to detail exceeded our expectations.",
      reviewerName: "Amelia Jane Taylor",
      reviewerPosition: "Marketing and Brand Promotion",
    },
    {
      src: "cusimg2.jpeg",
      companyName: "Innovate Solutions",
      testimonial: "We loved the unique designs. Our team felt valued and motivated with these personalized gifts.",
      reviewerName: "Mason Blake",
      reviewerPosition: "Operations Manager",
    },
    {
      src: "cusimg3.jpeg",
      companyName: "FutureTech Ltd.",
      testimonial: "Exceptional service and craftsmanship. These shoes truly made our conference stand out.",
      reviewerName: "Chanika Sutthipong",
      reviewerPosition: "Event Coordinator",
    },
  ] 

  return (
    <div className="flex flex-col  min-h-full max-w-full">
      <main className="">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-28 xl:py-24 bg-gradient-to-r from-blue-600 to-blue-950">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm" />
          </div>
          <div className="container relative mx-auto px-5 sm:px-6 lg:px-8 ">
            <div className="grid gap-y-12 lg:grid-cols-2  items-center">
              <div className="space-y-6">
                <div className="space-y-4 text-white">
                  <h1 className="text-3xl font-bold  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl passion-one-regular ">
                    Customized Sneakers for Your Business
                  </h1>
                  <p className="max-w-[600px] text-lg sm:text-xl md:text-2xl font-medium">
                    Create branded shoes to make your team proud and boost brand visibility.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={()=>scrollToSection(contactformRef)} size="lg" className="bg-white text-blue-900 hover:bg-white/90 font-bold">
                    Request Free Design
                  </Button>
                  <Button onClick={()=>scrollToSection(howitwoksRef)} size="lg" variant="outline" className="text-white bg-blue-600 border-2 font-bold hover:text-blue-600 dark:hover:bg-white dark:border-white">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative mt-8 lg:mt-0 self-end">
  <img
    alt="Corporate Shoes"
    className="mx-auto rounded-xl shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500 w-[80%] object-contain "
    src="/stable/images/customshoe-banner.jpeg"
   
  />
</div>
            </div>
          </div>
        </section>


        {/* Product Showcase */}
        <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Products</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Choose from our range of customizable footwear and accessories
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mt-12">
              {products.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Configurator Section */}
        <section id="customize" className="w-full py-12 md:py-24 lg:py-32 bg-gray-300 dark:bg-slate-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Design Your Perfect Shoe</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Use our interactive configurator to bring your vision to life
                </p>
              </div>
            </div>
            <div className="mt-12">
              <Configurator />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section ref={howitwoksRef} className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Three simple steps to get your custom shoes
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Choose Your Model",
                  description: "Select from our range of high-quality shoe models",
                  icon: Shoe,
                },
                {
                  title: "Customize Design",
                  description: "Add your logo and choose colors that match your brand",
                  icon: HeartIcon,
                },
                {
                  title: "Place Order",
                  description: "Receive your visualization and confirm your order",
                  icon: CheckCircle,
                },
              ].map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-75 blur" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-lg bg-white">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-center text-gray-500">{description}</p>
                 
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="success" className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-stone-900 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See how other companies have elevated their brand with our custom shoes
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl mt-12">
              <SuccessMetrics />
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {customerReviews.map((customer,index) => (
                <Card key={index}>
                  <CardContent className="p-3">
                    <img
                      alt="Success Story "
                      className="rounded-lg mb-4 object-cover h-full w-full"
                      
                      src={`/stable/images/${customer.src}`}
                    
                    />
                    <h3 className="text-xl font-bold mb-2">{customer.companyName}</h3>
                    <p className="text-gray-500 mb-4">
                      {customer.testimonial}
                    </p>
                    <div className="flex items-center">
                      {/* <img
                        alt="Avatar"
                        className="rounded-full mr-2"
                        height="40"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "1",
                          objectFit: "cover",
                        }}
                        width="40"
                      /> */}
                      <div>
                        <p className="font-medium">{customer.reviewerName}</p>
                        <p className="text-sm text-gray-500">{customer.reviewerPosition}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        
        

        {/* Request Form */}
        <section ref={contactformRef} className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-stone-950 flex md:justify-start justify-center">
          <div className="container px-4 md:px-6">
            <ContactForm />
          </div>
        </section>
        {/* Logo Cloud */}
        <LogoCloud />
        <section ref={faqRef} className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div  className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div  className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find answers to common questions about our custom shoe services
                </p>
              </div>
            </div>
            <div  className="mx-auto max-w-3xl">
              <FAQAccordion />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

