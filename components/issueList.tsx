import { MouseEventHandler, useEffect, useState } from 'react'
import Card from '@/components/Card';
import Link from 'next/link';
import Button from './Button';

type IssueListProps = {
    username: string;
    reponame: string;
    className: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const IssueList = (props: IssueListProps) => {

    const [repoIssues, setRepoIssues] = useState<Object[]>([])

    const fetchRepoIssues = async () => {
        fetch(`https://api.github.com/repos/${props.username}/${props.reponame}/issues`)
            .then(response => response.json())
            .then(data => {
                setRepoIssues(data)
                console.log(data)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchRepoIssues()
    }, [])

    return (
        <div className={`${props.className} mt-3`}>
            <div className='mt-10 mb-3 flex flex-row items-center justify-between'>
                <div className='flex items-center justify-left '>
                    <Button className='ease-in duration-300 bg-blue-500 text-white px-6 ml-2' onClick={() => { }}>Open</Button>
                    <Button className='ease-in duration-300 bg-green-500 text-white px-6 ml-2' onClick={() => { }}>In Progress</Button>
                    <Button className='ease-in duration-300 bg-red-500 text-white px-6 ml-2' onClick={() => { }}>Done</Button>
                </div>
                <div className='flex items-center justify-left '>
                    <Button className='ease-in duration-300 bg-blue-500 text-white px-6 ml-2' onClick={() => { }}>Order</Button>
                </div>
            </div>
            {repoIssues.map((issue: any, i: any) => (
                <Link legacyBehavior href={`/${props.username}/${props.reponame}/${issue.title}`} className='mt-10' key={'link' + i}>
                    <a className='reponame text-lg'>{`${i + 1}. ${issue.title}`}<br /></a>
                </Link>
            ))}
        </div>
    )
}

export default IssueList