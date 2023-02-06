import { MouseEventHandler } from 'react'

enum WorkStatus {
    Open = 'Open',
    InProgress = 'InProgress',
    Done = 'Done',
    NoLabel = 'NoLabel',
}

type IssueCardProps = {
    title: string;
    body: string;
    workStatus: string;
    className: string;
    onClick: MouseEventHandler;
}

const IssueCard = (props: IssueCardProps) => {
    return (
        <a onClick={props.onClick} className={`${props.className} ease-in duration-300 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
            <div className='flex flex-row justify-between'>
                <h5 className="mb-2 font-bold tracking-tight">{props.title}</h5>
                {props.workStatus === WorkStatus.Open && <h6 className="mb-2 text-blue-500 dark:text-blue-300 tracking-tight">{props.workStatus}</h6>}
                {props.workStatus === WorkStatus.InProgress && <h6 className="mb-2 text-red-500 dark:text-red-300 tracking-tight">{props.workStatus}</h6>}
                {props.workStatus === WorkStatus.Done && <h6 className="mb-2 text-green-500 dark:text-green-300 tracking-tight">{props.workStatus}</h6>}
                {props.workStatus === WorkStatus.NoLabel && <h6 className="mb-2 text-gray-500 dark:text-gray-300 tracking-tight">{props.workStatus}</h6>}
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">{props.body}</p>
        </a>
    )
}

export default IssueCard