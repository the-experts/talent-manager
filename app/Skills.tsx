'use client';

import React, {Fragment, useState} from "react";
import { Tab } from "@headlessui/react";
import {Category, useAllCategories} from "@/app/hooks/categories";
import SkillList from "@/app/SkillList";
import {Skill, useFetchAllSkills, useFetchUserSkills} from "@/app/hooks/skills";

const Skills = (props: any) => {
    const categories: Category[] = useAllCategories();
    const allSkills = useFetchAllSkills();
    const colleagueSkills = useFetchUserSkills(props?.colleagueId);
    console.log('allSkills: ', allSkills)
    console.log('colleagueSkills: ', colleagueSkills)

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
                    {
                        categories?.map((category: Category) => (
                            <Tab key={category.id} as={Fragment}>
                                {({selected}) => (
                                    <button
                                        className={
                                            selected ? 'flex-1 p-1 w-40 bg-blue-500 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
                                        }
                                    >{category.name}
                                    </button>
                                )}
                            </Tab>
                        ))
                    }
                </Tab.List>
                <Tab.Panels className={'text-black'}>
                    <Tab.Panel>
                         <SkillList
                            allSkills={allSkills}
                            colleagueId={props.colleagueId}
                            colleagueSkills={colleagueSkills}
                         />
                    </Tab.Panel>
                    {
                        categories?.map((category: Category) => (
                            <Tab.Panel key={category.id}>Content {category.name}</Tab.Panel>
                        ))
                    }
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default Skills;