'use client';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Input, Radio, RadioChangeEvent, Table } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import axios from 'axios';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const AdminSearch = (_props: any): JSX.Element => {
  const [searchType, setSearchType] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchFieldPlaceholder, setSearchFieldPlaceholder] =
    useState<string>('Enter skill name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get(
            `/api/fetch-colleague-skill-search-data?searchTerm=${searchTerm}&searchType=${searchType}`,
          )
          .then((response) => {
            console.log(response?.data?.searchResults?.rows);
            setTableData(response?.data?.searchResults?.rows ?? []);
            return response;
          })
          .catch((error) => {
            console.error('fetching search data failed: ', error);
          });
      } catch (error) {
        console.error('error:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  const [tableData, setTableData] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({});

  const columns: ColumnsType<any> = [
    {
      title: 'Skill Name',
      dataIndex: 'skill_name',
      width: '20%',
      sorter: (a, b) => a.skill_name.localeCompare(b.skill_name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Colleague Name',
      dataIndex: 'colleague_name',
      width: '20%',
      sorter: (a, b) => a.colleague_name.localeCompare(b.colleague_name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Ability',
      dataIndex: 'ability',
      width: '20%',
      sorter: (a, b) => a.ability - b.ability,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      width: '20%',
      sorter: (a, b) => a.interest - b.interest,
      sortDirections: ['ascend', 'descend'],
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const onRadioButtonChange = (e: RadioChangeEvent) => {
    setSearchTerm('');
    const radioSelectionInput = e.target.value;
    setSearchType(radioSelectionInput ?? '');
    radioSelectionInput === 1
      ? setSearchFieldPlaceholder('Enter skill name')
      : setSearchFieldPlaceholder('Enter colleague name');
  };

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e?.target?.value ?? '');
  };

  return (
    <>
      <div className={'w-full ml-3'}>Search by</div>
      <Radio.Group
        name="radiogroup"
        className={'w-full ml-3 mt-3'}
        onChange={onRadioButtonChange}
        value={searchType}
      >
        <Radio value={1}>Skill name</Radio>
        <Radio value={2}>Colleague name</Radio>
      </Radio.Group>
      <Input
        placeholder={searchFieldPlaceholder}
        onChange={onSearchInputChange}
        value={searchTerm}
        className={'ml-3 mt-3 w-80'}
      />
      <Table
        className={'w-8/12 mt-4'}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={tableData}
        loading={loading}
        onChange={handleTableChange}
        pagination={false}
      />
    </>
  );
};

export default AdminSearch;
