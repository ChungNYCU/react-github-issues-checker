import { MouseEventHandler, useEffect, useState } from 'react'
import Card from '@/components/Card';
import Link from 'next/link';
import Button from './Button';

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
        <div className={`${props.className} mt-3`}>
            {repos.map((repo: any, i) => (
                <Link legacyBehavior href={`/${props.username}/${repo.name}/issues`} className='mt-10' key={'link' + i}>
                    <a className='reponame text-lg'>{`${i + 1}. ${repo.name}: ${repo.open_issues_count}`}<br /></a>
                    {/* <Card openIssues={repo.open_issues_count} className='' onClick={() => { }} key={i}>{repo.name}</Card> */}
                </Link>
            ))}
        </div>
    )
}

export default Repolist