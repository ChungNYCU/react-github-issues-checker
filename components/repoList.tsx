import { useEffect, useState, MouseEventHandler } from 'react'

import Link from 'next/link'

import { fetchRepos, hanedleBackButtonClick } from './fetchGitHubApi'
import RepoCard from './RepoCard'
import Loading from './Loading'
import Button from './Button'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

type RepoListProps = {
    username: string;
    className: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

// A functional component that displays a list of GitHub repositories for a given user
const RepoList = (props: RepoListProps) => {

    // State variables to store the repos and the loading state
    const [repos, setRepos] = useState<Object[]>([])
    const [isLoading, setLoading] = useState(false)

    // Fetch the repos when the component is first mounted
    useEffect(() => {
        fetchRepos(props.username, setRepos, setLoading)
    }, [])

    // If still loading, display a loading message
    if (isLoading) return (
        <Loading />
    )

    return (
        <div className={`${props.className} mt-3 gap-4 content-start`}>
            <div className='mt-10 mb-5 flex flex-row items-center justify-between'>
                <div className='flex items-center justify-left '>
                    <div>
                        <Button
                            className={'ml-2 bg-gray-300 text-black hover:bg-gray-500 hover:text-white px-2 py-2'}
                            onClick={hanedleBackButtonClick}>
                            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </div>
                    <Button className='ml-2 bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => { }}>Open</Button>
                    <Button className='ml-2 bg-red-300 text-black hover:bg-red-500 hover:text-white px-6' onClick={() => { }}>In Progress</Button>
                    <Button className='ml-2 bg-green-300 text-black hover:bg-green-500 hover:text-white px-6' onClick={() => { }}>Done</Button>
                </div>
                <div className='flex items-center justify-left '>
                    <Button className='ml-2 bg-gray-300 text-black hover:bg-gray-500 hover:text-white px-6' onClick={() => { }}>Order</Button>
                    <Button className='ml-2 bg-yellow-300 text-black hover:bg-yellow-500 hover:text-white px-6' onClick={() => { }}>Create Issue</Button>
                </div>
            </div>
            {repos.map((repo: any, i) => (
                <Link legacyBehavior href={`/${props.username}/${repo.name}/issues`} passHref className='' key={'link' + i}>
                    <div>
                        <RepoCard openIssues={repo.open_issues_count} className='mt-3' onClick={() => { }} key={i}>{repo.name}</RepoCard>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RepoList
