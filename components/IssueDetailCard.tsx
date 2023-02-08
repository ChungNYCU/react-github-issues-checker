import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import { updateIssue } from './fetchGitHubApi'
import Button from './Button'
import MoreOptionDropDown from './MoreOptionDropDown'
import WorkStatusDropDown from './WorkStatusDropDown'
import { WorkStatus } from '@/modules/WorkStatus'

type IssueDetailCardProps = {
    username: string;
    reponame: string;
    issue: number;
    state: string;
    title: string;
    body: string;
    workStatus: string;
    className: string;
}

const IssueDetailCard = (props: IssueDetailCardProps) => {

    const { data: session } = useSession()
    const [token, setToken] = useState<any>('')

    useEffect(() => {
        setToken(session?.accessToken)
    }, [])

    const handleOpenStatusButtonClick = () => {
        const ReqBody = { labels: [WorkStatus.Open] }
        updateIssue(props.username, props.reponame, props.issue, token, ReqBody)
    }

    const handleInProgressStatusButtonClick = () => {
        const ReqBody = { labels: [WorkStatus.InProgress] }
        updateIssue(props.username, props.reponame, props.issue, token, ReqBody)
    }

    const handleDoneStatusButtonClick = () => {
        const ReqBody = { labels: [WorkStatus.Done] }
        updateIssue(props.username, props.reponame, props.issue, token, ReqBody)
    }

    const handleDeleteButtonClick = () => {
        const ReqBody = { state: 'closed' }
        updateIssue(props.username, props.reponame, props.issue, token, ReqBody)
    }

    return (
        <div className='m-2 bg-gray-200  dark:bg-gray-700 border dark:border-gray-700 rounded-lg'>
            <div className='m-10 flex items-center justify-between'>
                <div className='flex items-center justify-start'>
                    {props.state === 'open' &&
                        <WorkStatusDropDown workStatus={props.workStatus}
                            onOpenStatusButtonClick={handleOpenStatusButtonClick} onInProgressStatusButtonClick={handleInProgressStatusButtonClick} onDoneStatusButtonClick={handleDoneStatusButtonClick} />}
                    <div>
                        {props.state === 'closed' && <Button className='mr-2 ease-in duration-300 bg-gray-300 text-black hover:bg-gray-500 hover:text-white px-6' onClick={() => { }}>Closed</Button>}
                    </div>
                </div>
                <MoreOptionDropDown onDeleteButtonClick={handleDeleteButtonClick} />
            </div>
            <div className='m-10'>
                <h4 className='mt-10 font-bold'>{`#${props.issue} ${props.title}`}</h4>
                <p className='mt-5'>{props.body}</p>
            </div>
            <div></div>
        </div>
    )
}

export default IssueDetailCard