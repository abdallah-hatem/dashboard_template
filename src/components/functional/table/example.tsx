import React, { useState } from 'react';
import { Button, Tag, Space } from 'antd';
import Table, { IAction } from './index';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
  status: 'active' | 'inactive';
  tags: string[];
}

const ExampleTable = () => {
  const [loading, setLoading] = useState(false);
  
  // Sample data
  const dataSource: DataType[] = [
    {
      id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      status: 'active',
      tags: ['developer', 'frontend'],
    },
    {
      id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      status: 'active',
      tags: ['designer'],
    },
    {
      id: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      status: 'inactive',
      tags: ['manager', 'backend'],
    },
  ];

  // Column definitions
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: DataType, b: DataType) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  // Action definitions
  const actions: IAction[] = [
    {
      label: 'View',
      onClick: (record) => console.log('View', record),
      icon: <EyeOutlined />,
    },
    {
      label: 'Edit',
      onClick: (record) => console.log('Edit', record),
      icon: <EditOutlined />,
    },
    {
      label: 'Delete',
      onClick: (record) => console.log('Delete', record),
      danger: true,
      icon: <DeleteOutlined />,
      // Only show delete for inactive users
      hide: (record) => record.status === 'active',
    },
  ];

  // Example function to simulate loading data
  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <Button onClick={refreshData} className="mb-4">
        Refresh Data
      </Button>
      
      <Table<DataType>
        title="Users Table"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        actions={actions}
        searchable
        rowKey="id"
      />
    </div>
  );
};

export default ExampleTable; 