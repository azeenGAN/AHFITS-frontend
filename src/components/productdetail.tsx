import { useParams, Link } from "react-router-dom";
import { useEffect, useState,useRef, useContext } from "react";

import { Star,  MoveRight, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import {cartcontext} from "@/App"

interface ProductDetailObj {
    _id: string;
    name: string;
    price: number;
    availableSizes: number[];
    description:string
    category: string;
    productimage?:{
      filename: string;
      data: any; // Consider using a more specific type if possible (e.g., Buffer)
      type: string;
    }
  }

interface itemDetails{
    id:string
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: number|null;
}
const Productdetail = () => {

    //using context
    const cartcontextcomponentvar= useContext(cartcontext)
    //cart ToastComponent
    const { toast } = useToast()

    if (!cartcontextcomponentvar) {
        throw new Error("cartContext must be used within a cartContext.Provider");
      }

      const { cart, setcart } =cartcontextcomponentvar

    const { id } = useParams(); // Fetch the product ID from the URL
    const [product, setProduct] = useState<ProductDetailObj | null>(null); // State to store product details
    const [loading, setLoading] = useState<boolean>(true); // State to handle loading status
    const [error, setError] = useState<string | null>(null); // State to handle error messages

    const imgref = useRef<HTMLImageElement>(null)
      //ref for select size before adding to cart
    
    const  [itemDetails, setItemDetails] = useState<itemDetails>({
        id:"",
        name:"",
        image:"",
        price:0,
        quantity:1,
        size:null
    }
)

function handleCart(itemDetails: itemDetails) {
    if (!itemDetails.size) {
        toast({
            title: "Size Required",
            description: "Please select a size before adding to cart",
            variant: "destructive",
        });
        return;
    }
    setcart((prevCart) => {
        const itemExists = prevCart.some(
            (item) => item.name === itemDetails.name && item.size === itemDetails.size
        );

        if (itemExists) {
            toast({
                title: "Updated Cart",
                description: `Increased quantity for ${itemDetails.name} (Size: ${itemDetails.size}) by ${itemDetails.quantity}`,
            });
            return prevCart.map((item) =>
                item.name === itemDetails.name && item.size === itemDetails.size
                    ? { ...item, quantity: item.quantity + itemDetails.quantity }
                    : item
            );
        }

        toast({
            title: "Added to Cart",
            description: `${itemDetails.name} (Size: ${itemDetails.size}) has been added to your cart`,
        });
        return [...prevCart, itemDetails];
    });
    console.log(cart)
}



  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]);
    useEffect(() => {

        console.log('Product ID:', id);  // Log the ID being used
        if (!id) {
            setError("Product ID is missing.");
            return;
        }

        const fetchProduct = async () => {
            try {
                setError(null); // Clear previous errors if any
                setLoading(true);
                const response = await fetch(`/items/${id}`);
                if (!response.ok) {
                    // Handle HTTP errors
                    if (response.status === 404) {
                        throw new Error("Product not found.");
                    } else {
                        const errorResponse = await response.json(); // Await the JSON parsing
                        throw new Error(errorResponse.message || "An error occurred.");
                    }
                }

                const data: ProductDetailObj = await response.json();
                setProduct(data); // Update state with fetched productApp.tsx: 
                setItemDetails((prevItemDetails)=>({...prevItemDetails,id:data._id ,name:data.name, price:data.price, image:`data:${data.productimage?.type};base64,${data.productimage?.data}`}))
            } catch (error: unknown) {
                // Handle any error (both HTTP and network-related)
                setError((error as Error).message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="w-full h-max bg-gray-200 dark:bg-black px-2 sm:px-10 ">
            {product &&
                <div className="container mx-auto px-4 py-4 ">
                    {/* Breadcrumb */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/products">Shoes</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-medium">{product.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="md:grid md:grid-cols-2 gap-8 pt-8">
                        {/* Product Images */}


                        <img
                            src={`data:${product.productimage!.type};base64,${product.productimage!.data}`}
                            alt="Nike Air Force 1"

                            className="object-contain w-[600px] h-auto"
                        />




                        {/* Product Info */}
                        <div className="pt-5 space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                <h1 className="text-2xl font-bold mb-2 text-slate-400">For {product.category.charAt(0).toUpperCase()+product.category.slice(1)}'s</h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                strokeWidth={1}
                                                key={i}
                                                className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-800" : "fill-muted text-muted-foreground"
                                                    }`}
                                            />
                                        ))}

                                    </div>
                                    <span className="text-sm text-muted-foreground">2.5k Reviews</span>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="secondary">Running Shoes</Badge>
                                    <Badge variant="secondary">Casual Sneakers</Badge>
                                    <Badge variant="secondary">Limited Edition</Badge>
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <h2 className="text-xl font-semibold mb-2">Product Description</h2>
                                <p className="text-muted-foreground">
                                    {product.description}
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold ">Size Chart<span className="text-[12px] text-orange-700">{` (According to Men)`}</span></h2>
                                    {/* size chart dialogue */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <p className="underline underline-offset-2 text-sm cursor-pointer">
                                                See Chart
                                            </p>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>Size Chart</DialogTitle>
                                            </DialogHeader>
                                            <div className="relative aspect-video w-full">
                                                <img
                                                ref={imgref}
                                                    src="/stable/images/shoe-size-chart.png"
                                                    alt="Size Chart"
                                                    className="object-contain"
                                                    onLoad={() => {
                                                        if (imgref.current) {
                                                            setItemDetails(prev => ({
                                                                ...prev,
                                                                image: imgref.current!.src
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Tabs defaultValue="eu">
                                    <TabsList>
                                    <TabsTrigger value="eu">EU</TabsTrigger>
                                    <TabsTrigger value="us">US</TabsTrigger>
                                       

                                    </TabsList>
                                    <TabsContent value="eu" className="mt-4">
                                    <div className="grid grid-cols-4 gap-2">
        {product.availableSizes.map((siz: number) => (
            <Button
                key={siz}
                variant={siz === 42 ? "default" : "outline"}
                className={`w-full ${itemDetails.size === siz ? "bg-gray-300 dark:bg-zinc-700" : ""} hover:bg-gray-300 hover:dark:bg-zinc-800`}
                onClick={() => setItemDetails((prevItemDetails) => 
                    ({...prevItemDetails, size: siz}))
                }
            >
                {siz}
            </Button>
        ))}
    </div>
                                    </TabsContent>
                                    <TabsContent value="us" className="mt-4">
                                    <div className="grid grid-cols-4 gap-2">
        {product.availableSizes.map((eusize) => {
            // Convert EU size to US size
            const ussize = (eusize - 33);
            return (
                <Button
                    key={ussize}
                    variant={ussize === 9 ? "default" : "outline"} // Keep variant logic as per your requirement
                    className={`w-full ${itemDetails.size === eusize ? "bg-gray-300 dark:bg-zinc-700" : ""} hover:bg-gray-300 hover:dark:bg-zinc-800`}
                    onClick={() => setItemDetails((prevItemDetails) => 
                        ({...prevItemDetails, size: eusize}))
                    }
                >
                    {ussize} {/* Display the US size */}
                </Button>
            );
        })}
    </div>
                                    </TabsContent>
                                  

                                </Tabs>
                            </div>
                            <div className="flex items-center space-x-4 ">
            <h2 className="max-460:text-base text-xl font-semibold">Item Quantity</h2>
            <div className="flex items-center border rounded-full bg-gray-300 dark:bg-zinc-950 p-2">
              <Button
              disabled={itemDetails.quantity===1}
             variant="destructive"
                
                onClick={() =>
                    setItemDetails((prevItemDetails) => {
                      if (prevItemDetails.quantity > 1) {
                        return {
                          ...prevItemDetails,
                          quantity: prevItemDetails.quantity - 1,
                        };
                      }
                      // Return the previous state if no changes are made
                      return prevItemDetails;
                    })
                  }
                className="max-460:w-[50px] w-[70px]  rounded-full "
              >
                <Minus />
                
              </Button>

              <div      
                className="w-16 text-center border-none font-semibold"
              >{itemDetails.quantity}</div>

              <Button               
                
                disabled={itemDetails.quantity===10}
                onClick={() =>
                    setItemDetails((prevItemDetails) => {
                      if (prevItemDetails.quantity < 10) {
                        return {
                          ...prevItemDetails,
                          quantity: prevItemDetails.quantity + 1,
                        };
                      }
                      // Return the previous state if no changes are made
                      return prevItemDetails;
                    })
                  }
                className="max-460:w-[50px] w-[70px] rounded-full "
              >
                <Plus  />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          </div>

                            <div className="space-y-4">
                                <div className="flex items-baseline justify-between">
                                    <div className="text-2xl font-bold">&#8364; {product.price}.00</div>
                                </div>

                                {/* <div className="bg-muted/50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-1">15% Discount For CBS employess</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Every CBS membership customers can get 15% discount with minimum $100 shopping
                                    </p>
                                </div> */}

                              
                                    {/* <Button className="flex-1" size="lg">
                                        Buy Now
                                    </Button> */}
                                    <Button className="w-full font-bold" size="lg"
                                    onClick={()=>handleCart(itemDetails)}
                                    >
                                        Add To Cart <MoveRight/>
                                    </Button>
                                    {!itemDetails.size && <p className="text-red-500 font-semibold">*Please select size before Adding to Cart*</p>} 
                            </div>

                            <Accordion type="single" collapsible className="w-full pt-3">
                                <AccordionItem value="reviews" className="border-gray-400">
                                    <AccordionTrigger className="font-bold text-lg">Payment & Delivery</AccordionTrigger>
                                    <AccordionContent>
                                        Reviews content goes here...
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="shipping" className="border-gray-400">
                                    <AccordionTrigger className="font-bold text-lg">Return & Exchange Policy</AccordionTrigger>
                                    <AccordionContent>
                                        Shipping information goes here...
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            }
            {loading &&
              <div className="w-full h-auto bg-gray-200 dark:bg-zinc-900 px-10 animate-pulse">
              <div className="container mx-auto px-4 py-4">
                <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
        
                <div className="md:grid md:grid-cols-2 gap-8 pt-8">
                  <div className="h-64 bg-gray-300 dark:bg-zinc-700 rounded"></div>
        
                  <div className="pt-5 space-y-6">
                    <div>
                      <div className="h-6 bg-gray-300 dark:bg-zinc-700 rounded w-1/2 mb-1"></div>
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/4 mb-1"></div>
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/6 mb-1"></div>
                    </div>
        
                    <div className="prose max-w-none">
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/3 mb-1"></div>
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-full mb-1"></div>
                    </div>
        
                    <div>
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/3 mb-1"></div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="h-8 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                      </div>
                    </div>
        
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-300 dark:bg-zinc-700 rounded w-1/2 mb-1"></div>
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-full mb-1"></div>
                      <div className="h-8 bg-gray-300 dark:bg-zinc-700 rounded w-full mb-1"></div>
                      <div className="h-8 bg-gray-300 dark:bg-zinc-700 rounded w-full"></div>
                    </div>
        
                    <div className="w-full">
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/2 mb-1"></div>
                      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-full mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            }
            {error && <>
                <div className="pt-10 w-full h-svh grid justify-center  place-items-start ">
                    <div className="flex flex-col items-center gap-y-3">
                        <img src="/stable/images/productdetailerror.svg" className="w-[300px]"></img>
                        <div className=" text-center text-3xl font-bold italic text-red-500">{`We're Sorry, ${error ? error : "an error has occured"}`}</div>
                        <p className="text-gray-700 dark:text-zinc-400 font-medium">We seem to have lost this page but we don't want to lose you.</p>
                        <Link
                            to="/products"
                            replace={true}

                        >
                            <Button variant="outline" className="border-red-500 text-red-500 font-medium">Back to Page</Button>
                        </Link>
                    </div>

                </div>
            </>}
        </div>
    )

}

export default Productdetail
