export interface Product {
    id: string;
    name: string;
    price: number;
    sizes: string[];
    category: string;
    description: string;
    images: string[];
    stock: number;
    createdAt: Date;
  }
  
  export interface Order {
    id: string;
    customer: Customer;
    products: OrderProduct[];
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    trackingNumber?: string;
  }
  
  export interface OrderProduct {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    size: string;
  }
  
  export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  }
  
  export interface ContactInquiry {
  _id: string;
    firstname: string;
    Lastname: string;
    email: string;
    country: string;
    employment: string;
    date: string;
  }
  
  export interface QuoteRequest {
    _id: string;
    gender: string;
    firstname: string;
    Lastname: string;
    company: string;
    houseStreet: string;
    localArea: string;
    city: string;
    country: string;
    pairs: number;
    email: string;
    notes: string;
    permission: string;
    phone: string;   
    date: String;
  }

  export interface logoImages {
      filename: string;
      type: string;
      data: string;
    }[];

  export interface CustomRequest {
    _id: string;
    customer: Customer;
    designImage: string;
    description: string;
    status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
    createdAt: Date;
  }

  export interface addProductFormData {
   
    name: string;
    price: number;
    category: "men|women|kids";
    description: string;
    productimage: File[]
    availableSizes: string[];
  }
  
  export interface getProductsResponse {
    _id: string;
    name: string;
    price: number;
    category: "men|women|kids";
    description: string;
    productimage:{
        filename: string;
        data: any; // Consider using a more specific type if possible (e.g., Buffer)
        type: string;
      }
    availableSizes: Number[];
  }
  