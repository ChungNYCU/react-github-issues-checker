import { Fragment, MouseEventHandler } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'

const classNames = (...classes: string[]) => { return classes.filter(Boolean).join(' ') }

type MoreOptionDropDownProps = {
    onDeleteButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const MoreOptionDropDown = (props: MoreOptionDropDownProps) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border dark:border-gray-700 px-4 py-2 ease-in duration-300 bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500">
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-300 text-gray-900' : 'bg-gray-100 text-gray-900',
                                        'flex flex-row justify-start items-center px-4 py-2 text-sm ease-in duration-300'
                                    )}
                                >
                                    <PencilSquareIcon className="h-4 w-4 mr-2" aria-hidden="true" />Edit
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={props.onDeleteButtonClick} className={classNames(active ? 'bg-gray-300 text-red-500' : 'bg-gray-100 text-red-500',
                                    'flex flex-row justify-start items-center w-full px-4 py-2 text-left text-sm ease-in duration-300')}>
                                    <TrashIcon className="h-4 w-4 mr-2" aria-hidden="true" />Delete
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default MoreOptionDropDown