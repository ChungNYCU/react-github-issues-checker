[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ChungNYCU/react-github-issues-checker/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]() [![](https://img.shields.io/github/last-commit/ChungNYCU/react-github-issues-checker)](https://github.com/ChungNYCU/react-github-issues-checker/commits/master)

# react-github-issues-checker

This repository is a homework for apply Dcard front-end internship.


#### Contents

- [Overview](#1-overview)
- [Problem](#2-problem)
- [Solution](#3-solution)
- [Documentation](#4-documentation)
  - [Getting start](#41-getting-start)

## Overview

Welcome to the Github Issues checker, a website that simplifies the process of organizing and managing Github issues. With a user-friendly interface, this project provides a range of tools to help you effectively create, edit, delete, sort, filter, and search issues. 

Whether you are working on a personal project or collaborating with a team, this project streamlines the process of managing Github issues, saving you time and increasing your productivity. 

With the ability to create and edit issues, organize them using labels, and quickly search and filter through your issues, the project provides a comprehensive solution for managing Github issues. Try it out today and experience the benefits of a more organized and efficient Github workflow.

Live demo website: https://react-github-issues-checker.vercel.app/


## Problem

### User story
強尼是一名工程師,他想要幫助開發團隊更有效地管理專案。團隊已⻑期使用 GitHub,但他們在使用 Issue 來追蹤進度上遇到困難。因此他決定串接 GitHub API 並使用 React.js 開發一個網頁來提供更有效的專案管理工具,希望熟悉前端的你能幫助他完成這個專案。

Johnny is an engineer who wants to help the development team manage projects more effectively. The team has been using GitHub for a long time, but they have encountered difficulties in tracking progress using Issues. So, he decided to connect the GitHub API and use React.js to develop a web page to provide more efficient project management tools. He hopes that you, who are familiar with front-end development, can help him complete this project.

### Complex labels
GitHub offers numerous labels and allows users to create custom labels. However, the team uses the labels "Open," "InProgress," and "Done" to manage their projects. In this scenario, the feature provided by our project can enhance the user experience.

Example:
![](https://i.imgur.com/EDh3v00.png)



## Solution

We have chosen to build a website using Next.js and TypeScript. With the help of GitHub Restful APIs, we can fulfill the user requirements. Additionally, we prioritize both functional and non-functional requirements, such as performance, bug-free, readability, consistency, and reusability.

### Features

#### GitHub Login: scope:`repo`
![](https://i.imgur.com/YBkEx0G.png)


#### Task Management: change label, edit, and delete task
![](https://i.imgur.com/MO2ltK3.png)


#### Task Search: In specific repository
![](https://i.imgur.com/o9uLpSF.png)

#### User Interface: Create task page with input validation
![](https://i.imgur.com/7HxJHkp.png)



## Documentation

### Getting start

#### 1. Clone this repository and create `.env.local` file in the directory like example below.
```
GITHUB_CLIENT_ID = 'Your GitHub OAuth Apps Client Id'
GITHUB_CLIENT_SECRET = 'Your GitHub OAuth Apps Client Secret'
NEXTAUTH_SECRET = 'Your Next Auth Secret'
NEXTAUTH_URL= 'Your Homepage URL'
```
 You can generate `NEXTAUTH_SECRET` using this command line openssl rand -base64 32 in command prompt
 
#### 2. Install Next.js
 
`npm install next`
 
#### 3. Run the project on local environment
`npm run dev`

#### 4. Check your localhost:3000
![](https://i.imgur.com/gtFwPxo.png)

#### Getting start demo

Console playback of Local Development installation.
[![Console playback](https://i.imgur.com/YRHHl9z.png)](https://youtu.be/QfTOnhn4oCo)
