import { Space } from 'antd';
import './App.css';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='SideMenuAndContent'>
        <SideMenu></SideMenu>
        <Content></Content>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
