import { Table, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const List = ({ blogs, onDelete, onAdd, onEdit }) => {
  const getRowKey = (record) => record.id;
  const renderTitle = () => (
    <div>
      <Button type='primary' icon={<PlusOutlined />} onClick={onAdd} />
    </div>
  );
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              onEdit(record);
            }}>
            Edit
          </Button>
          <Button danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        title={renderTitle}
        dataSource={blogs}
        rowKey={getRowKey}
      />
    </>
  );
};

export default List;
