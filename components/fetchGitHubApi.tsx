import Router from 'next/router'
import { WorkStatus } from '@/modules/WorkStatus'

// Function to fetch the specific repository issue, ref in file [issue].tsx
export const fetchRepoIssue = async (username: string, reponame: string, issue: number, setData: any, setStatus: any, setLoading: any) => {
    setLoading(true)
    fetch(`https://api.github.com/repos/${username}/${reponame}/issues/${issue}`)
        .then(response => response.json())
        .then(data => {
            // Updating the repository issues state with the received data
            setData(data)
            for (let label of data.labels) {
                for (let key in label) {
                    if (key === 'name' && label[key] in WorkStatus) {
                        setStatus(label[key])
                    }
                }
            }
            setLoading(false)
        })
        .catch(error => console.error(error))
}

// Asynchronously fetch the repositories for the given username, ref in file repoList.tsx
export const fetchRepos = async (username: string, setData: any, setLoading: any) => {
    setLoading(true)
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            setData(data)
            setLoading(false)
        })
        .catch(error => console.error(error))
}

// Function to fetch the repository issues from Github API, ref in file issueList.tsx
export const fetchRepoIssues = async (username: string, reponame: string, page: number, setData: any, setLoadMore: any, setLoading: any) => {
    setLoading(true)
    fetch(`https://api.github.com/repos/${username}/${reponame}/issues?per_page=${page}`)
        .then(response => response.json())
        .then(data => {
            // If number of issues received is less than the requested page, it means there are no more issues to be loaded
            if (data.length < page) {
                setLoadMore(false)
            }
            // Updating the repository issues state with the received data
            setData(data)
            setLoading(false)
            console.log(`Load page ${page / 10}`, data)
        })
        .catch(error => console.error(error))
}

// Function to update issue's state depend on reqBody, it could be update either state, label, title, or body, ref in file IssueDetailCard.tsx
export const updateIssue = async (username: string, reponame: string, issue: number, token: string, reqBody: object) => {
    fetch(`https://api.github.com/repos/${username}/${reponame}/issues/${issue}`, {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
        headers: {
            'Authorization': `bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));

    //@ts-ignore
    if (reqBody.state) {
        Router.push(`/${username}/${reponame}/issues`)
    } else {
        Router.reload()
    }
}

