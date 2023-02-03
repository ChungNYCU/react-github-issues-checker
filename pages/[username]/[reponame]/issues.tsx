import { useState, useCallback, useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { useSession } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import MenuComponent from '../../../components/Menu';
import RepositoryList from "../../../components/RepositoryList";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface IParams extends ParsedUrlQuery {
  username: string;
  reponame: string;
};

const Issues = ({ username, reponame }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // FIXME username empty after refreash
  console.log(username, reponame)

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
  useBottomScrollListener(handleOnDocumentBottom);

  return (
    <>
      <div>
        <div>{data.length}</div>
        {/* <MenuComponent user={user} /> */}
        <RepositoryList response={data} />
      </div>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username, reponame } = context.query as IParams;

  return { props: { username, reponame } };
};

export default Issues;