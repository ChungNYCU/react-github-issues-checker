import { MouseEventHandler } from 'react'

type RepoCardProps = {
    children: any;
    openIssues: number;
    className: string;
    onClick: MouseEventHandler;
}

const RepoCard = (props: RepoCardProps) => {
    return (
        <a onClick={props.onClick} className={`${props.className} ease-in duration-300 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
            <h5 className="mb-2 font-bold tracking-tight ">{props.children}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">open issues: {props.openIssues}</p>
        </a>
    )
}

export default RepoCard