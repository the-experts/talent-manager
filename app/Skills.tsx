'use client';

import React, {Fragment, useEffect, useState} from "react";
import { Tab } from "@headlessui/react";
import {Category, useAllCategories} from "@/app/hooks/categories";
import SkillList, {ColleagueSkillItem, SkillItem} from "@/app/SkillList";
import {useFetchAllSkills, useFetchColleagueSkills} from "@/app/hooks/skills";

const Skills = (props: any) => {
    const categories: Category[] = useAllCategories();
    const allSkills = useFetchAllSkills();
    const fetchedColleagueSkills: ColleagueSkillItem[] | null = useFetchColleagueSkills(props?.colleagueId);
    const [allColleagueSkillItems, setAllColleagueSkillItems] = useState<ColleagueSkillItem[] | null>([]);

    const [techniqueColleagueSkillItems, setTechniqueColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [toolColleagueSkillItems, setToolColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [platformColleagueSkillItems, setPlatformColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [languageColleagueSkillItems, setLanguageColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [otherColleagueSkillItems, setOtherColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);

    const [allSkillItems, setAllSkillItems] = useState<SkillItem[]>([]);

    const techniqueSkillsArray: ColleagueSkillItem[] = [];
    const toolSkillsArray: ColleagueSkillItem[] = [];
    const platformSkillsArray: ColleagueSkillItem[] = [];
    const languageSkillsArray: ColleagueSkillItem[] = [];
    const otherSkillsArray: ColleagueSkillItem[] = [];
    const allColleagueSkillsArray: ColleagueSkillItem[] = [];

    useEffect(() => {
        setAllColleagueSkillItems(fetchedColleagueSkills);
        setAllSkillItems(allSkills);

        if (fetchedColleagueSkills && fetchedColleagueSkills?.length > 0) {
            sortSkillsByCategory(fetchedColleagueSkills);
        }
    }, [props?.colleagueId, fetchedColleagueSkills]);

    // @todo: update data in tabs when change is made in 'all'
    const updateCsiItems = (updatedColleagueSkillItemFromCategoryTab: ColleagueSkillItem) => {
        if (!updatedColleagueSkillItemFromCategoryTab || !allColleagueSkillItems?.length) {
            return;
        }
        const foundIndexOfUpdatedItem = allColleagueSkillItems?.findIndex((csi) => (csi.id === updatedColleagueSkillItemFromCategoryTab.id));
        const colleagueSkillsCopy = [...allColleagueSkillItems];

        // updating existing csi
        if (foundIndexOfUpdatedItem > -1) {
            colleagueSkillsCopy[foundIndexOfUpdatedItem] = updatedColleagueSkillItemFromCategoryTab;
        } else {
            colleagueSkillsCopy.push(updatedColleagueSkillItemFromCategoryTab);
        }
        setAllColleagueSkillItems(colleagueSkillsCopy);
    };

    const deleteCsiItem = (itemToBeDeletedId: number) => {
        if (!itemToBeDeletedId || !allColleagueSkillItems?.length) {
            return;
        }
        const updatedColleagueSkills = allColleagueSkillItems?.filter((csi) => (csi.id !== itemToBeDeletedId));
        setAllColleagueSkillItems(updatedColleagueSkills);
    };

    const addSkillToArray = (itemToBeAdded: SkillItem) => {
        if (!itemToBeAdded || !allSkills?.length) {
            return;
        }
        const allSkillsCopy = [...allSkillItems];
        allSkillsCopy.push(itemToBeAdded);
        setAllSkillItems(allSkillsCopy);
    };

    const sortSkillsByCategory = (colleagueSkillItems: ColleagueSkillItem[]) => {

        // merge with existing array
        const fetchedColleagueSkillsToBeUpdated = fetchedColleagueSkills ? [...fetchedColleagueSkills] : null;

        colleagueSkillItems.forEach((colleagueSkillItem: ColleagueSkillItem) => {
            const foundIndex = fetchedColleagueSkillsToBeUpdated?.findIndex((it: ColleagueSkillItem) => (it.id === colleagueSkillItem.id));

            if (foundIndex && fetchedColleagueSkillsToBeUpdated) {
                fetchedColleagueSkillsToBeUpdated[foundIndex] = colleagueSkillItem;
            }
        });

        fetchedColleagueSkillsToBeUpdated?.forEach((colleagueSkillItem) => {
            colleagueSkillItem.key = colleagueSkillItem?.key ?? colleagueSkillItems.length+1;

            switch (colleagueSkillItem?.category_id) {
                case 1:
                    allColleagueSkillsArray.push(colleagueSkillItem);
                    techniqueSkillsArray.push(colleagueSkillItem);
                    return;
                case 2:
                    allColleagueSkillsArray.push(colleagueSkillItem);
                    toolSkillsArray.push(colleagueSkillItem);
                    return;
                case 3:
                    allColleagueSkillsArray.push(colleagueSkillItem);
                    platformSkillsArray.push(colleagueSkillItem);
                    return;
                case 4:
                    allColleagueSkillsArray.push(colleagueSkillItem);
                    languageSkillsArray.push(colleagueSkillItem);
                    return;
                case 9:
                    allColleagueSkillsArray.push(colleagueSkillItem);
                    otherSkillsArray.push(colleagueSkillItem);
                    return;
                default:
                    return;
            }
        });

        setAllColleagueSkillItems(allColleagueSkillsArray);
        setTechniqueColleagueSkillItems(techniqueSkillsArray);
        setToolColleagueSkillItems(toolSkillsArray);
        setPlatformColleagueSkillItems(platformSkillsArray);
        setLanguageColleagueSkillItems(languageSkillsArray);
        setOtherColleagueSkillItems(otherSkillsArray);
    }

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
                            >All
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
                            allSkills={allSkillItems}
                            colleagueId={props.colleagueId}
                            colleagueSkills={allColleagueSkillItems}
                            categories={categories}
                            showCategoryColumn={true}
                            addDataToFirstTab={updateCsiItems}
                            updateDataInFirstTab={updateCsiItems}
                            deleteCsiFromFirstTab={deleteCsiItem}
                            addNewSkillToAllSkillsArray={addSkillToArray}
                         />
                    </Tab.Panel>
                    <Tab.Panel key={1}>
                        <SkillList
                            allSkills={allSkillItems}
                            colleagueId={props.colleagueId}
                            colleagueSkills={techniqueColleagueSkillItems}
                            categories={categories}
                            categoryId={1}
                            addDataToFirstTab={updateCsiItems}
                            updateDataInFirstTab={updateCsiItems}
                            deleteCsiFromFirstTab={deleteCsiItem}
                            addNewSkillToAllSkillsArray={addSkillToArray}
                        />
                    </Tab.Panel>
                    <Tab.Panel key={2}>
                        <SkillList
                            allSkills={allSkillItems}
                            colleagueId={props.colleagueId}
                            colleagueSkills={toolColleagueSkillItems}
                            categories={categories}
                            categoryId={2}
                            addDataToFirstTab={updateCsiItems}
                            updateDataInFirstTab={updateCsiItems}
                            deleteCsiFromFirstTab={deleteCsiItem}
                            addNewSkillToAllSkillsArray={addSkillToArray}
                        />
                    </Tab.Panel>
                    <Tab.Panel key={3}>
                        <SkillList
                            allSkills={allSkillItems}
                            colleagueId={props.colleagueId}
                            colleagueSkills={platformColleagueSkillItems}
                            categories={categories}
                            categoryId={3}
                            addDataToFirstTab={updateCsiItems}
                            updateDataInFirstTab={updateCsiItems}
                            deleteCsiFromFirstTab={deleteCsiItem}
                            addNewSkillToAllSkillsArray={addSkillToArray}
                        />
                    </Tab.Panel>
                    <Tab.Panel key={4}>
                        <SkillList
                            allSkills={allSkillItems}
                            colleagueId={props.colleagueId}
                            colleagueSkills={languageColleagueSkillItems}
                            categories={categories}
                            categoryId={4}
                            addDataToFirstTab={updateCsiItems}
                            updateDataInFirstTab={updateCsiItems}
                            deleteCsiFromFirstTab={deleteCsiItem}
                            addNewSkillToAllSkillsArray={addSkillToArray}
                        />
                    </Tab.Panel>
                    <Tab.Panel key={9}>
                        <SkillList
                            allSkills={allSkillItems}
                            colleagueId={props.colleagueId}
                            colleagueSkills={otherColleagueSkillItems}
                            categories={categories}
                            categoryId={9}
                            addDataToFirstTab={updateCsiItems}
                            updateDataInFirstTab={updateCsiItems}
                            deleteCsiFromFirstTab={deleteCsiItem}
                            addNewSkillToAllSkillsArray={addSkillToArray}
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default Skills;