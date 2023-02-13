import Link from 'next/link'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

import Button from '@/components/Button'
import EditIssue from '@/components/EditIssue'

// Defining an interface for the URL parameters
interface IParams extends ParsedUrlQuery {
    username: string;
    reponame: string;
    issue: string;
};

const editIssue = ({ username, reponame, issue }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1 className='mt-10 dark:text-blue-500'>{`Edit issue`}</h1>
            <h3 className='mt-5 mb-5'>Repo: {reponame}</h3>
            <EditIssue username={username} reponame={reponame} issue={issue} />
        </div>

    )
}

// A function that fetches the data needed for the component 'EditIssue'
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Extracting the parameters 'username', 'reponame', and 'issue' from the URL query
    const { username, reponame, issue } = context.query as IParams

    // Returning the extracted parameters as props for the component 'EditIssue'
    return { props: { username, reponame, issue } }
};

export default editIssue