import React, { useEffect, useState } from 'react'
import { Badge, Image, Space, Typography, Drawer, List } from 'antd';
import logo from '../img/diamond.jpeg'
import { BellFilled, MailOutlined } from '@ant-design/icons';
import { getComments, getOrders } from '../api/Db.conn';

function Header() {

  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    getComments().then(res => {
      setComments(res.comments);
    })
    getOrders().then(res => {
      setOrders(res.products);
    })
  },[])

  return (
    <div className='Header'>
      <Image
         width={60}
         src={logo}
         style={{opacity:'0.6'}}
      />
      <Typography.Title italic style={{textShadow:'2px 2px 4px #000000'}}>WeCodeIt Dashboard</Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
            <MailOutlined style={{fontSize: 24 }} onClick={() => {
              setCommentsOpen(true);
            }}/>
        </Badge>
        <Badge count={orders.length}>
            <BellFilled style={{fontSize: 24 }} onClick={() => {
              setNotificationOpen(true);
            }}/>
        </Badge>
      </Space>
      <Drawer 
        title='Comments' 
        open={commentsOpen} 
        onClose={() => {
          setCommentsOpen(false);
        }} 
        maskClosable
      >
        <List 
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>
          }}
        ></List>
      </Drawer>
      <Drawer 
        title='Notifications' 
        open={notificationOpen} 
        onClose={() => {
          setNotificationOpen(false);
        }} 
        maskClosable
      >
        <List 
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item> 
                <Typography.Text strong>{item.title}</Typography.Text> has been ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  )
}

export default Header;