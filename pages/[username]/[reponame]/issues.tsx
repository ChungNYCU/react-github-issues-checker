import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { ParsedUrlQuery } from 'querystring'

import IssueList from '@/components/issueList'

interface IParams extends ParsedUrlQuery {
  username: string;
  reponame: string;
};

const Issues = ({ username, reponame }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const PER_PAGE = 10

  return (
    <>
      <div>
        <h1 className='mt-10 dark:text-blue-500'>{`Issue list`}</h1>
        <h3 className='mt-5'>{reponame}</h3>
        <IssueList username={username} reponame={reponame} per_page={PER_PAGE}
          className={''} onClick={() => { }} />
      </div>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username, reponame } = context.query as IParams

  return { props: { username, reponame } }
};

export default Issues