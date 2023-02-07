import { useEffect, useState, MouseEventHandler } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

import Link from 'next/link'

import { fetchRepoIssues } from './fetchGitHubApi'
import Button from './Button'
import IssueCard from './IssueCard'
import Loading from './Loading'
import { WorkStatus } from '@/modules/WorkStatus'

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
    const [isLoading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState<boolean>(true)

    const getWorkStatus = (labels: []) => {
        for (let label of labels) {
            //@ts-ignore
            for (let key in label) {
                if (key === 'name' && label[key] in WorkStatus) {
                    return label[key]
                }
            }
        }
        return WorkStatus.NoLabel
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
        fetchRepoIssues(props.username, props.reponame, page, setRepoIssues, setLoadMore, setLoading)
    }, [page])

    return (
        <div className={`${props.className} mt-3`}>
            <div className='mt-10 mb-5 flex flex-row items-center justify-between'>
                <div className='flex items-center justify-left '>
                    <Button className='ease-in duration-300 ml-2 bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => { }}>Open</Button>
                    <Button className='ease-in duration-300 ml-2 bg-red-300 text-black hover:bg-red-500 hover:text-white px-6' onClick={() => { }}>In Progress</Button>
                    <Button className='ease-in duration-300 ml-2 bg-green-300 text-black hover:bg-green-500 hover:text-white px-6' onClick={() => { }}>Done</Button>
                </div>
                <div className='flex items-center justify-left '>
                    <Button className='ease-in duration-300 ml-2 bg-gray-300 text-black hover:bg-gray-500 hover:text-white px-6' onClick={() => { }}>Order</Button>
                    <Button className='ease-in duration-300 ml-2 bg-yellow-300 text-black hover:bg-yellow-500 hover:text-white px-6' onClick={() => { }}>Create Issue</Button>
                </div>
            </div>
            {repoIssues.map((issue: any, i: number) => (
                <Link legacyBehavior href={`/${props.username}/${props.reponame}/issues/${issue.number}`} className='' key={'link' + i}>
                    <div>
                        <IssueCard number={issue.number} title={issue.title} body={issue.body} workStatus={getWorkStatus(issue.labels)!} className='mt-2' onClick={() => { }} key={i} />
                    </div>
                </Link>
            ))}
            {isLoading && <Loading />}
            {!loadMore && <div className='mt-5 flex justify-center'>No more issue</div>}
        </div>
    )
}

export default IssueList