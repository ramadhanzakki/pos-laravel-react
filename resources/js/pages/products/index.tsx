import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/types";
import { router } from "@inertiajs/react";
import { Ghost, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface props{
    products: Product,
    categories: Category
}

export default function ProductIndex({ products, categories }: props) {

    const [ showForm, setShowForm ] = useState(false);
    const [ editing, setEditing ] = useState<Product|null>(null);

    function handleEdit(products:Product) {
        setShowForm(true)
        setEditing(products)
    }

    function handleDelete(products:Product) {
        if (!confirm(`Delete ${products.name}?`)) return
        router.delete(`/products/${products.id}`, {
            onSuccess: () => toast.success("Product deleted")
        })
    }

    function handleClose() {
        setShowForm(false)
        setEditing(null)
    }

    return(
        <>
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Button onClick={() => { setEditing(null); setShowForm(true) }}>
                        <Plus className="mr-2 h4 w-4"/>
                        Add Product
                    </Button>
                </div>
                <div className="rounded-lg border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-right">Price</th>
                                <th className="px-4 py-3 text-right">Stock</th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 && (
                                <tr >
                                    <td colSpan={6} className="px-8 py-6 text-center text-muted-foreground">
                                        No products yet. Click "Add Product" to get started
                                    </td>
                                </tr>
                            )}
                            {products.map((product) => {
                                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/25">
                                    <td className="px-4 py-3 font-medium">{product.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{product.category.name}</td>
                                    <td className="px-4 py-3 text-right">{product.price}</td>
                                    <td className={`px-4 py-3 text-right ${product.stock <= 5 ? 'font-semibold text-orange-600' : ''}`}>
                                        {product.stock}
                                        {product.stock === 0 && <span className="ml-1 text-xs text-destructive">(out)</span>}
                                    </td>
                                    <td className="px-4 py3 text-center">
                                        <Badge variant={product.is_active ? 'default' : 'secondary'}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py3 text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                                            <Pencil className="h-4 w-4"/>
                                        </Button>
                                        <Button variant="ghost" size='icon' onClick={() => {handleDelete(product)}}>
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}