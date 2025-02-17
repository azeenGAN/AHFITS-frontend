import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import Adminloading from '@/subcomponents/admin/adminloading';
import { useToast } from '@/hooks/use-toast';

import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  User,
  LogOut 
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: Package, label: 'Products', path: '/admin/total_products' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
];

interface AdminProps {
  AdminAuthState: Boolean;
  setAdminAuthState: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Admin: React.FC<AdminProps> = ({ AdminAuthState, setAdminAuthState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('/admin/authenticate', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        
        setAdminAuthState(true);
      } catch (error) {
        setAdminAuthState(false);
        navigate('/admin/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

//logout fetch function

const {toast}=useToast();

const handleLogout = () => {
  fetch('/admin/logout', {
    method: 'POST',
    credentials: 'include',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to logout. Please try again.');
      }
      return response.json();
    })
    .then(data => {
      toast({
        title: "Success",
        description: data.message
      });
      setAdminAuthState(false);
      navigate('/admin/login', { replace: true });
    })
    .catch(error => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message  || "An error occurred"
      });
    });
};


  if (loading) {
    return <div className="flex h-screen items-center justify-center"> <Adminloading/></div>;
  }

  if (!AdminAuthState) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">ShoeAdmin</h1>
        </div>
        <nav className="mt-6">
          {sidebarItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                location.pathname === path ? 'bg-gray-100 border-r-4 border-blue-500' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="ml-3">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex justify-end">
        <Popover>
  <PopoverTrigger><div className="flex items-center gap-2">            
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium">Admin User</span>
          </div>
          </PopoverTrigger>
  <PopoverContent onClick={handleLogout} className='bg-gray-100 w-48 flex justify-center cursor-pointer hover:bg-gray-200'><LogOut/>Logout</PopoverContent>
</Popover>
          
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;