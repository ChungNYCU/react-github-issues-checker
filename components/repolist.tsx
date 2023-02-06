import { MouseEventHandler, useEffect, useState } from 'react'

import Link from 'next/link'

import RepoCard from '@/components/RepoCard'

type RepoListProps = {
    username: string;
    className: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Repolist = (props: RepoListProps) => {

    const [repos, setRepos] = useState<Object[]>([])
    const [isLoading, setLoading] = useState(false)

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

    useEffect(() => {
        fetchRepos()
    }, [])

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

export default Repolist