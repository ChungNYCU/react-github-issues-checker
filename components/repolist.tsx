import { useEffect, useState, MouseEventHandler } from 'react'

import Link from 'next/link'

import RepoCard from '@/components/RepoCard'

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

    // Asynchronously fetch the repositories for the given username
    const fetchRepos = async () => {
        setLoading(true)
        fetch(`https://api.github.com/users/${props.username}/repos`)
            .then(response => response.json())
            .then(data => {
                setRepos(data)
                setLoading(false)
            })
            .catch(error => console.error(error))
    }

    // Fetch the repos when the component is first mounted
    useEffect(() => {
        fetchRepos()
    }, [])

    // If still loading, display a loading message
    if (isLoading) return <div className='mt-10'>Loading...</div>

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
