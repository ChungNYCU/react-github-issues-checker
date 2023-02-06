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

// Defining the functional component for the IssueList
const IssueList = (props: IssueListProps) => {

    // Constants for the number of issues to be displayed per page
    const PER_PAGE = props.per_page

    // State variables to keep track of the page number and issues loaded
    const [pageCount, setPageCount] = useState<number>(1)
    const [page, setPage] = useState<number>(PER_PAGE * pageCount)
    const [repoIssues, setRepoIssues] = useState<Object[]>([])
    const [loadMore, setLoadMore] = useState<boolean>(true)

    // Function to fetch the repository issues from Github API
    const fetchRepoIssues = async () => {
        fetch(`https://api.github.com/repos/${props.username}/${props.reponame}/issues?per_page=${page}`)
            .then(response => response.json())
            .then(data => {
                // If number of issues received is less than the requested page, it means there are no more issues to be loaded
                if (data.length < page) {
                    setLoadMore(false)
                }
                // Updating the repository issues state with the received data
                setRepoIssues(data)
                console.log(`Load page ${pageCount}`, data)
            })
            .catch(error => console.error(error))
    }

    // UseBottomScrollListener hook to detect when the user has scrolled to the bottom of the page
    useBottomScrollListener(() => {
        // If there are still issues to be loaded, increase the page count to load the next page
        if (loadMore === true) {
            setPageCount(pageCount + 1)
        } else {
            console.log('No more issue')
        }
    })

    // UseEffect hook to set the page number when the page count changes
    useEffect(() => {
        setPage(PER_PAGE * pageCount)
    }, [pageCount])

    // UseEffect hook to fetch the repository issues when the page number changes
    useEffect(() => {
        fetchRepoIssues()
    }, [page])

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