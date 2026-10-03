import { Input } from "@/components/ui/input";
import { CartItem, Product } from "@/types";
import { Head } from "@inertiajs/react";
import { LayoutGrid, Link, Search } from "lucide-react";
import { useState } from "react";
import ProductGrid from "./product-grid";
import CartPanel from "./cart-panel";
import { useCart } from "./use-cart";

interface props{
    products: Product[]
}

export default function PosIndex({ products }:props) {
    const [ search, setSearch ] = useState('');
    const { items, subTotal, addItem, removeItem, setQuantity, clear } = useCart()

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.category.name.toLowerCase().includes(search.toLowerCase())
    )

    return(
        <>
            <Head title="Point of Sales"/>
            <div className="flex h-screen flex-col bg-background">
                {/* Top Bar */}
                <div className="flex items-center gap-4 border-b px-4 py-3">
                    <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <LayoutGrid className="w-5 h-5"/>
                    </Link>
                    <span className="font-semibold">Point of Sales</span>
                    <div className="relative ml-4 flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                        <Input
                            className="pl-9"
                            placeholder="Search product"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Main Area */}
                <div className="flex flex-1 overflow-hidden">
                    <ProductGrid products={filtered} onAdd={addItem}/>
                    <CartPanel 
                        items={items}
                        subtotal={subTotal}
                        onRemove={removeItem}
                        onSetQuantity={setQuantity}
                        onClear={clear}
                    />
                </div>
            </div>
        </>
    )

}