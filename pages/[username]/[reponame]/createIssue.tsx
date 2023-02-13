import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

import CreateIssue from '@/components/CreateIssue'

// Defining an interface for the URL parameters
interface IParams extends ParsedUrlQuery {
    username: string;
    reponame: string;
};

const createIssue = ({ username, reponame }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1 className='mt-10 dark:text-blue-500'>{`Create issue`}</h1>
            <h3 className='mt-5 mb-5'>Repo: {reponame}</h3>
            <CreateIssue username={username} reponame={reponame} />
        </div>

    )
}

// A function that fetches the data needed for the component 'EditIssue'
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Extracting the parameters 'username' and 'reponame' from the URL query
    const { username, reponame } = context.query as IParams

    // Returning the extracted parameters as props for the component 'EditIssue'
    return { props: { username, reponame } }
};

export default createIssue