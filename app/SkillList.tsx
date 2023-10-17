import {AutoComplete, Button, Form, FormInstance, InputNumber, Popconfirm, Select, Table, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {DefaultOptionType} from "rc-select/lib/Select";
import {Category, CategorySelectItem} from "@/app/hooks/categories";
import axios from 'axios';

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export interface ColleagueSkillItem {
    id?: number;
    key?: React.Key;
    colleague_id?: number;
    skill_id?: number;
    ability?: number;
    interest?: number;
    name?: string;
    category_id?: number;
    category?: CategorySelectItem;
    categoryName?: string;
}

export interface SkillItem {
    id?: number;
    name?: string;
    category_id?: number;
}

export type EditedItem = {
    interest?: number;
    colleague_id?: number;
    categories_id?: number;
    name?: string;
    skill_id?: number;
    id?: number;
    ability?: number;
    category: {
        title: string | undefined,
        disabled?: boolean,
        key?: React.Key,
        label?: string;
        value?: number;
    };
    key?: React.Key
}

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    editing: boolean;
    children: React.ReactNode;
    dataIndex: keyof ColleagueSkillItem;
    record: ColleagueSkillItem;
    allSkills: SkillItem[],
    colleagueSkills: ColleagueSkillItem[],
    categories: Category[],
    inputType: string,
    index: number,
    key: string,
    form: FormInstance,
    categoryName: string,
    newSkillName: string
}

const EditableCell: React.FC<EditableCellProps> = ({
           editing,
           dataIndex,
           title,
           inputType,
           record,
           index,
           categories,
           allSkills,
           colleagueSkills,
           children,
           form,
           categoryName,
           newSkillName,
           ...restProps
       }) => {
    let displayCategory;
    let displaySkill;
    let inputNode;

    // @ts-ignore
    const node = children[1];
    let itemToShow = node;

    const items = categories?.map((category) => {
        return {
            label: category?.name,
            value: category?.id
        }
    });
    const transformedSkills = allSkills?.map((skill: SkillItem) => (
        {
            key: skill.id,
            label: skill.name,
            value: skill.name,
            skillId: skill.id
        }
    )) as DefaultOptionType[];

    if (record?.category?.title) {
        displayCategory = record?.category?.title;
    } else if (record?.category_id) {
        const foundCategory = categories?.find(category => category.id === record.category_id);
        if (foundCategory) {
            displayCategory = foundCategory?.name;
        }
    }

    if (node === '' || node === undefined) {
        if (record?.skill_id && allSkills.length > -1) {
            const findExistingSkill = allSkills?.find((skill) => skill?.id === record?.skill_id);
            if (findExistingSkill) {
                itemToShow = findExistingSkill?.name;
            }
        } else {
            itemToShow = displaySkill;
        }
    }

    if (node === null) {
        itemToShow = displayCategory ?? record?.category?.title;
    }

    const handleSelectChange = (event: any) => {
        const foundDisplayCategory = categories.find(category => category.name === event.label);

        if (foundDisplayCategory) {
            displayCategory = foundDisplayCategory.name;
        }
    }

    const handleAutoCompleteSelect = (event: any) => {
        if (typeof event === 'string') {
            const findExistingSkill = allSkills.find((skill) => skill?.name === event);

            if (findExistingSkill) {
                form.setFieldValue('name',findExistingSkill.name ?? '');
                displaySkill = findExistingSkill.name;
            }
        }
    }

    const handleBlur = (event: any) => {
        displaySkill = event?.target?.value ?? undefined;
    }

    if (inputType === 'number') {
        inputNode = <InputNumber min={0} max={5} />
    } else if (inputType === 'select') {
        inputNode = <Select
            labelInValue
            options={items}
            placeholder='Select a category'
            onChange={handleSelectChange}
        />
    } else if (inputType === 'autocomplete') {
        inputNode = !record.skill_id ? <AutoComplete
            className='width-200'
            options={transformedSkills}
            onSelect={handleAutoCompleteSelect}
            onBlur={handleBlur}
            placeholder="Type to search for a skill"
            filterOption={(inputValue, option) =>
                option?.label?.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        /> : record.name
    }

    return (node !== undefined && node !== null && node !== '') ? (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    key={index}
                    name={dataIndex}
                    className='no-margin'
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : children}
        </td>
    ) : <td {...restProps}>
            {editing ? (
                <Form.Item
                    key={index}
                    name={dataIndex}
                    className='no-margin'
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : itemToShow}
        </td>
};

const SkillList = ({addDataToFirstTab, updateDataInFirstTab, deleteCsiFromFirstTab, addNewSkillToAllSkillsArray, ...props}: any) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string|number>('');
    const [newSkillName, setNewSkillName] = useState<string>();

    const isEditing = (record: ColleagueSkillItem) => record.key === editingKey;
    const colleagueId = props.colleagueId;
    const colleagueSkills = props.colleagueSkills;

    const dbSkills: ColleagueSkillItem[] = [];
    let [currentColleagueSkills, setCurrentColleagueSkills] = useState<ColleagueSkillItem[]>([]);
    let categoryName: string;
    let displaySkill: string;

    props?.colleagueSkills?.forEach((existingColleagueSkill: ColleagueSkillItem) => {
        if (props?.categories && existingColleagueSkill?.category_id) {
            const foundCategory = props.categories?.find((category: Category) => (category.id === existingColleagueSkill?.category_id));
            categoryName = foundCategory?.name ?? '';
        }

        const newData: ColleagueSkillItem = {
            id: existingColleagueSkill.id,
            key: dbSkills?.length +1,
            colleague_id: existingColleagueSkill.colleague_id,
            category_id: existingColleagueSkill?.category_id,
            category: {
                title: categoryName,
                label: categoryName,
                value: existingColleagueSkill.category_id
            },
            skill_id: existingColleagueSkill.skill_id,
            ability: existingColleagueSkill.ability,
            interest: existingColleagueSkill.interest,
            name: existingColleagueSkill.name
        };
        dbSkills.push(newData);
    });

    useEffect(() => {
        setCurrentColleagueSkills(dbSkills);
    }, [props.colleagueSkills]);

    const edit = (record: Partial<ColleagueSkillItem> & { key: React.Key }) => {
        form.setFieldsValue({ name: record.name, category: record.category_id, ability: record.ability, interest: record.interest, ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        const currentSkill = currentColleagueSkills.find(currentColleagueSkill => currentColleagueSkill.key === editingKey);
        if (currentSkill && currentSkill?.id === undefined) {
            const modifiedSkillList = currentColleagueSkills.slice(0, -1);
            setCurrentColleagueSkills(modifiedSkillList);
        }
        setEditingKey('');
    };

    const saveColleagueSkillItem = async (skillId: number, editedItem: EditedItem, isEditing = false): Promise<any> => {
        const url = isEditing ? '/api/edit-colleague-skill' : '/api/add-skill-to-colleague';
        const body = isEditing ? {
            id: editedItem?.id,
            skill_id: skillId,
            category_id: editedItem?.category?.value,
            ability: editedItem?.ability,
            interest: editedItem?.interest,
            colleague_id: editedItem?.colleague_id,
        } : {
            colleague_id: editedItem?.colleague_id,
            skill_id: skillId,
            category_id: editedItem?.category?.value,
            ability: editedItem?.ability,
            interest: editedItem?.interest
        }

        return await axios.post(url, {
            skillForColleague: {...body}
        }).then(response => {
            return response;
        }).catch(error => {
            console.error('saving skill for colleague failed: ', error);
        })
    }

    const saveNewColleagueSkillItem = async (newSkillResponseId: number, index: number, updatedCurrentColleagueSkills: ColleagueSkillItem[], editedItem: EditedItem) => {
        updatedCurrentColleagueSkills.splice(index, 1, {
            ...editedItem,
            skill_id: newSkillResponseId
        });

        const response = await saveColleagueSkillItem(newSkillResponseId, {
            ...editedItem,
            skill_id: newSkillResponseId
        }).catch((error) => {
            console.error('failed saving new colleague-skill-item with existing skill:', error)
        });

        const newCsiResponseItem = response?.data?.addSkillToColleagueQuery?.rows ? response?.data?.addSkillToColleagueQuery?.rows[0] : undefined;

        if (!newCsiResponseItem) {
            throw new Error('new colleague-skill-item could not be retrieved from server');
        }

        const updatedIndex = updatedCurrentColleagueSkills.findIndex((colleagueSkillItem: ColleagueSkillItem) => (colleagueSkillItem.id === newCsiResponseItem.id));
        if (updatedIndex) {
            let newCsi = {
                ...updatedCurrentColleagueSkills[updatedIndex],
                ability: newCsiResponseItem.ability,
                interest: newCsiResponseItem.interest,
                category: editedItem.category,
                category_id: editedItem?.category?.value,
                skill_id: newCsiResponseItem.skill_id
            }
            updatedCurrentColleagueSkills[updatedIndex] = newCsi;

            setCurrentColleagueSkills(updatedCurrentColleagueSkills);
            updateDataInFirstTab(newCsi);

            return updatedCurrentColleagueSkills;
        }
    };

    const editColleagueSkillItem = async (editedItem: EditedItem, updatedCurrentColleagueSkills: ColleagueSkillItem[]) => {
        if (!editedItem.skill_id) {
            return;
        }
        await saveColleagueSkillItem(editedItem.skill_id, editedItem, true)
            .then((response) => {
                const updatedItem = response?.data?.editColleagueSkillQuery?.rows ? response?.data?.editColleagueSkillQuery?.rows[0] : undefined;
                if (!updatedItem) {
                    return;
                }
                    const updatedIndex = updatedCurrentColleagueSkills.findIndex((colleagueSkillItem: ColleagueSkillItem) => (colleagueSkillItem.id === updatedItem.id));
                    const foundCategory = props.categories?.find((category: Category) => (category.id === editedItem?.category?.value));

                    if (updatedIndex > -1) {
                        let updatedCsi = {
                            ...updatedCurrentColleagueSkills[updatedIndex],
                            ability: updatedItem.ability,
                            interest: updatedItem.interest,
                            category_id: editedItem.category?.value,
                            category: {
                                label: foundCategory?.name,
                                title: foundCategory?.name,
                                value: editedItem.category.value
                            },
                            skill_id: updatedItem.skill_id
                        }

                        updatedCurrentColleagueSkills[updatedIndex] = updatedCsi;

                        setCurrentColleagueSkills(updatedCurrentColleagueSkills);
                        updateDataInFirstTab(updatedCsi);
                    }
            }).catch((error) => {
                console.error('failed editing existing colleague-skill-item:', error);
            });

        return updatedCurrentColleagueSkills;
    };

    const save = async (key: React.Key) => {
        try {
            const updatedCurrentColleagueSkills = [...currentColleagueSkills];
            const index = updatedCurrentColleagueSkills.findIndex(item => key === item.key);
            const row = (await form.validateFields()) as ColleagueSkillItem;
            const categoryId = row.category?.value ?? props?.categoryId;
            let categoryName = '';
            let skill_id;

            if (categoryId) {
                const foundCategory = props.categories?.find((category: Category) => (category.id === categoryId));
                categoryName = foundCategory?.name ?? '';
            }

            const item = {
                ...updatedCurrentColleagueSkills[index],
                ...row,
                category: row.category?.value ?? props?.categoryId
            };

            if (index > -1) {
                // editing existing item by replacing the old data with the new
                updatedCurrentColleagueSkills[index] = item;
            } else {
                // adding new row
                updatedCurrentColleagueSkills.push(item);
            }

            if (row?.name) {
                const matchingSkill = props.allSkills.find((allSkillItem: SkillItem) => allSkillItem.name === row.name);
                skill_id = matchingSkill?.id;
            } else if (item.skill_id) {
                skill_id = item.skill_id;
            }

            const editedItem: EditedItem = {
                ...item,
                ...row,
                category: {
                    value: categoryId,
                    title: categoryName
                },
                skill_id
            };

            // create new skill, then new colleague-skill entry
            if (editedItem.skill_id === undefined && editedItem.id === undefined) {
                if (!(editedItem?.category?.value && editedItem.name)) {
                    console.error('category or skill not set');
                    return;
                }

                const newSkill = {
                    categories_id: editedItem.category.value,
                    name: editedItem.name
                };

                 await axios.post('/api/create-skill', {newSkill})
                    .then(async (response) => {
                        const newSkillResponse = response?.data?.createSkillQuery?.rows[0];
                        displaySkill = newSkillResponse?.name;
                        setNewSkillName(displaySkill);
                        if (!newSkillResponse) {
                            throw new Error('new skill not saved')
                        }
                        const updatedColleagueSkillItems = await saveNewColleagueSkillItem(newSkillResponse.id, index, updatedCurrentColleagueSkills, editedItem)
                        updatedColleagueSkillItems ? (currentColleagueSkills = updatedColleagueSkillItems) : null;
                        const newSkill = {
                            id: newSkillResponse.id,
                            name: newSkillResponse.name,
                            categories_id: newSkillResponse.categories_id
                        };

                        addNewSkillToAllSkillsArray(newSkill);
                    })
                     .catch(({ error }) => {
                         console.error(error);
                     })
            }
            // skill already exists, colleagueSkillItem is being newly created
            else if (editedItem?.skill_id && editedItem?.id === undefined) {
                await saveNewColleagueSkillItem(editedItem.skill_id, index, updatedCurrentColleagueSkills, editedItem)
            }
            // skill id and item id already defined, edit existing entry
            else if (editedItem?.skill_id && editedItem?.id) {
                const updatedColleagueSkillItems = await editColleagueSkillItem(editedItem, updatedCurrentColleagueSkills);
                updatedColleagueSkillItems ? (currentColleagueSkills = updatedColleagueSkillItems) : null;
            }
            setEditingKey('');
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);
        }
    };

    const categoryColumn = {
        title: 'Category',
        dataIndex: 'category',
        width: '20%',
        editable: true,
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string }|null)[] = [
        {
            title: 'Skill',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Ability',
            dataIndex: 'ability',
            width: '20%',
            editable: true,
        },
        {
            title: 'Interest',
            dataIndex: 'interest',
            width: '20%',
            editable: true,
        },
        {
            title: 'Actions',
            width: '15%',
            dataIndex: 'actions',
            render: (_: any, record: ColleagueSkillItem) => {
                const editable = isEditing(record);
                const recordKey = record?.key;

                // @ts-ignore
                return editable && recordKey ? (
                    <span>
                        <Typography.Link onClick={() => save(recordKey)} className='margin-right'>
                          Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : ( !editable && recordKey ? (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit({...record, key: recordKey})}>
                            Edit
                        </Typography.Link>
                        {' '}
                        <Typography.Link disabled={editingKey !== ''} onClick={() => handleDelete(recordKey)}>
                            Delete
                        </Typography.Link>
                    </>
                ) : null
                );
            },
        },
    ];

    // show category column only at 'All' tab
    if (props?.showCategoryColumn === true) {
        defaultColumns.splice(1,0, categoryColumn);
    }

    const handleDelete = async (key: React.Key | undefined) => {
        if (key === undefined) {
            setCurrentColleagueSkills(currentColleagueSkills);
            return;
        }
        const itemToBeDeleted = currentColleagueSkills.find(item => (item.key === key));
        if (itemToBeDeleted?.id) {
            const colleagueSkillId = itemToBeDeleted?.id;
            return await axios.post('/api/delete-colleague-skill', {colleagueSkillId})
                .then(response => {
                    const newData = currentColleagueSkills.filter(item => item.key !== key);
                    setCurrentColleagueSkills(newData);
                    deleteCsiFromFirstTab(itemToBeDeleted?.id);
                    return response;
            }).catch(error => {
                console.error('deleting colleague-skill failed: ', error);
            })
        }
    };

    const handleAdd = () => {
        const newData: Partial<ColleagueSkillItem> = {
            id: undefined,
            key: currentColleagueSkills?.length +1,
            colleague_id: colleagueId,
            category: undefined,
            skill_id: undefined,
            ability: 0,
            interest: 0,
            name: ''
        };
        setCurrentColleagueSkills([...currentColleagueSkills, newData]);
        edit(newData as Partial<ColleagueSkillItem> & { key: React.Key });

        // wait for antd to finish rendering the newly added row, then scroll to the bottom
        setTimeout(() => {
            document.querySelector('tr[data-row-key]:last-of-type')?.scrollIntoView({behavior: "smooth", block: "end" })
        }, 10);
    };

    const getInputType = (dataIndex: string) => {
        if (dataIndex === 'ability' || dataIndex === 'interest') {
            return 'number';
        } else if (dataIndex === 'category') {
            return 'select';
        } else if (dataIndex !== null) {
            return 'autocomplete';
        }
    }

    const columns = defaultColumns.map(col => {
        if (!col?.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: ColleagueSkillItem) => ({
                editing: isEditing(record),
                dataIndex: col.dataIndex,
                title: col.title,
                inputType: getInputType(col.dataIndex),
                record,
                index: record.id,
                categories: props.categories,
                allSkills: props.allSkills,
                colleagueSkills,
                form,
                categoryName: record.categoryName,
                key: col.dataIndex,
                newSkillName
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Button onClick={handleAdd} type="primary" className='add-row-button'>
                Add a row
            </Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell
                    },
                }}
                pagination={false}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={currentColleagueSkills}
                columns={columns as ColumnTypes}
            />
        </Form>
    );
};

export default SkillList;