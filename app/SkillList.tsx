'use client';

import React, {useState} from "react";
import {Button, Form, Input, InputNumber, Popconfirm, Table, Typography} from "antd";
import {useAddSkillToColleague} from "@/app/hooks/skills";

export interface ColleagueSkillItem {
    id?: number;
    colleague_id: number;
    skill_id: number;
    ability: number;
    interest: number;
    name: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: ColleagueSkillItem;
    index: number;
    children: React.ReactNode;
}

const SkillList = (props: any) => {
    const dummyData: ColleagueSkillItem[] = [
        {
            id: 1,
            colleague_id: 13,
            skill_id: 1,
            ability: 2,
            interest: 5,
            name: 'NextJS'
        }
    ];

    const storedColleagueSkills: ColleagueSkillItem[] = [
        ...dummyData,
        // props.colleagueSkills
    ];

    const [form] = Form.useForm();
    const [data, setData] = useState(storedColleagueSkills);
    const [editingKey, setEditingKey] = useState(0);

    const isEditing = (record: ColleagueSkillItem) => record.id === editingKey;

    const edit = (record: Partial<ColleagueSkillItem>) => {
        form.setFieldsValue({ name: '', ability: 0, interest: 0, ...record });
        if (record.id) {
            setEditingKey(record.id);
        }
    };

    const cancel = () => {
        setEditingKey(0);
    };

    const handleDelete = (id: number | undefined) => {
        if (!id) {
            return;
        }
        const newData = data.filter(item => item.id !== id);
        setData(newData);
    };

    const handleAdd = () => {
        const newRow: ColleagueSkillItem = {
            id: data.length + 1,
            colleague_id: props.colleagueId,
            skill_id: 0,
            ability: 0,
            interest: 0,
            name: ''
        };
        setData([...data, newRow]);
        setEditingKey(data.length + 1);
    };

    const save = async (id: number | undefined) => {
        if (!id) {
            return;
        }
        try {
            const row = (await form.validateFields()) as ColleagueSkillItem;
            console.log('row: ', row)

            const dataCopy = [...data];
            const index = dataCopy.findIndex((item) => id === item.id);

            if (index > -1) { // saving existing item
                const item = dataCopy[index];
                console.log('saving existing item: ', item);
                dataCopy.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(dataCopy);
                setEditingKey(-1);
                // useUpdateSkillForColleague(item)
            } else { // saving newly added item
                console.log('saving newly added item', row)
                dataCopy.push(row);
                setData(dataCopy);
                setEditingKey(-1);
                useAddSkillToColleague({
                    ...row,
                    colleague_id: props.colleagueId,
                    skill_id: row.skill_id
                });
            }


        } catch (errInfo) {
            console.log('Validation Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Skill',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Ability',
            dataIndex: 'ability',
            width: '30%',
            editable: true,
        },
        {
            title: 'Interest',
            dataIndex: 'interest',
            width: '30%',
            editable: true,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_: any, record: ColleagueSkillItem) => {
                const editable = isEditing(record);
                const deletable = !isEditing(record) && storedColleagueSkills.length >=1;

                return (
                    <div>
                        {editable ? (
                            <span>
                                <Typography.Link onClick={() => save(record?.id)} style={{ marginRight: 8 }}>
                                  Save
                                </Typography.Link>
                                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                  <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
                                Edit
                            </Typography.Link>
                        )}
                        {'  '}
                        {deletable ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.id)}>
                                <a>Delete</a>
                            </Popconfirm>
                        ) : null}
                    </div>
                );
          },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: ColleagueSkillItem) => ({
                record,
                inputType: (col.dataIndex === 'ability' || col.dataIndex === 'interest') ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            })
        };
    });

    const EditableCell: React.FC<EditableCellProps> = ({
       editing,
       dataIndex,
       title,
       inputType,
       record,
       index,
       children,
       ...restProps
   }) => {
        const inputNode = inputType === 'number' ? <InputNumber min={0} max={5} placeholder={'0 to 5'} /> : <Input placeholder={'Type to search for a skill'} />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{margin: 0}}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
   };

    return (
        <Form form={form} component={false}>
            <Button onClick={handleAdd} type="primary" className={'add-row-button'}>
                Add a row
            </Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
}

export default SkillList;