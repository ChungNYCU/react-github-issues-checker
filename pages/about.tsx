const About = () => {
    return (
        <section>
            <h3 className="text-center font-semibold mt-20 dark:text-blue-500">About</h3>

            <h4 className="text-center font-semibold mt-20 dark:text-blue-500">GitHub Issues Checker</h4>
            <h5 className="font-semibold mt-20 dark:text-blue-500">User Story</h5>
            <p className="mt-10">Johnny is an engineer who wants to help the development team manage their projects more effectively.
                The team has been using GitHub for a long time, but they have had difficulties using Issues to track progress.
                Therefore, Johnny has decided to integrate the GitHub API and use React.js to develop a web page that provides more efficient project management tools.
                He hopes that you, who are familiar with front-end development, can help him complete this project.</p>

            <h5 className="font-semibold mt-20 dark:text-blue-500">Description</h5>
            <p className="mt-5">By integrating the GitHub API, users are able to create, update, and search tasks, as well as update the status of tasks. </p>

            <h5 className="font-semibold mt-20 dark:text-blue-500">Features</h5>

            <h6 className="mt-5 font-semibold">GitHub Login </h6>
            <ul className="mt-1 list-disc">
                <li>GitHub OAuth login</li>
            </ul>

            <h6 className="mt-5 font-semibold">Task Management </h6>
            <ul className="mt-1 list-disc">
                <li>Create task</li>
                <li>Read task</li>
                <li>Update task</li>
                <li>Delete task</li>
                <li>Search task</li>
            </ul>

            <h5 className="font-semibold mt-20 dark:text-blue-500">Technologies</h5>
            <ul className="mt-1 list-disc">
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>GitHub APIs</li>
                <li>TypeScript</li>
            </ul>

        </section>
    )
}

export default About