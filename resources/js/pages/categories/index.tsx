import { Category } from "@/types"
import { Head, useForm } from "@inertiajs/react";
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
        </>
    )
}