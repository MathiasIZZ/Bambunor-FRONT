export interface ProductModelServer {

    id: number;
    name: string; 
    category: string;
    description: string; 
    price: number; 
    image: string; 
    images: string; 
    quantity: number; 
    
}

export interface ServerResponse {
    counnt: number;
    products: ProductModelServer[];
}