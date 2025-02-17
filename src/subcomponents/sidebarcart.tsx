import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShoppingCart } from 'lucide-react'
import { cartcontext } from "@/App"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"


export function SidebarCart() {

  const cartcontextvar = useContext(cartcontext)



  if (!cartcontextvar) {
    throw new Error("cartContext must be used within a cartContext.Provider");
  }

  const { cart, setcart, shipping } = cartcontextvar;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = subtotal + shipping
  const handleRemoveItem = (itemname: string, itemSize: number) => {
    setcart(cart.filter((item) => !(item.name === itemname && item.size === itemSize)))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent border-[1px] border-gray-500">
          <ShoppingCart className="h-8 w-8" />
          <span className="absolute -top-2 -right-2 w-4 h-4 md:w-5 md:h-5 text-xs bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center">
            {totalItemsCount}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap- p-0 bg-gray-50 dark:bg-zinc-950 gap-2">
        <div className="px-6 pt-3 pb-1 border-b-2">
          <SheetHeader className="mb-2">
            <SheetTitle className="flex items-center">
              Cart <span className="inline-flex items-center justify-center w-5 h-5 text-sm bg-black text-white rounded-full ml-2">{totalItemsCount}</span>
            </SheetTitle>
            <SheetDescription >
              <div className="flex justify-between items-end">              <span className="text-sm text-gray-600 dark:text-gray-400">You are eligible for free shipping.</span>
           {cart.length >0 && <Button variant="destructive" onClick={()=>setcart([])} className=' h-7'>Clear Cart</Button>}
              </div>
            </SheetDescription>
          </SheetHeader>
        </div>
        {cart.length === 0 ? <div className=" w-full h-full flex flex-col items-center justify-center px-3 pt-4 text-center">
          <motion.div initial={{ rotate: -40 }} animate={{
            rotate: 40, transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeIn'
            }
          }} className="w-24 h-24 mb-3 relative">
            {/* Cart illustration with animated dots */}
            <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-red-400 animate-bounce" />
            <div className="absolute -top-4 right-2 w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:0.2s]" />
            <div className="absolute -top-2 -left-2 w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
          </motion.div>

          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Your cart is empty
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mb-2 max-w-[300px]">
            Looks like you have not added anything to your cart. Go ahead & explore top categories.
          </p>

          <Link to="/products">
            <SheetClose>
              <Button variant="outline" className="dark:border-gray-700">
                Start Shopping
              </Button>
            </SheetClose>
          </Link>

        </div> :
          //not empty part of cart
          <div className="  flex-1 overflow-auto px-6 py-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={`${item.size}-${item.name}`} className="flex gap-4">
                  <div className="w-20 h-fit  bg-gray-100 rounded-lg overflow-hidden flex items-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover aspect-3/2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">{`EU Size: ${item.size}`}</p>
                    <p className="text-sm text-gray-900 dark:text-zinc-200 mt-1">&#8364;{item.price}.00</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="w-12 h-8 flex items-center justify-center border border-gray-200 dark:border-zinc-600 rounded-md text-sm">
                      {item.quantity}
                    </span>
                    <button onClick={() => handleRemoveItem(item.name, item.size as number)} className="text-sm text-red-500 hover:text-gray-700 underline underline-offset-2">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        <Separator />
        <div className="px-6 pb-2 space-y-2">
          <h3 className="text-lg font-medium">Order Summary</h3>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>

             {shipping >0? <span>{shipping}</span>: <span className="text-emerald-600 dark:text-emerald-400">Free</span>}
            </div>
          </div>

          <Separator />





          <div className="flex justify-between text-lg font-medium">
            <span>Order Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <SheetClose asChild>
            <Button asChild variant="outline" className="w-full">
            <Link to="/cart">
              View cart
              </Link>
            </Button>
      </SheetClose>
            <Button className="w-full">
              Checkout
            </Button>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}

