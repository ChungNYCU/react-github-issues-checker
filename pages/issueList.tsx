import { useState, useEffect } from 'react'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import Button from '@/components/Button'

//const reposFromLocalStorage = JSON.parse(window.localStorage.getItem('repos')!)


const IssueList = () => {

    const { data: session } = useSession()
    const USERNAME = session?.user?.name

    const [repos, setRepos] = useState<Object[]>([])
    const [orgs, setOrgs] = useState([])
    const [isLoading, setLoading] = useState(false)

    const fetchRepos = async () => {
        setLoading(true)
        fetch(`https://api.github.com/users/${USERNAME}/repos`)
            .then(response => response.json())
            .then(data => {
                setRepos(data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }

    const fetchOrgs = async () => {
        setLoading(true)
        fetch(`https://api.github.com/users/${USERNAME}/orgs`)
            .then(response => response.json())
            .then(data => {
                setOrgs(data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        // get user repos
        fetchRepos()
        // get org repos
        fetchOrgs()
    }, [])

    if (isLoading) return <div>Loading...</div>

    if (session) {
        return (
            <section>
                <h1 className='dark:text-blue-500'>Issue List</h1>
                {repos.map((repo: any, i) => (
                    <div key={i}>{repo.name}</div>
                ))}
            </section>
        )
    } else {
        return (
            <section className="flex items-center h-full p-16 dark:text-gray-100">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <h3 className="text-center font-semibold mt-20 dark:text-blue-500">Please Login</h3>
                    <Link href="/">
                        <Button className='ease-in duration-300 mt-20 bg-blue-500 text-white px-6' onClick={() => { }}>Back to homepage</Button>
                    </Link>
                </div>
            </section>
        )
    }

}

export default IssueList