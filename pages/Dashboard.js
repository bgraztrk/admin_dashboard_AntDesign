import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Card, Typography, Statistic, Table, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { getCustomers, getInventory, getOrders, getRevenue } from '../api/Db.conn';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal)
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  },[])

  return (
    <div>
      <Space size={20} direction="vertical">
      <Typography.Title level={4}></Typography.Title>
      <Space direction='horizontal'>
        <DashboardCard 
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />} 
            title={"Orders"} 
            value={orders}
        />
        <DashboardCard 
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />} 
          title={"Inventory"} 
          value={inventory}
        />
        <DashboardCard 
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />} 
          title={"Customers"} 
          value={customers}
        />
        <DashboardCard 
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />} 
          title={"Revenue"} 
          value={revenue}
        />
      </Space>
      <Row>
        <Col span={16}>
          <RecentOrders/>
        </Col>
        <Col span={7} style={{marginLeft:'25px'}}>
          <DashboardChart/>
        </Col>
      </Row>
    </Space>
    </div>
  )
}
function DashboardCard({icon, title, value}){
  return(
    <Card>
      <Space direction='horizontal'>
          {icon}
          <Statistic title={title} value={value}/>
      </Space>
    </Card>
  )
}
function RecentOrders(){
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {    
    getOrders().then((res) => {
      setDataSource(res.products.slice(0,4));
    })
  },[])

  return (
    <>
    <Typography.Text>Recent Orders</Typography.Text>
    <Table 
      columns={[
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity'
        },
        {
          title: 'Price',
          dataIndex: 'discountedPrice',
          key: 'discountedPrice'
        }
      ]}
      dataSource={dataSource}
      pagination={false}
    />
    </>
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
            backgroundColor: "rgba(205, 16, 118)",
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
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 300 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}

export default Dashboard;