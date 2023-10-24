'use client';

import React, {Fragment, useEffect, useState} from "react";
import {Tab} from "@headlessui/react";
import {Category, useAllCategories} from "@/app/hooks/categories";
import SkillList, {ColleagueSkillItem, SkillItem} from "@/app/SkillList";
import {useFetchAllSkills, useFetchColleagueSkills, useFilteredSkills} from "@/app/hooks/skills";

const Skills = (props: any) => {
    const categories: Category[] = useAllCategories();
    const allSkills = useFetchAllSkills();
    const fetchedColleagueSkills: ColleagueSkillItem[] | null = useFetchColleagueSkills(props?.colleagueId);
    const [allColleagueSkillItems, setAllColleagueSkillItems] = useState<ColleagueSkillItem[] | null>([]);
    // const filteredColleagueSkills = useFilteredSkills(allSkills, fetchedColleagueSkills);


    const [techniqueColleagueSkillItems, setTechniqueColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [toolColleagueSkillItems, setToolColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [platformColleagueSkillItems, setPlatformColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [languageColleagueSkillItems, setLanguageColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);
    const [otherColleagueSkillItems, setOtherColleagueSkillItems] = useState<ColleagueSkillItem[]>([]);

    const [allSkillItems, setAllSkillItems] = useState<SkillItem[]>([]);
    const [filteredSkills, setFilteredSkills] = useState(allSkills);


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
        // check conditions to ensure that allSkills and userSkills are not empty    
        if (allSkills.length > 0) {

            // creates array of skill ids for specific colleagues
            const userSkillIds = allColleagueSkillItems.map((skill) => skill.skill_id);

            // filters all skills to ensure that only skills that are not already selected by a colleague are displayed
            const filtered = allSkills.filter((skill) => !userSkillIds.includes(skill.id));

            setFilteredSkills(filtered);

            console.log(filtered, userSkillIds)
        }
    }, [props?.colleagueId, fetchedColleagueSkills, allSkills]);


    const updateCsiItems = (updatedColleagueSkillItemFromCategoryTab: ColleagueSkillItem, originalCategoryId: number|undefined) => {
        if (!updatedColleagueSkillItemFromCategoryTab || !allColleagueSkillItems?.length) {
            return;
        }
        const foundIndexOfUpdatedItem = allColleagueSkillItems?.findIndex((csi) => (csi.id === updatedColleagueSkillItemFromCategoryTab.id));
        const colleagueSkillsCopy = [...allColleagueSkillItems];

        if (updatedColleagueSkillItemFromCategoryTab.category_id) {
            switch (updatedColleagueSkillItemFromCategoryTab.category_id) {
                case 1:
                    const techniqueColleagueSkillItemsCopy = [...techniqueColleagueSkillItems];
                    updateTabbedItems(updatedColleagueSkillItemFromCategoryTab, techniqueColleagueSkillItemsCopy, originalCategoryId);
                    return;
                case 2:
                    const toolColleagueSkillItemsCopy = [...toolColleagueSkillItems];
                    updateTabbedItems(updatedColleagueSkillItemFromCategoryTab, toolColleagueSkillItemsCopy, originalCategoryId);
                    return;
                case 3:
                    const platformColleagueSkillItemsCopy = [...toolColleagueSkillItems];
                    updateTabbedItems(updatedColleagueSkillItemFromCategoryTab, platformColleagueSkillItemsCopy, originalCategoryId);
                    return;
                case 4:
                    const languageColleagueSkillItemsCopy = [...languageColleagueSkillItems];
                    updateTabbedItems(updatedColleagueSkillItemFromCategoryTab, languageColleagueSkillItemsCopy, originalCategoryId);
                    return;
                case 9:
                    const otherColleagueSkillItemsCopy = [...otherColleagueSkillItems];
                    updateTabbedItems(updatedColleagueSkillItemFromCategoryTab, otherColleagueSkillItemsCopy, originalCategoryId);
                    return;
                default:
                    return;
            }
        }

        // updating existing csi
        if (foundIndexOfUpdatedItem > -1) {
            colleagueSkillsCopy[foundIndexOfUpdatedItem] = updatedColleagueSkillItemFromCategoryTab;
        } else {
            colleagueSkillsCopy.push(updatedColleagueSkillItemFromCategoryTab);
        }
        setAllColleagueSkillItems(colleagueSkillsCopy);
    };

    const updateTabbedItems = (updatedColleagueSkillItem: ColleagueSkillItem, categoryListItemsForUpdatedCategoryValue: ColleagueSkillItem[], originalCategoryId: number|undefined) => {
        // only ability or interest was updated
        if (updatedColleagueSkillItem?.category_id &&
            (updatedColleagueSkillItem?.category_id === originalCategoryId)
        ) {
            return updateAbilityInterestValues(updatedColleagueSkillItem, categoryListItemsForUpdatedCategoryValue, updatedColleagueSkillItem.category_id)
        } // category (and potentially ability and interest) was changed
        else if (
            originalCategoryId &&
            updatedColleagueSkillItem?.category_id &&
            (updatedColleagueSkillItem?.category_id !== originalCategoryId)
        ) {
            return updateCategoryAbilityInterestOnColleagueSkillItem(originalCategoryId, updatedColleagueSkillItem);
        }

        return categoryListItemsForUpdatedCategoryValue;
    };

    const updateAbilityInterestValues = (updatedCsItemFromCategoryTab: ColleagueSkillItem, categoryListItemsForUpdatedCategoryValue: ColleagueSkillItem[], categoryId: number) => {
        const updatedItemIndex = categoryListItemsForUpdatedCategoryValue.findIndex(item => (item.id === updatedCsItemFromCategoryTab.id));
        if (updatedItemIndex < 0) {
            return categoryListItemsForUpdatedCategoryValue;
        }

        categoryListItemsForUpdatedCategoryValue[updatedItemIndex] = {
            ...categoryListItemsForUpdatedCategoryValue[updatedItemIndex],
            ability: updatedCsItemFromCategoryTab.ability,
            interest: updatedCsItemFromCategoryTab.interest
        }
        updateTabState(categoryId, categoryListItemsForUpdatedCategoryValue);
        return categoryListItemsForUpdatedCategoryValue;
    };

    const updateCategoryAbilityInterestOnColleagueSkillItem = (previousCategoryId: number, updatedColleagueSkillItem: ColleagueSkillItem)  => {
        if (!previousCategoryId || !updatedColleagueSkillItem?.category_id) {
            return [];
        }

        const updatedColleagueSkillItemId = updatedColleagueSkillItem.id;
        const colleagueSkillItemsPreviousCategory = getCategorizedColleagueSkillItemsByCategoryId(previousCategoryId);

        // remove item from previous category array
        const updatedColleagueSkillItemsPreviousCategory = colleagueSkillItemsPreviousCategory?.filter(csItem => csItem.id !== updatedColleagueSkillItemId);
        updateTabState(previousCategoryId, updatedColleagueSkillItemsPreviousCategory);

        // add to new one, with updated values for category, ability, interest
        const categoryIdUpdated: number = updatedColleagueSkillItem.category_id as number;
        const colleagueSkillItemsNewCategory = getCategorizedColleagueSkillItemsByCategoryId(categoryIdUpdated);
        const indexOfItemToBeUpdated = colleagueSkillItemsNewCategory.findIndex(csItem => csItem.id === updatedColleagueSkillItem.id);

        if (indexOfItemToBeUpdated < 0) {
            colleagueSkillItemsNewCategory.push(updatedColleagueSkillItem);
        } else {
            colleagueSkillItemsNewCategory[indexOfItemToBeUpdated] = {
                ...updatedColleagueSkillItem
            }
        }

        updateTabState(categoryIdUpdated, colleagueSkillItemsNewCategory);
    };

    const getCategorizedColleagueSkillItemsByCategoryId = (categoryId: number) => {
        switch (categoryId) {
            case 1:
                return [...techniqueColleagueSkillItems];
            case 2:
                return [...toolColleagueSkillItems];
            case 3:
                return [...toolColleagueSkillItems];
            case 4:
                return [...languageColleagueSkillItems];
            case 9:
                return [...otherColleagueSkillItems];
            default:
                return [];
        }
    };

    const updateTabState = (categoryId: number, updatedCategoryTabItems: ColleagueSkillItem[])  => {
        switch (categoryId) {
            case 1:
                setTechniqueColleagueSkillItems(updatedCategoryTabItems);
                return;
            case 2:
                setToolColleagueSkillItems(updatedCategoryTabItems);
                return;
            case 3:
                setPlatformColleagueSkillItems(updatedCategoryTabItems);
                return;
            case 4:
                setLanguageColleagueSkillItems(updatedCategoryTabItems);
                return;
            case 9:
                setOtherColleagueSkillItems(updatedCategoryTabItems);
                return;
            default:
                return;
        }
    };

    const deleteCsiItem = (itemToBeDeletedId: number) => {
        if (!itemToBeDeletedId || !allColleagueSkillItems?.length) {
            return;
        }
        const itemToBeDeleted = allColleagueSkillItems.find((allCsItem) => (allCsItem.id === itemToBeDeletedId));
        const updatedColleagueSkills = allColleagueSkillItems?.filter((csi) => (csi.id !== itemToBeDeletedId));
        setAllColleagueSkillItems(updatedColleagueSkills);

        if (!itemToBeDeleted || !itemToBeDeleted?.category_id) {
            return;
        }
        const categorizedCsItems = getCategorizedColleagueSkillItemsByCategoryId(itemToBeDeleted?.category_id);
        const updatedCategorizedColleagueSkills = categorizedCsItems?.filter((categorizedCsItem) => (categorizedCsItem.id !== itemToBeDeletedId));
        updateTabState(itemToBeDeleted?.category_id, updatedCategorizedColleagueSkills);
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
                                    selected ? 'flex-1 p-1 w-40 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
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
                                            selected ? 'flex-1 p-1 w-40 text-white' : 'flex-1 p-1 w-40 bg-white text-black'
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
                            allSkills={filteredSkills}
                            colleagueId={props.colleagueId}
                            colleagueSkills={allColleagueSkillItems}
                            categories={categories}
                            showCategoryColumn={true}
                            categoryId={undefined}
                            updateTabbedData={updateCsiItems}
                            deleteCsiFromTabs={deleteCsiItem}
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
                            updateTabbedData={updateCsiItems}
                            deleteCsiFromTabs={deleteCsiItem}
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
                            updateTabbedData={updateCsiItems}
                            deleteCsiFromTabs={deleteCsiItem}
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
                            updateTabbedData={updateCsiItems}
                            deleteCsiFromTabs={deleteCsiItem}
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
                            updateTabbedData={updateCsiItems}
                            deleteCsiFromTabs={deleteCsiItem}
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
                            updateTabbedData={updateCsiItems}
                            deleteCsiFromTabs={deleteCsiItem}
                            addNewSkillToAllSkillsArray={addSkillToArray}
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default Skills;