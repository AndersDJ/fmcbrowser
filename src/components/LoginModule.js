import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';



function LoginModule() {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = (values) => {
        setLoading(true)
        setTimeout(() => {
            navigate('/user', {
                state: {
                    userId: 1
                },
                replace:true
            })
        },2000)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Spin delay='500' spinning={loading}>
                <Form
                    name="basic"
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    initialValues={{remember: true,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}

export default LoginModule