import { useEffect, useState, MouseEventHandler } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ArrowLeftIcon, AdjustmentsHorizontalIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

import { fetchRepoIssues, handleBackButtonClick } from './fetchGitHubApi'
import Button from './Button'
import IssueCard from './IssueCard'
import Loading from './Loading'
import { WorkStatus } from '@/modules/WorkStatus'
import WorkStatusDropDown from './WorkStatusDropDown'

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
    const [labels, setLabels] = useState<string>('')
    const [sort, setSort] = useState('created') // created, updated, comments
    const [direction, setDirection] = useState('desc') // asc, desc
    const [repoIssues, setRepoIssues] = useState<Object[]>([])
    const [isLoading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState<boolean>(true)
    

    // UseEffect hook to set the page number when the page count changes
    useEffect(() => {
        setPage(PER_PAGE * pageCount)
    }, [pageCount])

    // UseEffect hook to fetch the repository issues when the page, labels, direction, and loadMore changes
    useEffect(() => {
        fetchRepoIssues(props.username, props.reponame, page, labels, sort, direction, setRepoIssues, setLoadMore, setLoading)
    }, [page, labels, direction])

    useEffect(() => {
        fetchRepoIssues(props.username, props.reponame, page, labels, sort, direction, setRepoIssues, setLoadMore, setLoading)
    }, [page, labels, direction])

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

    const handleFilterButtonClick = (label: string) => {
        setLabels(label)
    }

    const handleSortButtonClick = () => {
        setDirection(direction === 'desc' ? 'asc' : 'desc')
    }

    const handleResetButtonClick = () => {
        handleFilterButtonClick('')
        setDirection('desc')
        setPage(PER_PAGE * pageCount)
        setLoadMore(true)
    }

    // Handles the submit event on form submit.
    const handleSubmit = async (event: any) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get querystring from the form.
        const querystring = event.target.search.value.replace(' ', '+')
        setPage(100)

        fetch(`https://api.github.com/search/issues?q=${querystring}+repo:${props.username}/${props.reponame}&per_page=${page}&sort=${sort}&order=${direction}`)
            .then(response => response.json())
            .then(data => {
                setRepoIssues(data.items)
                setLoading(false)
                setLoadMore(false)
            })
            .catch(error => console.error(error))
    }

    // UseBottomScrollListener hook to detect when the user has scrolled to the bottom of the page
    useBottomScrollListener(() => {
        // If there are still issues to be loaded, increase the page count to load the next page
        if (loadMore === true) {
            setPageCount(pageCount + 1)
        }
    })

    return (
        <div className={`${props.className} mt-3`}>

            <div className='mt-10 flex flex-row items-center justify-between'>
                <div className='flex items-center justify-left '>
                    <div>
                        <Button
                            className={'ml-2 bg-gray-50 text-black hover:bg-gray-300 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 px-2 py-2'}
                            onClick={handleBackButtonClick}>
                            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </div>

                </div>
                <Link href={`/${props.username}/${props.reponame}/createIssue`}>
                    <div className='flex items-center justify-left'>
                        <Button className='ml-2 bg-yellow-300 text-black hover:bg-yellow-500 hover:text-white px-6 py-2 ' onClick={() => { }}>Create Issue</Button>
                    </div>
                </Link>
            </div>

            <div className='mt-2 mb-5 flex flex-row items-center justify-between'>
                <div className='flex items-center justify-left'>
                    <WorkStatusDropDown workStatus={labels === '' ? 'Filter' : labels}
                        onOpenStatusButtonClick={() => { handleFilterButtonClick(WorkStatus.Open) }}
                        onInProgressStatusButtonClick={() => { handleFilterButtonClick(WorkStatus.InProgress) }}
                        onDoneStatusButtonClick={() => { handleFilterButtonClick(WorkStatus.Done) }}
                    />
                    <Button
                        className='ml-2 inline-flex w-full justify-center rounded-md hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-700 bg-gray-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2'
                        onClick={() => { handleSortButtonClick() }}>
                        Order
                        {direction === 'desc' && <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />}
                        {direction === 'asc' && <ChevronUpIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />}
                    </Button>
                    <Button
                        className={'ml-2 bg-gray-300 text-black hover:bg-gray-500 hover:text-white px-6 py-2 flex flex-row justify-start items-center w-full text-left text-sm'}
                        onClick={() => { handleResetButtonClick() }}>
                        <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                        Reset
                    </Button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='flex items-center justify-left'>
                        <input className="shadow appearance-none border border-gray-200 dark:border-gray-700 rounded w-full py-1 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline" id="search" type="text" placeholder="Search" required></input>
                        <Button className='ml-2 bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-6' onClick={() => { }}>Search</Button>
                    </form>
                </div>
            </div>

            {repoIssues?.map((issue: any, i: number) => (
                <Link legacyBehavior href={`/${props.username}/${props.reponame}/issues/${issue.number}`} className='' key={'link' + i}>
                    <div>
                        <IssueCard number={issue.number} title={issue.title} body={issue.body}
                            workStatus={getWorkStatus(issue.labels)!} createdAt={issue.created_at}
                            className='mt-2' onClick={() => { }} key={i} />
                    </div>
                </Link>
            ))}
            {!repoIssues && <div className='mt-5 flex justify-center'>Something went wrong, please try again.</div>}
            {isLoading && <Loading />}
            {!loadMore && repoIssues && <div className='mt-5 flex justify-center'>No more issue</div>}
        </div>
    )
}

export default IssueList