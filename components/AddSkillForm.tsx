"use client"
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react'
import Button from "./atoms/Button";

type AddSkillFormProps = {
    categories: {
        id: number;
        name: string;
    }[]
    onUpdate: (cb:Function) => void;
}
const App: React.FC<AddSkillFormProps> = (props:AddSkillFormProps) => {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = async (event: React.FormEvent<SkillFormElement>) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            skillName: event.currentTarget.elements.skillName.value,
            categoryId: event.currentTarget.elements.categoryId.value
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/skills/create'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
        console.log(response);

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        console.log(result);
        props?.onUpdate(result);
    }

    return (
        <>
            <Button onClick={openModal}>
                Voeg Skill toe
            </Button>
            <Dialog open={isOpen} className="relative z-10" onClose={closeModal}>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Voeg skill toe</Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="skillName" className="block text-gray-700 text-sm font-bold mb-2">Skill</label>
                        <input type="text" id="skillName" name="skillName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />

                        <label htmlFor="categoryId" className="block text-gray-700 text-sm font-bold mb-2">Categorie</label>
                        <select id="categoryId" name="categoryId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
                            {props.categories.map((category) => (
                                <option value={category.id} key={category.name}>{category.name}</option>
                            ))}
                        </select>

                        <Button type="submit">Opsturen</Button>
                        <Button onClick={() => setIsOpen(false)}>Sluiten</Button>
                    </form>
                </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default App;
