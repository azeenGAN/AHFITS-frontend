import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef, createContext, Suspense, lazy } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer"; // Assuming you have a Footer component
import Products from "./components/products";
import Productdetail from "./components/productdetail";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import LandingPageSkeleton from "@/subcomponents/Loading/skeleton";
// Lazy load components
import Landingpage from './components/landingpage';
const CustomShoes = lazy(() => import('./components/customshoes'));
const CartPage = lazy(() => import('./components/cartpage'));
const NotFound = lazy(() => import('./components/notfound'));
const Admin = lazy(() => import('./components/admin'));
const Admindashboard = lazy(() => import('./subcomponents/admin/admindashboard'));
const Orders = lazy(() => import('./subcomponents/admin/orders'));
const Customers = lazy(() => import('./subcomponents/admin/customers'));
const Productslisting = lazy(() => import('./subcomponents/admin/productslisting'));
import Login from'./subcomponents/admin/login';

// Define cart object interface
interface cartobj {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: number | null;
}

// Define cart context interface
interface cartContext {
  cart: cartobj[];
  setcart: React.Dispatch<React.SetStateAction<cartobj[]>>;
  shipping: number;
  setShipping: React.Dispatch<React.SetStateAction<number>>;
}

// Create cart context
export const cartcontext = createContext<cartContext | null>(null);

function App() {
  const [cart, setcart] = useState<cartobj[]>([]);
  const [shipping, setShipping] = useState<number>(0);
  const [whichCategoryFilter, setwhichCategoryFilter] = useState<string | null>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [scrollToFAQ, setScrollToFAQ] = useState(false);
  const [AdminAuthState, setAdminAuthState] = useState<Boolean>(false);

  // Handle navigation to products page
  const handleCategoryNavigation = (category: string | null) => {
    setwhichCategoryFilter(category);
  };
  //handling admin Auth state
  const handleAdminAuthState = (state: boolean): void => 
    setAdminAuthState(state);
  

  // Scroll to FAQ section
  const handleScrollToFAQ = () => {
    setScrollToFAQ(false); // Reset first
    setTimeout(() => {     // Then set to true
      setScrollToFAQ(true);
    }, 200); // Increased delay to ensure component is mounted
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <BrowserRouter>
      <cartcontext.Provider value={{ cart, setcart, shipping, setShipping }}>
      <div id="portal-root" />

        <section ref={navbarRef}>
          <Navbar handleCategoryNavigation={handleCategoryNavigation} />
        </section>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LandingPageSkeleton />}>
                <Landingpage />
              </Suspense>
            }
          />
          <Route
            path="/products"
            element={
                <Products whichCategoryFilter={whichCategoryFilter} />
            }
          />
          <Route
            path="/products/:id"
            element={             
                <Productdetail />      
            }
          />
          <Route
            path="/custom"
            element={
              <Suspense fallback={<LandingPageSkeleton />}>
                <CustomShoes scrollToFAQ={scrollToFAQ} setScrollToFAQ={setScrollToFAQ} />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<LandingPageSkeleton />}>
                <CartPage />
              </Suspense>
            }
          />
          <Route path="/admin/login" element={<Login handleAdminAuthState={handleAdminAuthState} />} />
          {/* admin child routes */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LandingPageSkeleton />}>
                <Admin AdminAuthState={AdminAuthState} setAdminAuthState={setAdminAuthState} />
              </Suspense>
            }>
            <Route index element={<Admindashboard />} />
            <Route path='orders' element={<Orders />} />
            <Route path='customers' element={<Customers />} />
            <Route path='total_products' element={<Productslisting />} />
            </Route>

          { /* admin child routes ends */}
            <Route
            path="*"

            element={
              <Suspense fallback={<LandingPageSkeleton />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        <Footer navbarRef={navbarRef} handleScrollToFAQ={handleScrollToFAQ} />
      </cartcontext.Provider>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;