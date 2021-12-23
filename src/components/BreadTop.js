import { Breadcrumb } from 'antd';
import { useContext } from 'react';
import { BasePathContext } from '../pages/FileControl';
import {
    HomeOutlined,
} from '@ant-design/icons';

import '../static/style/fileTopBar.css'

function BreadTop() {

    const { basePath, setBasePath } = useContext(BasePathContext)

    return (
        <Breadcrumb className='bread' style={{ margin: '16px 0' }} >
            <Breadcrumb.Item key={"*"} onClick={() => {
                setBasePath("/")
            }}>
                <HomeOutlined />
            </Breadcrumb.Item>
            {
                basePath.split("/").map((item, index) => {
                    return (
                        <Breadcrumb.Item key={index} onClick={() => {
                            let l = basePath.split("/")
                            setBasePath(l.slice(0, index + 1).join("/") + "/")
                        }}>{item}</Breadcrumb.Item>)
                })
            }
        </Breadcrumb>
    )
}
export default BreadTop