
import { useEffect, useState } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'

import IssueDetailCard from '@/components/IssueDetailCard';
import Loading from '@/components/Loading';
import { WorkStatus } from '@/modules/WorkStatus';

// Defining an interface for the URL parameters
interface IParams extends ParsedUrlQuery {
  username: string;
  reponame: string;
  issue: string;
}

type IssueProps = {
  state: string;
  title: string;
  body: string;
}

const Issue = ({ username, reponame, issue }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [issueData, setIssueData] = useState<IssueProps>({ state: '', title: '', body: '' })
  const [workStatus, setWorkStatus] = useState(WorkStatus.NoLabel)
  const [isLoading, setLoading] = useState(false)

  // Function to fetch the repository issues from Github API
  const fetchRepoIssue = async () => {
    setLoading(true)
    fetch(`https://api.github.com/repos/${username}/${reponame}/issues/${issue}`)
      .then(response => response.json())
      .then(data => {
        // Updating the repository issues state with the received data
        setIssueData(data)
        for (let label of data.labels) {
          for (let key in label) {
            if (key === 'name' && label[key] in WorkStatus) {
              setWorkStatus(label[key])
            }
          }
        }
        setLoading(false)
      })
      .catch(error => console.error(error))
  }

  // UseEffect hook to fetch the repository issues when the page number changes
  useEffect(() => {
    fetchRepoIssue()
  }, [])


  return (
    <>
      <div className='mt-10'>
        <IssueDetailCard className='' username={username} reponame={reponame} issue={issue}
          state={issueData.state} title={issueData.title} body={issueData.body} workStatus={workStatus} />
        {isLoading && <Loading />}
      </div>
    </>
  )
};

// A function that fetches the data needed for the component 'Issues'
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Extracting the parameters 'username' and 'reponame' from the URL query
  const { username, reponame, issue } = context.query as IParams

  // Returning the extracted parameters as props for the component 'Issues'
  return { props: { username, reponame, issue } }
};

export default Issue
