import React, {Fragment} from "react";
import { Tab } from "@headlessui/react";

export default function Skills(props: any) {
    return (
        <div className={props.className}>
            <Tab.Group>
                <Tab.List className={'flex'}>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                        <button
                            className={
                                selected ? 'flex-1 p-1 w-40 bg-blue-500 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
                            }
                        >Alles
                        </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    selected ? 'flex-1 p-1 w-40 bg-blue-500 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
                                }
                            >Technieken
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    selected ? 'flex-1 p-1 w-40 bg-blue-500 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
                                }
                            >Tools
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    selected ? 'flex-1 p-1 w-40 bg-blue-500 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
                                }
                            >Platformen
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    selected ? 'flex-1 p-1 w-40 bg-blue-500 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
                                }
                            >Programmeertalen
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={
                                    selected ? 'flex-1 p-1 w-40 bg-blue-500 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
                                }
                            >Anders
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels className={'text-black'}>
                    <Tab.Panel>Content Alles</Tab.Panel>
                    <Tab.Panel>Content Techniques</Tab.Panel>
                    <Tab.Panel>Content Tools</Tab.Panel>
                    <Tab.Panel>Content Platforms</Tab.Panel>
                    <Tab.Panel>Content Languages</Tab.Panel>
                    <Tab.Panel>Content Anders</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
