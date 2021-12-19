import React, {useState} from 'react';
import { Card } from 'antd';
import '../static/style/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginModule from '../components/LoginModule';
import SignModule from '../components/SignModule';
// import 'antd/dist/antd.less'

const cardList = [
    {
        key: 'Login',
        tab: 'Login'
    },
    {
        key: 'Sign',
        tab: 'Sign'
    }
]
const contentListNoTitle = {
    Login: <LoginModule />,
    Sign: <SignModule />
}

function Front() {
    const [activeTabKey, setActiveTabKey] = useState('Login');
    const onTabChange = key => {
        setActiveTabKey(key);
    };


    const [form, setForm] = useState({
        name: '',
        pass:'',
        loading: false,
    })
    const [lastLogin,setLastLogin] = useState(0)
    const [data,setData] = useState({})
    const navigate = useNavigate()

    return (
        <div className='card'>
            <Card
                className='card-box'
                style={{ width: '30%' }}
                tabList={cardList}
                activeTabKey={activeTabKey}
                tabBarExtraContent={<a href="#">More</a>}
                onTabChange={key => {
                    onTabChange(key);
                }}
            >
                {contentListNoTitle[activeTabKey]}
            </Card>
        </div>
    )
}

export default Front
