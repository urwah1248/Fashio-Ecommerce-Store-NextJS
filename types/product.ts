type Stock = {
    size: string;
    quantity: number;
    _id: string;
  };
  
type Image = {
    original: string;
    thumbnail: string;
    _id: string;
};

export type Product = {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    stock: Stock[];
    images: Image[];
    created_at: string;
    __v: number;
};
  
  
  
  