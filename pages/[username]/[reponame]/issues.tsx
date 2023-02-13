import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

import IssueList from '@/components/issueList'

// Defining an interface for the URL parameters
interface IParams extends ParsedUrlQuery {
  username: string;
  reponame: string;
};

// The component that renders the issues for a particular repository
const Issues = ({ username, reponame }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  // The number of issues to be displayed per page
  const PER_PAGE = 10

  return (
    <>
      <div>
        <h1 className='mt-10 dark:text-blue-500'>{`Issue list`}</h1>
        <h3 className='mt-5'>{reponame}</h3>
        <IssueList
          username={username}
          reponame={reponame}
          per_page={PER_PAGE}
          className={''}
          onClick={() => { }}
        />
      </div>
    </>
  )
}

// A function that fetches the data needed for the component 'Issues'
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Extracting the parameters 'username' and 'reponame' from the URL query
  const { username, reponame } = context.query as IParams

  // Returning the extracted parameters as props for the component 'Issues'
  return { props: { username, reponame } }
};

export default Issues
