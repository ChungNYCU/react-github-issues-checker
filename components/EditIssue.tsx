import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import Router from 'next/router'

import Button from './Button'
import { WorkStatus } from '@/modules/WorkStatus'

type EditIssueProps = {
    username: string;
    reponame: string;
}

const EditIssue = (props: EditIssueProps) => {

    const { data: session } = useSession()
    const [token, setToken] = useState<any>('')


    useEffect(() => {
        setToken(session?.accessToken)
    }, [])



    // Handles the submit event on form submit.
    const handleSubmit = async (event: any) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            title: event.target.title.value,
            body: event.target.body.value,
            labels: [event.target.labels.value],
        }

        fetch(`https://api.github.com/repos/${props.username}/${props.reponame}/issues`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                response.json()
                if (response.status === 201) {
                    alert('Issue creation successfully')
                    Router.back()
                } else {
                    alert(`${response.status} Issue creation failed`)
                }
            })
            .then((json) => console.log(json))
            .catch(error => console.error(error))
    }


    return (
        // We pass the event to the handleSubmit() function on submit.
        <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue title</label>
            <div className='flex items-center justify-between'>

                <input type="text" id="title" name="title"
                    className="mr-2 block p-2.5 w-5/6 text-sm text-gray-900 bg-gray-50 rounded-lg border 
                            border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter issue title"
                    required />

                <select name="labels" id="labels"
                    className="block p-2.5 w-1/6 text-sm text-gray-900 bg-gray-50 rounded-lg border 
                            border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={WorkStatus.Open}>{WorkStatus.Open}</option>
                    <option value={WorkStatus.InProgress}>{WorkStatus.InProgress}</option>
                    <option value={WorkStatus.Done}>{WorkStatus.Done}</option>
                </select>

            </div><br />

            <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue body</label>
            <textarea id="body" rows={6} minLength={30}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                        border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter issue body"
                required>
            </textarea><br />

            <div className='flex items-center justify-end'>
                <Button className='bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => { }}>Submit</Button>
            </div>
        </form>
    )
}

export default EditIssue