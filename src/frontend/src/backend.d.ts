import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    brand: string;
    price: number;
}
export enum Category {
    shoe = "shoe",
    watch = "watch"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductById(id: string): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    initialize(): Promise<void>;
    updateProduct(id: string, updatedProduct: Product): Promise<void>;
}
