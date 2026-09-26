import InputError from "@/components/input-error";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/types"
import { Head, router, useForm } from "@inertiajs/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type CategoryWithCount = Category & { products_count: number };

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

    function handleDelete(cat:CategoryWithCount) {
        if (cat.products_count > 0) {
            toast.error(`Cannot delete "${cat.name}" - it has ${cat.products_count} products(s). Reassign them first`)
            return
        }

        if (!confirm(`Delete category ${cat.name}`)) return

        router.delete(`/categories/${cat.id}`, {
            onSuccess: () => toast.success('Category deleted')
        })
    }

    function submit(e:React.FormEvent) {
        e.preventDefault()
        if (editing) {
            put(`/cateogories/${editing.id}`, {
                onSuccess: () => { toast.success('Category updated'); closeForm(); }
            })
        } else {
            post(`/categories`, {
                onSuccess: () => { toast.success('Category Added'); closeForm(); }
            })
        }
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
                        <tbody>
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                        No Categories yet. Add one to get started
                                    </td>
                                </tr>
                            )}
                            {categories.map(cat => (
                                <tr>
                                    <td className="px-4 py-3 font-medium">{cat.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{cat.description ?? '-'}</td>
                                    <td className="px-4 py-3 text-right">{cat.products_count}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant='ghost' size='icon' onClick={() => {openEdit(cat)}}>
                                            <Pencil className="h-4 w-4"/>
                                        </Button>
                                        <Button variant='ghost' size='icon' onClick={() => {handleDelete(cat)}}>
                                            <Trash2 className="h-4 w-4 text-destructive"/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                { /** Dialog */}
                <Dialog open={showForm} onOpenChange={closeForm}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{ editing ? 'Edit Category' : 'Add Cateogry' }</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="cat-name">Name:</Label>
                                <Input id="cat-name" value={data.name}
                                    onChange={e => setData('name', e.target.value)}/>
                                <InputError message={errors.name}/>
                            </div>
                            <div>
                                <Label htmlFor="cat-desc">Description (optional):</Label>
                                <Input id="cat-desc" value={data.description}
                                    onChange={e => setData('description', e.target.value)}/>
                                <InputError message={errors.description}/>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant='outline' onClick={closeForm}>Cancel</Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : editing ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

CategoryIndex.layout = { breadcrumbs: [{ title: 'Categories', href: '/categories' }] }