import { useState, useEffect } from 'react';
import {  useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { addProductFormData, getProductsResponse } from './types';
import { useToast } from "@/hooks/use-toast"
import Adminloading from './adminloading';
import EditProductDialog from './editproduct';


// [
//   {
//     id: '1',
//     name: 'Custom Air Max',
//     price: 299.99,
//     category: 'Sneakers',
//     stock: 45,
//     sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
//     image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3'
//   },
//   // Add more mock products as needed
// ];
const EU_SIZES=[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];




export default function Products() {
//states to get products

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<getProductsResponse[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //pagination states
  const [page, setPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const docsPerPage = 7;


  const getallproducts = async () => {
    try {
      const res = await fetch(`/admin/getallproducts?page=${page}&limit=${docsPerPage}`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data.products);
      setTotalProducts(data.totalDocs);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { toast } = useToast()
  //useEffect to get all products
  useEffect(() => {
    setLoading(true);
    getallproducts();
  }, [page]);

  //to add a new product
const {
  register,
  handleSubmit,
  formState: { errors },
  reset
} = useForm<addProductFormData>();

const onSubmit = async (data: addProductFormData) => {
  setLoading(true);
  const formdata = new FormData();
  formdata.append('availableSizes', JSON.stringify(data.availableSizes));
  formdata.append('name', data.name);
  formdata.append('price', data.price.toString());
  formdata.append('category', data.category);
  formdata.append('description', data.description);

  if (data.productimage && data.productimage.length > 0) {
    formdata.append('productimage', data.productimage[0]);
  }

  try {
    const res = await fetch("/mutlerdata/admin/addproduct", {
      method: 'POST',
      body: formdata
    });
    if (!res.ok) {
      throw new Error("Error: Failed to add product");
    }
    // After successful add, refresh products list
   
    setShowAddModal(false);
    reset();
    setImagePreview(null);
    await getallproducts();
    toast({ description: "Product added successfully" });
  } catch (error: any) {
    toast({ variant: "destructive", description: error.message });
  } finally {
    setLoading(false);
  }
};
//function for deleting product
const deleteProduct = (id: string) => {
  setLoading(true)
  fetch(`/admin/deleteproduct/${id}`, {
    method: 'DELETE',
  })
  .then(async (res) => {
    
    if (!res.ok) {
      const errormessage= await res.json()
      throw new Error( errormessage.message || "Failed to delete product");
    }
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  })
  .catch((error) => {
    console.error(error);
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    });
  }).finally(() => setLoading(false));
}

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

if(loading){
  return <div className='flex justify-center items-center flex-col h-screen w-full'>
<Adminloading/>
  </div>
}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
   

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`data:${product.productimage?.type};base64,${product.productimage?.data}`}
                      alt={product.productimage?.filename}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.availableSizes.join(', ')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">

                    {/* delete and adit button */}

                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <EditProductDialog loading={loading} getallproducts={getallproducts} setLoading={setLoading} initialData={product}  />
                    </button>
                    <button onClick={()=> deleteProduct(product._id)} className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            {/* pagination component */}
            <div className="flex items-center justify-center my-4">
          <button
            onClick={() => {
              if (page > 1) setPage((prev) => prev - 1);
            }}
            disabled={page <= 1}
            className="px-5 py-1 border-gray-700 border-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="mx-3 font-semibold bg-gray-200 w-[50px] text-center">{page}</span>
          <button
            onClick={() => {
              if (page * docsPerPage < totalProducts) setPage((prev) => prev + 1);
            }}
            disabled={page * docsPerPage >= totalProducts}
            className="px-5 py-1 border-gray-700 border-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
    
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
  <div className="fixed inset-0 m-0 text-sm bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-xl px-5 p-3 w-full  max-w-2xl ">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
            {...register('name', { required: 'Product name is required' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border h-16 border-gray-200 rounded-lg px-4 py-2"
            rows={4}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* //add sizes input */}

        <div>
  <label className="block text-sm font-medium mb-1">Available Sizes (EU)</label>
  <div className="mx-auto grid grid-cols-6 gap-1 w-[90%]">
    {EU_SIZES.map((size) => (
      <div key={size} className="relative">
        <input
          type="checkbox"
          id={`size-${size}`}
          value={size}
          {...register('availableSizes', {
            required: 'At least one size must be selected',
          })}
          className="peer hidden"
        />
        <label
          htmlFor={`size-${size}`}
          className="flex items-center justify-center  border rounded-lg cursor-pointer
            peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600
            hover:bg-gray-50"
        >
          {size}
        </label>
      </div>
    ))}
  </div>
  {errors.availableSizes && (
    <p className="text-red-500 text-sm mt-1">{errors.availableSizes.message}</p>
  )}
</div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input
  type="file"
  accept="image/*"
 
  className="w-full border border-gray-200 rounded-lg px-4 py-1 text-sm"
 
    {...register('productimage', {
      required: 'Product image is required',
      validate: {
        fileType: (fileList: File[]) => {
          const file = fileList[0];
          if (!file) return 'No file selected';
          return file.type.startsWith('image/') || 'File must be an image';
        },
        fileSize: (fileList: File[]) => {
          const file = fileList[0];
          if (!file) return 'No file selected';
          const maxSize = 4 * 1024 * 1024; // 4MB
          return file.size <= maxSize || 'Image size must be less than 4MB';
        },
      },
    })}
    onChange={handleImageChange}  
/>
          {errors.productimage && (
            <p className="text-red-500 text-sm mt-1">{errors.productimage.message}</p>
          )}
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-16 h-316 object-contain rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              setShowAddModal(false);
              reset();
              setImagePreview(null);
            }}
            className="px-3 py-2 border text-sm border-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}