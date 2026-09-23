import InputError from "@/components/input-error";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Product } from "@/types";
import { useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { FormEvent } from "react";
import { toast } from "sonner";

interface props{
    product?: Product | null,
    categories: Category,
    onClose: () => void
}

export default function ProductForm({product, categories, onClose}: props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: product?.name ?? '',
        category_id: product?.category_id?.toString() ?? '',
        desctiption: product?.description ?? '',
        price: product?.price ?? '',
        stock: product?.stock?.toString() ?? '0',
        is_active: product?.is_active ?? true,
        image: null as File | null
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        const opts = {
            forceFromData: true,
            onsuccess: () => {
                toast.success(product ? 'Product Updated' : 'Product Added')
                reset()
                onClose()
            },
            preserveScroll: true
        };
        product ? put(`/products/${product.id}`, opts) : post('/products/', opts);
    }

    return(
        <>
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name: </Label>
                        <Input type="text" name="name" id="name" value={data.name} onChange={e => setData('name', e.target.value)}/>
                        <InputError message={errors.name}/>
                    </div>

                    <div>
                        <label>Category</label>
                        <Select value={data.category_id} onValueChange={v => setData('category_id', v)}>
                            <SelectTrigger><SelectValue placeholder="Select Category"/></SelectTrigger>
                            <SelectContent>
                                {categories.map(c => (
                                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.category_id}/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="price">Price (Rp)</Label>
                            <Input id="price" type="number" step="0.01" min="0.01" value={data.price} 
                                onChange={e => setData('price', e.target.value)}/>
                            <InputError message={errors.price}/>
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" min="0" value={data.stock}
                                onChange={e => setData('stock', e.target.value)}/>
                            <InputError message={errors.name}/>
                        </div>
                    </div>

                    
                </form>
            </DialogContent>
        </Dialog>
        </>
    );
}