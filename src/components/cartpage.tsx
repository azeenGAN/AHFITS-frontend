import {cartcontext} from "@/App"
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from 'react'
import { Minus, Plus, X, Trash2,ShoppingCart} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { motion } from "motion/react"

interface ItemDetails {
  name: string
  image: string
  price: number
  quantity: number
  size: number | null
}
//interface for reducer action
type CartOperation = 
  | { type: 'INCREASE_QUANTITY'; item: ItemDetails; }
  | { type: 'DECREASE_QUANTITY'; item: ItemDetails; }
  | { type: 'REMOVE_ITEM'; item: ItemDetails }
  | { type: 'CLEAR_CART' };


export default function CartPage() {
    console.log("Component rendered"); // Logs every time the component re-renders

    const cartcontextvar= useContext(cartcontext)   
  
        if (!cartcontextvar) {
            throw new Error("cartContext must be used within a cartContext.Provider");
          }
    
        const { cart, setcart ,shipping, setShipping} = cartcontextvar


  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const total = subtotal + shipping

const [count, setcount] = useState(0)
useEffect(() => {
    setcount((prevcount)=> prevcount+1)
    console.log(count)
}, []);

  const handleCart = (operation: CartOperation) => {
    switch (operation.type) {
      case 'DECREASE_QUANTITY':
        setcart(cart.map(item => {
            if (item.name === operation.item.name && item.size === operation.item.size) {
              if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            }
            return item;
          }));
          break;

          case 'INCREASE_QUANTITY':
            setcart(cart.map(item => 
              item.name === operation.item.name && item.size === operation.item.size?
              item.quantity<10?{ ...item, quantity: item.quantity + 1 }
                :item
                :item
            
            ));
            break;
      

      case 'REMOVE_ITEM':
        setcart(cart.filter(item => 
          !(item.name === operation.item.name && item.size === operation.item.size)
        ));
        break;

      case 'CLEAR_CART':
        setcart([]);
        break;
    }
  };
const [promoinput, setpromoinput] = useState<string>('')

console.log(promoinput)

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-black text-foreground">
      <div className="container mx-auto px-4 py-8">
        {cart.length === 0 ? <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        {/* Cart Icon with Dots */}
        <motion.div initial={{rotate:-40}}  animate={{rotate:40, transition:{
        duration:3,
        repeat:Infinity,
        repeatType:'reverse',
        ease:'easeInOut'
      }}}  className="relative inline-block">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          {/* Animated Dots */}
          
          <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-red-400 animate-bounce" />
        <div className="absolute -top-4 right-2 w-2 h-2 rounded-full bg-yellow-400 animate-bounce [animation-delay:0.2s]" />
        <div className="absolute -top-5 -left-1 w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
         
        </motion.div>

        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground max-w-[300px] mx-auto">
            Looks like you have not added anything to your cart. Go ahead & explore top categories.
          </p>
        </div>

        {/* Action Button */}
        <Link to="/products">
          <Button 
            variant="outline" 
            className="px-8 py-2 text-base bg-gray-50 dark:bg-zinc-950 hover:bg-accent mt-3 border-gray-300 dark:border-zinc-800"
          >
            Start Shopping
          </Button>
        </Link>
      </div>
    </div> :<>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-gray-500 font-bold">Your Cart</h1>
          
            <Button 
              variant="destructive" 
              onClick={() => handleCart({ type: 'CLEAR_CART' })}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear Cart
            </Button>
        
        </div>
        </>}
      
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6 ">
              { cart.map((item) => (
                <div key={`${item.size}-${item.name}`} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-300 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900">
                  {/* Product Image */}
                  <div className="relative flex justify-center items-center  w-full sm:w-40 h-fit bg-muted rounded-md overflow-hidden ">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                   
                      className=" object-contain aspect-3/2 w-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-muted-foreground">Size: {item.size}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCart({ 
                            type: 'REMOVE_ITEM', 
                            item 
                          })}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                      <Button
              disabled={item.quantity===1}
             variant="destructive"
                          className="w-[70px] h-8 font-bold rounded-full "
                          onClick={() => handleCart({ 
                            type: 'DECREASE_QUANTITY',
                            item                           
                          })}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          disabled={item.quantity===10}
                          className="w-[70px] h-8 rounded-full border-gray-300 dark:border-zinc-700"
                          onClick={() => handleCart({ 
                            type: 'INCREASE_QUANTITY',
                            item,                            
                          })}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
           {cart.length >0 && <div className="lg:col-span-1">
              <div className="rounded-lg border border-gray-300 dark:border-zinc-800 bg-card p-6 space-y-6 sticky top-8">
                <h2 className="font-semibold text-xl">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {shipping === 0 ? <span className="text-emerald-600 dark:text-emerald-400">Free</span> : <span className="">&#8364; {shipping}</span>}
                  
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label htmlFor="shipping">Shipping Method</Label>
                  <Select onValueChange={(value:string)=>{setShipping( Number(value))}} defaultValue={String(shipping)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Standard Delivery (5-7 days)</SelectItem>
                      <SelectItem value="50">Express Delivery (2-3 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="promo">Promo Code</Label>
                  <div className="flex gap-2">
                    <Input maxLength={15} minLength={3} onChange={(e)=> setpromoinput(e.target.value)} id="promo" placeholder="Enter code" />
                    <Button>Apply</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    disabled={cart.length === 0}
                  >
                  Checkout
                  </Button>
                </div>
              </div>
            </div>}
          </div>
        
      </div>
    </div>
  )
}

