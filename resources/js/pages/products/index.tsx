import { Category, Product } from "@/types";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
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
                    <button onClick={() => { setEditing(null); setShowForm(true) }}>
                        <Plus className="mr-2 h4 w-4"/>
                        Add Product
                    </button>
                </div>
            </div>
        </>
    )

}