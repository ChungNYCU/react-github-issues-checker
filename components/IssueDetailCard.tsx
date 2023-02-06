import Button from './Button';

type IssueDetailCardProps = {
    state: string;
    title: string;
    body: string;
    className: string;
}

const IssueDetailCard = (props: IssueDetailCardProps) => {
    return (
        <div className='m-2 bg-gray-200  dark:bg-gray-700 border dark:border-gray-700 rounded-lg'>
            <div className='m-10 flex items-center justify-between'>
                <Button className='ease-in duration-300 bg-gray-300 text-black hover:bg-gray-500 hover:text-white px-6' onClick={() => { }}>{props.state}</Button>
                <Button className='ease-in duration-300 bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500' onClick={() => { }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                </Button>
            </div>
            <div className='m-10'>
                <h4 className='mt-10 font-bold'>{props.title}</h4>
                <p className='mt-5'>{props.body}</p>
            </div>
            <div></div>
        </div>
    )
}

export default IssueDetailCard