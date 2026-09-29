import { CartItem, Product } from "@/types";
import { useState } from "react";

interface props{
    products: Product[]
}

export default function PosIndex({ products }:props) {
    const [ search, setSearch ] = useState('');
    const [ cartItem, setCartItem ] = useState<CartItem[]>([])

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.category.name.toLowerCase().includes(search.toLowerCase())
    )

    function addItem(product:Product) {
        setCartItem(current => {
            const existing = current.find(item => item.product.id === product.id);
            if (existing) {
                return current.map(item => 
                    item.product.id === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            }
            return [...current, { product, quantity: 1 }];
        })
    }


}