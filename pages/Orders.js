import { Row, Col, Space, Table, Typography, Card } from 'antd';
import React, { useEffect, useState } from 'react'
import { getOrders, getRevenue } from '../api/Db.conn';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Orders() {
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    getOrders().then(res=>{
      setDataSource(res.products)
    })
  },[])

  return (
    <Space size={20} direction='vertical'>
      <Typography.Title level={3} italic style={{textShadow:'2px 2px 4px #ffff'}}>Orders</Typography.Title>
      <Row>
        <Col span={11}> 
          <Table 
            columns={[
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
              render : (value) => <span>${value}</span>
            },
            {
              title: 'DiscountedPrice',
              dataIndex: 'discountedPrice',
              key: 'discountedPrice',
              render : (value) => <span>${value}</span>
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'quantity'
            },
            {
              title: 'Total',
              dataIndex: 'total',
              key: 'total'
            }
            ]}
            dataSource={dataSource}
            pagination={{
            pageSize: 5
            }}
          />
        </Col>
        <Col span={12} style={{marginLeft:'25px'}} >
          <DashboardChart/>
        </Col>
      </Row>
    </Space>
  )
}

function DashboardChart(){

  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(139, 10, 80)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: "Order Revenue"
      },
    },
  };

  return (
    <Card style={{ width: 600, height: 350 }}>
    <Line options={options} data={reveneuData} />
    </Card>
  )
}

export default Orders;