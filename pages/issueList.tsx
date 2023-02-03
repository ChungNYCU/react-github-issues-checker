import { MouseEventHandler, useState } from 'react'
import { useSession } from 'next-auth/react';
import Card from '@/components/Card';

type IssueListProps = {
    children: any;
    className: string;
    repoName: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const IssueList = (props: IssueListProps) => {

    const { data: session } = useSession()
    const USERNAME = session?.user?.name
    const [repoIssues, setRepoIssues] = useState<Object[]>([])

    const fetchRepoIssues = async (repoName: string) => {
        fetch(`https://api.github.com/repos/${USERNAME}/${repoName}/issues`)
            .then(response => response.json())
            .then(data => {
                setRepoIssues(data)
                console.log(data)
            })
            .catch(error => console.error(error))
    }
    return (
        <div>
            <h1 className='mt-10 dark:text-blue-500'>Issue List</h1>
            <div className='mt-10 grid grid-cols-3 gap-4 content-start'>
                {repoIssues.map((issue: any, i) => (
                    <Card openIssues={0} className='' onClick={() => { }} key={i}>{issue.name}</Card>
                ))}
            </div>
        </div>
    )
}

export default IssueList