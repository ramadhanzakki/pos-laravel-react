import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Category } from "@/types"
import { Head, useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";

type CategoryWithCount = Category & { product_count: number };

interface props{
    categories: CategoryWithCount[]
}

export default function CategoryIndex({categories}:props) {
    const [ showForm, setShowForm ] = useState(false);
    const [ editing, setEditing ] = useState<Category|null>(null);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: ''
    })

    function openCreate() {
        reset()
        setEditing(null)
        setShowForm(true)
    }

    function openEdit(cat:Category) {
        setData({ name: cat.name, description: cat.description ?? ''})
        setEditing(cat)
        setShowForm(true)
    }

    function closeForm() {
        reset()
        setEditing(null)
        setShowForm(false)
    }

    return(
        <>
            <Head title="Categories"/>
            <div className="p-6">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Categories</h2>
                    <Button onClick={openCreate}>
                        <Plus className="mr-2 h-4 w-4"/>
                        Add Cateogry
                    </Button>
                </div>

                <div className="rounded-lg border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-right">Products</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}

CategoryIndex.layout = { breadcrumbs: [{ title: 'Categories', href: '/categories' }] }