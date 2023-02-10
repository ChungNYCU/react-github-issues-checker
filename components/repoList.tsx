import { useEffect, useState, MouseEventHandler } from 'react'

import Link from 'next/link'
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { fetchRepos, handleBackButtonClick } from './fetchGitHubApi'
import RepoCard from './RepoCard'
import Loading from './Loading'
import Button from './Button'

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
                <div className='flex items-center justify-left'>
                    <Button
                        className={'ml-2 bg-gray-50 text-black hover:bg-gray-300 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 px-2 py-2'}
                        onClick={handleBackButtonClick}>
                        <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button
                        className='ml-2 inline-flex w-full justify-center rounded-md hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-700 bg-gray-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2'
                        onClick={() => { }}>
                        Order
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                </div>
                <div className='flex items-center justify-left '>
                    <input className="shadow appearance-none border border-gray-200 dark:border-gray-700 rounded w-full py-1 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" id="search" type="text" placeholder="Search"></input>
                    <Button className='ml-2 bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => { }}>Search</Button>
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
