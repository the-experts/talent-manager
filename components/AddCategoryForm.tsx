import React, {useState} from 'react';
import { Dialog } from '@headlessui/react'
import Button from "./atoms/Button";


const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = async (event: React.FormEvent<CategoryFormElement>) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            name: event.currentTarget.elements.categoryName.value
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/categories/create'

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
    }

    // @ts-ignore
    return (
        <>
            <Button onClick={openModal}>
                Voeg Categorie toe
            </Button>
            <Dialog open={isOpen} className="relative z-10" onClose={closeModal}>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Voeg skill toe</Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="categoryName">Categorie</label>
                        <input type="text" id="categoryName" name="category" required />

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
