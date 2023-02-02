import Button from '@/components/Button'

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

};

const IndexBody = () => {
    return (
        <section className='mt-16'>
            <h1 className='font-bold'>Welcome to <span className='dark:text-purple-600'>GitHub</span> issues checker</h1>
            <h3 className='my-3'>Login to use the service</h3>
            <p className='text-gray-700 mb-8'>
                Using GitHub API to allow users
                add, update, and search GitHub repository issues as a Task,
                and update the status of Task.
            </p>
            <Button className='ease-in duration-300 bg-purple-600 text-white px-6' onClick={handleClick}>Login</Button>
        </section>
    )
}
export default IndexBody