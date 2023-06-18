import { Avatar, Rate, Space, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { getCustomers } from '../api/Db.conn';

function Customer() {
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    getCustomers().then(res=>{
      setDataSource(res.users)
    })
  },[])

  return (
    <Space size={20} direction='vertical'>
      <Typography.Title level={3} italic style={{textShadow:'2px 2px 4px #ffff'}}>Customers</Typography.Title>
      <Table 
      columns={[
        {
          title: 'Image',
          dataIndex: 'image',
          render: (link) => {
            return <Avatar src={link} />
          },
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: 'Adress',
          dataIndex: 'address',
          key: 'address',
          render: (address)=>{
            return <span>{address.address}, {address.city}</span>
          }
        }
      ]}
      dataSource={dataSource}
      pagination={{
        pageSize: 5
      }}
      /> 
    </Space>
  )
}

export default Customer;