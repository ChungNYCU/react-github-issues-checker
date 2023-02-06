import { useEffect, useState, MouseEventHandler } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import Link from 'next/link';

import Button from './Button';
import IssueCard from '@/components/IssueCard';

type IssueListProps = {
    username: string;
    reponame: string;
    per_page: number;
    className: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const IssueList = (props: IssueListProps) => {

    const PER_PAGE = props.per_page
    const [pageCount, setPageCount] = useState<number>(1)
    const [page, setPage] = useState<number>(PER_PAGE * pageCount)
    const [repoIssues, setRepoIssues] = useState<Object[]>([])
    const [loadMore, setLoadMore] = useState<boolean>(true)

    const fetchRepoIssues = async () => {
        fetch(`https://api.github.com/repos/${props.username}/${props.reponame}/issues?per_page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.length < page) {
                    setLoadMore(false)
                }
                setRepoIssues(data)
                console.log(`Load page ${pageCount}`, data)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchRepoIssues()
    }, [page])

    useEffect(() => {
        setPage(PER_PAGE * pageCount)
    }, [pageCount])

    useBottomScrollListener(() => {
        if (loadMore === true) {
            setPageCount(pageCount + 1)
        } else {
            console.log('No more issue')
        }
    })

    return (
        <div className={`${props.className} mt-3`}>
            <div className='mt-10 mb-5 flex flex-row items-center justify-between'>
                <div className='flex items-center justify-left '>
                    <Button className='ease-in duration-300 bg-blue-500 text-white px-6 ml-2' onClick={() => { }}>Open</Button>
                    <Button className='ease-in duration-300 bg-green-500 text-white px-6 ml-2' onClick={() => { }}>In Progress</Button>
                    <Button className='ease-in duration-300 bg-red-500 text-white px-6 ml-2' onClick={() => { }}>Done</Button>
                </div>
                <div className='flex items-center justify-left '>
                    <Button className='ease-in duration-300 bg-blue-500 text-white px-6 ml-2' onClick={() => { }}>Order</Button>
                </div>
            </div>
            {repoIssues.map((issue: any, i: number) => (
                <Link legacyBehavior href={`/${props.username}/${props.reponame}/${issue.title}`} className='' key={'link' + i}>
                    <div>
                        <IssueCard body={issue.body} className='mt-2' onClick={() => { }} key={i}>{issue.title}</IssueCard>
                    </div>
                </Link>
            ))}
            {!loadMore && <div>No more issue</div>}
        </div>
    )
}

export default IssueList