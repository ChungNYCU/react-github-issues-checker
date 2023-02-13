import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

import { fetchRepoTitleAndBody, handleBackButtonClick } from './fetchGitHubApi'
import Button from './Button'
import { WorkStatus } from '@/modules/WorkStatus'

type EditIssueProps = {
    username: string;
    reponame: string;
    issue: string;
}

const EditIssue = (props: EditIssueProps) => {

    const { data: session } = useSession()
    const [token, setToken] = useState<any>('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setToken(session?.accessToken)
    }, [])

    useEffect(() => {
        fetchRepoTitleAndBody(props.username, props.reponame, Number(props.issue), setTitle, setBody, setLoading)
    }, [])

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value)
    }
    const handleBodyChange = (event: any) => {
        setBody(event.target.value)
    }


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

        fetch(`https://api.github.com/repos/${props.username}/${props.reponame}/issues/${props.issue}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                response.json()
                if (response.status === 200) {
                    alert('Issue update successfully')
                    Router.back()
                } else {
                    alert(`${response.status} Issue update failed`)
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className='flex items-center justify-left '>
                <div>
                    <Button
                        className={'mb-5 bg-gray-50 text-black hover:bg-gray-300 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 px-2 py-2'}
                        onClick={handleBackButtonClick}>
                        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue title</label>
                <div className='flex items-center justify-between'>
                    <input type="text" id="title" name="title"
                        className="mr-2 block p-2.5 w-5/6 text-sm text-gray-900 bg-gray-50 rounded-lg border 
                                border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter issue title" value={title} onChange={handleTitleChange}
                        required />
                    <select name="labels" id="labels" required
                        className="block p-2.5 w-1/6 text-sm text-gray-900 bg-gray-50 rounded-lg border 
                                border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Task status</option>
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
                    placeholder="Enter issue body" value={body} onChange={handleBodyChange}
                    required>
                </textarea><br />
                <div className='flex items-center justify-end'>
                    <Button className='bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => { }}>Submit</Button>
                </div>
            </form>
        </div>
    )

}

export default EditIssue