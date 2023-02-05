import { useState, useCallback, useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Link from 'next/link';
import IssueList from '@/components/issueList';

interface IParams extends ParsedUrlQuery {
  username: string;
  reponame: string;
};

const Issues = ({ username, reponame }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [pageNumber, setPageNumber] = useState<number>(1);
  const { GetIssues } = useActions();
  const { user, data, error } = useTypedSelector((state) => state.repositories);
  const router = useRouter();

  useEffect(() => {
    GetIssues(username, reponame);
  }, []);

  useEffect(() => {
    if (error != null) router.push('/404');
  }, [error]);

  const handleOnDocumentBottom = useCallback(() => {
    // When repos still available
    if ((pageNumber * 10 <= user.public_repos)) {
      GetIssues(username, reponame);
      setPageNumber(pageNumber + 1);
    }
  }, [data]);
  // When reach page bottom, get new data
  useBottomScrollListener(() => { console.log('BOTTOM!!!') });

  return (
    <>
      <div>
        <h1 className='mt-10 dark:text-blue-500'>{`Issue list`}</h1>
        <h3 className='mt-5'>{reponame}</h3>
        <IssueList username={username} reponame={reponame}
          className={''} onClick={() => { }} />
      </div>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username, reponame } = context.query as IParams;

  return { props: { username, reponame } };
};

export default Issues;