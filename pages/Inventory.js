import { Avatar, Rate, Space, Table, Typography, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { getInventory } from '../api/Db.conn';

function Inventory() {
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    getInventory().then(res=>{
      setDataSource(res.products)
    })
  },[])

  return (
    <Space size={20} direction='vertical'>
      <Typography.Title level={3} italic style={{textShadow:'2px 2px 4px #ffff'}}>Inventory</Typography.Title>
      <Row>
        <Col span={24}> 
          <Table 
            columns={[
            {
              title: 'Thumbnail',
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              render: (link) => {
                return <Avatar src={link} />
              },
            },
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title'
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
              render : (value) => <span>${value}</span>
            },
            {
              title: 'Rating',
              dataIndex: 'rating',
              key: 'rating',
              render : (rating) => {
                return <Rate value={rating} allowHalf disabled/>
              }
            },
            {
              title: 'Stock',
              dataIndex: 'stock',
              key: 'stock'
            },
            {
              title: 'Brand',
              dataIndex: 'brand',
              key: 'brand'
            },
            {
              title: 'Category',
              dataIndex: 'category',
              key: 'category'
            }
            ]}  
            dataSource={dataSource}
            pagination={{
            pageSize: 5
            }}
          />   
        </Col>
      </Row>
    </Space>
  )
}

export default Inventory;