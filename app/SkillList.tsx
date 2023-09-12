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
    form: FormInstance
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
           ...restProps
       }) => {
    const [displayCategory, setDisplayCategory] = useState<number>(0);
    const [displaySkill, setDisplaySkill] = useState<string>('');

    // @ts-ignore
    const node = children[1];
    let itemToShow = node;
    console.log('record', record);
    console.log('displayCategory', displayCategory);

    if (displayCategory === 0 && record?.category_id) {
        const foundCategory = categories?.find(category => category.id === record.category_id);
        itemToShow = foundCategory?.name;
    }

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

    const handleSelectChange = (event: any) => {
        const foundDisplayCategory = categories.find(category => category.name === event.label);

        if (foundDisplayCategory) {
            itemToShow = foundDisplayCategory.name;
        }
    }

    const handleAutoCompleteSelect = (event: any) => {
        if (typeof event === 'string') {
            const findExistingSkill = allSkills.find((skill) => skill?.name === event);

            if (findExistingSkill) {
                setDisplaySkill(findExistingSkill?.name ?? '');
            }
        }
    }

    let inputNode;

    if (inputType === 'number') {
        inputNode = <InputNumber min={1} max={5} />
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
            placeholder="Type to search for a skill"
            filterOption={(inputValue, option) =>
                option?.label?.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        /> : record.name
    }

    if (node === '') {
        itemToShow = displaySkill;
    }

    return (node !== undefined && node !== '') ? (
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

const SkillList = (props: any) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string|number>('');

    const isEditing = (record: ColleagueSkillItem) => record.key === editingKey;
    const colleagueId = props.colleagueId;
    const colleagueSkills = props.colleagueSkills;

    const dbSkills: ColleagueSkillItem[] = [];
    const [currentColleagueSkills, setCurrentColleagueSkills] = useState<ColleagueSkillItem[]>([]);

    props?.colleagueSkills?.forEach((existingColleagueSkill: ColleagueSkillItem) => {
        const newData: ColleagueSkillItem = {
            id: existingColleagueSkill.id,
            key: dbSkills?.length +1,
            colleague_id: existingColleagueSkill.colleague_id,
            category_id: existingColleagueSkill?.category_id,
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

    const saveColleagueSkill = async (skillId: number, editedItem: EditedItem, isEditing = false): Promise<any> => {
        const url = isEditing ? '/api/edit-colleague-skill' : '/api/add-skill-to-colleague';
        const body = isEditing ? {
            id: editedItem?.id,
            skill_id: skillId,
            category_id: editedItem?.category?.value ?? editedItem?.categories_id,
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

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as ColleagueSkillItem;
            const updatedCurrentColleagueSkills = [...currentColleagueSkills];
            const index = updatedCurrentColleagueSkills.findIndex(item => key === item.key);

            if (index > -1) {
                // editing existing item by replacing the old data with the new
                const item = updatedCurrentColleagueSkills[index];

                let skill_id;

                if (row?.name) {
                    const matchingSkill = props.allSkills.find((allSkillItem: SkillItem) => allSkillItem.name === row.name);
                    skill_id = matchingSkill.id;
                } else if (item.skill_id) {
                    skill_id = item.skill_id;
                }

                const editedItem: EditedItem = {
                    ...item,
                    ...row,
                    category: {
                        ...row.category,
                        title: row?.category?.label
                    },
                    skill_id
                };

                console.log('editedItem', editedItem)

                // create new skill, then new colleague-skill entry
                if (editedItem.skill_id === undefined && editedItem.id === undefined) {
                    const category = editedItem.category.value || editedItem.categories_id;
                    if (!(category && editedItem.name)) {
                        return;
                    }

                    // save skill and return skill_id
                    await axios.post('/api/create-skill', {
                        newSkill: {
                            categories_id: editedItem.category.value,
                            name: editedItem.name
                        } ?? null
                    }).then(async (response) => {
                        const newSkill = response?.data?.createSkillQuery?.rows[0];
                        updatedCurrentColleagueSkills.splice(index, 1, {
                            ...editedItem,
                            skill_id: newSkill?.id
                        });

                        // new skill successfully created, adding new colleague-skill-item
                        if (newSkill?.id && editedItem?.colleague_id) {
                            const response = await saveColleagueSkill(newSkill?.skill_id, editedItem);
                            const newItem = response?.data?.addSkillToColleagueQuery?.rows ? response?.data?.addSkillToColleagueQuery?.rows[0] : undefined;
                            if (newItem) {
                                const updatedIndex = updatedCurrentColleagueSkills.findIndex((colleagueSkillItem: ColleagueSkillItem) => (colleagueSkillItem.id === newItem.id));
                                if (updatedIndex) {
                                    updatedCurrentColleagueSkills[updatedIndex] = {
                                        ...updatedCurrentColleagueSkills[updatedIndex],
                                        ability: newItem.ability,
                                        interest: newItem.interest,
                                        category_id: newItem.category_id,
                                        skill_id: newItem.skill_id
                                    }
                                }
                            }
                        }
                    }).catch((error) => {
                        console.error('saving new skill failed: ',error)
                        const modifiedSkillList = currentColleagueSkills.slice(0, -1);
                        setCurrentColleagueSkills(modifiedSkillList);
                    })
                }
                // skill already exists, colleagueSkillItem is being newly created
                else if (editedItem?.skill_id && editedItem?.id === undefined) {
                    await saveColleagueSkill(editedItem?.skill_id, editedItem).then((response) => {
                        const newItem = response?.data?.addSkillToColleagueQuery?.rows ? response?.data?.addSkillToColleagueQuery?.rows[0] : undefined;
                        console.log("response?.data", response?.data)
                        console.log('updatedCurrentColleagueSkills', updatedCurrentColleagueSkills);
                        console.log('newItem', newItem);
                        if (newItem) {
                            const updatedIndex = updatedCurrentColleagueSkills.findIndex((colleagueSkillItem: ColleagueSkillItem) => (colleagueSkillItem.id === newItem.id));
                            if (updatedIndex) {
                                updatedCurrentColleagueSkills[updatedIndex] = {
                                    ...updatedCurrentColleagueSkills[updatedIndex],
                                    ability: newItem.ability,
                                    interest: newItem.interest,
                                    category_id: newItem.category_id,
                                    skill_id: newItem.skill_id
                                }
                            }
                            setCurrentColleagueSkills(updatedCurrentColleagueSkills);
                        }
                    }).catch((error) => {
                        console.error('failed saving new colleague-skill-item with existing skill:', error)
                    });
                }
                // skill id already defined, edit existing entry
                else if (editedItem?.skill_id && editedItem?.id) {
                    await saveColleagueSkill(editedItem?.skill_id, editedItem, true)
                        .then((response) => {
                            const updatedItem = response?.data?.editColleagueSkillQuery?.rows ? response?.data?.editColleagueSkillQuery?.rows[0] : undefined;

                            if (updatedItem) {
                                const updatedIndex = updatedCurrentColleagueSkills.findIndex((colleagueSkillItem: ColleagueSkillItem) => (colleagueSkillItem.id === updatedItem.id));

                                if (updatedIndex > -1) {
                                    updatedCurrentColleagueSkills[updatedIndex] = {
                                        ...updatedCurrentColleagueSkills[updatedIndex],
                                        ability: updatedItem.ability,
                                        interest: updatedItem.interest,
                                        category_id: updatedItem.category_id,
                                        skill_id: updatedItem.skill_id
                                    }

                                    setCurrentColleagueSkills(updatedCurrentColleagueSkills);
                                }
                            }
                        }).catch((error) => {
                            console.error('failed editing existing colleague-skill-item:', error);
                        });
                }

                setEditingKey('');
            } else {
                // adding new row
                updatedCurrentColleagueSkills.push(row);
                setCurrentColleagueSkills(updatedCurrentColleagueSkills);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);
        }
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Skill',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            width: '20%',
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
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit({...record, key: recordKey})}>
                        Edit
                    </Typography.Link>
                ) : null
                );
            },
        },
    ];

    const handleDelete = (key: React.Key|undefined) => {
        if (key === undefined) {
            setCurrentColleagueSkills(currentColleagueSkills);
            return;
        }
        const newData = currentColleagueSkills.filter(item => item.key !== key);
        setCurrentColleagueSkills(newData);
    };

    const handleAdd = () => {
        const newData: Partial<ColleagueSkillItem> = {
            id: undefined,
            key: dbSkills.length +1,
            colleague_id: colleagueId,
            category: undefined,
            skill_id: undefined,
            ability: 0,
            interest: 0,
            name: ''
        };
        setCurrentColleagueSkills([...currentColleagueSkills, newData]);
        edit(newData as Partial<ColleagueSkillItem> & { key: React.Key });
    };

    const getInputType = (dataIndex: string) => {
        if (dataIndex === 'ability' || dataIndex === 'interest') {
            return 'number';
        } else if (dataIndex === 'category') {
            return 'select';
        } else {
            return 'autocomplete';
        }
    }

    const columns = defaultColumns.map(col => {
        if (!col.editable) {
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
                key: col.dataIndex,
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
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={currentColleagueSkills}
                columns={columns as ColumnTypes}
            />
        </Form>
    );
};

export default SkillList;