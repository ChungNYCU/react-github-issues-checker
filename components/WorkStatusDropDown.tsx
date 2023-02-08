import { Fragment, MouseEventHandler } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon, DocumentIcon, DocumentTextIcon, DocumentCheckIcon } from '@heroicons/react/20/solid'
import { WorkStatus } from '@/modules/WorkStatus'

type WorkStatusDropDownProps = {
    workStatus: string;
    onOpenStatusButtonClick: MouseEventHandler<HTMLButtonElement>;
    onInProgressStatusButtonClick: MouseEventHandler<HTMLButtonElement>;
    onDoneStatusButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}

const WorkStatusDropDown = (props: WorkStatusDropDownProps) => {
    let menuButtonClass = ''

    switch (props.workStatus) {
        case WorkStatus.Open: {
            menuButtonClass = 'inline-flex w-full justify-center rounded-md hover:ring-2 hover:ring-gray-300  bg-blue-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 ease-in duration-300'
            break;
        }
        case WorkStatus.InProgress: {
            menuButtonClass = 'inline-flex w-full justify-center rounded-md hover:ring-2 hover:ring-gray-300  bg-red-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 ease-in duration-300'
            break;
        }
        case WorkStatus.Done: {
            menuButtonClass = 'inline-flex w-full justify-center rounded-md hover:ring-2 hover:ring-gray-300  bg-green-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 ease-in duration-300'
            break;
        }
        default: {
            menuButtonClass = 'inline-flex w-full justify-center rounded-md hover:ring-2 hover:ring-gray-300  bg-gray-300 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 ease-in duration-300'
            break;
        }
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className={menuButtonClass}>
                    {props.workStatus}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={props.onOpenStatusButtonClick} className={classNames(active ? 'bg-gray-300 text-blue-500' : 'bg-gray-100 text-blue-500',
                                    'flex flex-row justify-start items-center w-full px-4 py-2 text-left text-sm ease-in duration-300')}>
                                    <DocumentIcon className="h-4 w-4 mr-2" aria-hidden="true" /> {WorkStatus.Open}
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={props.onInProgressStatusButtonClick} className={classNames(active ? 'bg-gray-300 text-red-500' : 'bg-gray-100 text-red-500',
                                    'flex flex-row justify-start items-center w-full px-4 py-2 text-left text-sm ease-in duration-300')}>
                                    <DocumentTextIcon className="h-4 w-4 mr-2" aria-hidden="true" /> {WorkStatus.InProgress}
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={props.onDoneStatusButtonClick} className={classNames(active ? 'bg-gray-300 text-green-500' : 'bg-gray-100 text-green-500',
                                    'flex flex-row justify-start items-center w-full px-4 py-2 text-left text-sm ease-in duration-300')}>
                                    <DocumentCheckIcon className="h-4 w-4 mr-2" aria-hidden="true" /> {WorkStatus.Done}
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default WorkStatusDropDown