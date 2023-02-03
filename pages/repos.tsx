import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import Button from '@/components/Button'
import Card from '@/components/Card'
import IssueList from './issueList'
import React from 'react'

const selectRepo = () => {

    const { data: session } = useSession()
    const USERNAME = session?.user?.name

    const [repos, setRepos] = useState<Object[]>([])
    const [repoIssues, setRepoIssues] = useState<Object[]>([])
    const [isLoading, setLoading] = useState(false)
    const [issuesDisplay, setIssuesDisplay] = useState(false)
    const [targetRepo, setTargetRepo] = useState('')

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

    const fetchRepoIssues = async (repoName: string) => {
        setLoading(true)
        fetch(`https://api.github.com/repos/${USERNAME}/${repoName}/issues`)
            .then(response => response.json())
            .then(data => {
                setRepoIssues(data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        // get user repos
        fetchRepos()
    }, [])

    const inputRef = useRef(null);

    if (isLoading) return <div className='mt-10'>Loading...</div>

    if (session) {
        return (
            <section>
                <h1 className='mt-10 dark:text-blue-500'>Select a repository</h1>
                <div className=' mt-10 grid grid-cols-1 gap-4 content-start'>
                    {repos.map((repo: any, i) => (
                        <Link passHref legacyBehavior href={`/${USERNAME}/${repo.name}/issues`} key={'link' + i}>
                            <a className='reponame'>{`${repo.name}: \n open issues: ${repo.open_issues_count}`}</a>
                            {/* <Card openIssues={repo.open_issues_count} className='' onClick={() => { }} key={i}>{repo.name}</Card> */}
                        </Link>
                    ))}
                </div>
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

export default selectRepo