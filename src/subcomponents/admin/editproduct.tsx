import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle,  DialogTrigger, DialogDescription} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit } from 'lucide-react';
import { useState } from "react";
import type { getProductsResponse, addProductFormData } from "./types";
import { useToast } from "@/hooks/use-toast"
import Adminloading from './adminloading';


const EU_SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

interface EditProductDialogProps {
  initialData: getProductsResponse;
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
  loading:boolean,
  getallproducts:()=>void
}

export default function EditProductDialog( {loading ,setLoading,initialData, getallproducts}: EditProductDialogProps) {
  const[isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
   
    formState: { errors },
    reset
  } = useForm<addProductFormData>({
    defaultValues: {
      name: initialData.name,
      price: initialData.price,
      category: initialData.category,
      description: initialData.description,
      availableSizes: initialData.availableSizes.map(size => size.toString()),
      productimage: undefined
    }
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialData.availableSizes.map(size => size.toString())
  );

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => {
      const newSizes = prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size];
      
      // Update form value immediately after state update
      setValue('availableSizes', newSizes, { 
        shouldValidate: true 
      });
      
      return newSizes;
    });
  };

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



  const onSubmit = (data: addProductFormData) => {
    setLoading(true)

    const formdata = new FormData();
    formdata.append('availableSizes', JSON.stringify(data.availableSizes));
    formdata.append('name', data.name);
    formdata.append('price', data.price.toString());
    formdata.append('category', data.category);
    formdata.append('description', data.description);

    if (data.productimage && data.productimage.length > 0) {
      formdata.append('productimage', data.productimage[0]);
    }

    // Add your update API call here
    fetch(`/mutlerdata/admin/updateproduct/${initialData._id}`, {
      method: 'PUT',
      body: formdata
    })
    .then(async (res) => {
      if (!res.ok) {
        const errormessage= await res.json()
        throw new Error( errormessage.message || "Failed to delete product");
      }      setIsOpen(false);
      reset();
      toast({title: 'Product updated successfully', description: 'Product details have been updated'});
      getallproducts()
    })
    .catch((error) => {
      console.error('Update failed:', error);
      toast({variant: "destructive", title: 'Error', description: error.message });
      setLoading(false)
    })
  }

  if(loading){
    return <div className='flex justify-center items-center flex-col h-screen w-full'>
  <Adminloading/>
    </div>
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open) }}>
       <DialogTrigger >
       <Edit size={20}/>
      </DialogTrigger>
      <DialogContent className="max-w-2xl py-3">
        <DialogHeader>
          <DialogTitle>Edit Product Details</DialogTitle>
          <DialogDescription>
            Make changes to this product's details
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="space-y-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Product name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
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
                <Label htmlFor="category">Category</Label>
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
  <Label>Available Sizes (EU)</Label>
  <div className="grid grid-cols-6 gap-2 mt-2">
    {EU_SIZES.map((size) => (
      <div key={size} className="flex items-center space-x-2">
        <Checkbox
          id={`size-${size}`}
          checked={selectedSizes.includes(size.toString())}
          onCheckedChange={() => handleSizeToggle(size.toString())}
        />
        <Label htmlFor={`size-${size}`}>{size}</Label>
      </div>
    ))}
  </div>
  {errors.availableSizes && (
    <p className="text-red-500 text-sm mt-1">{errors.availableSizes.message}</p>
  )}
</div>

            <div>
              <Label htmlFor="productimage">Product Image</Label>
              <Input
                id="productimage"
                type="file"
                accept="image/*"
                className="mt-1"
                {...register('productimage', {
                  validate: {
                    fileType: (fileList: File[]) => {
                      if (!fileList?.[0]) return true; // Optional on edit
                      return fileList[0].type.startsWith('image/') || 'File must be an image';
                    },
                    fileSize: (fileList: File[]) => {
                      if (!fileList?.[0]) return true; // Optional on edit
                      return fileList[0].size <= 4 * 1024 * 1024 || 'Image must be less than 4MB';
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
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={()=>{setIsOpen(false); reset()}} >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}