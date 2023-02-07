import { useEffect, useState, MouseEventHandler } from 'react'

import Link from 'next/link'

import { fetchRepos } from './fetchGitHubApi'
import RepoCard from './RepoCard'
import Loading from './Loading'

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
