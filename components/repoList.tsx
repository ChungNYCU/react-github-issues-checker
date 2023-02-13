import { useEffect, useState, MouseEventHandler } from 'react'

import Link from 'next/link'
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { fetchRepos, handleBackButtonClick } from './fetchGitHubApi'
import Button from './Button'
import Loading from './Loading'
import RepoCard from './RepoCard'

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
