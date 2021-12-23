import { Button, Modal } from 'antd';
import SearchInput from '../components/SelectBox';
import { useState, useContext } from 'react';
import {
    DownloadOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import '../static/style/fileTopBar.css'
import UploadFiles from './UploadFiles';
// import { BasePathContext } from '../pages/FileControl';

function FileTableTopBar() {
    // const { basePath, refresh } = useContext(BasePathContext)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div id='bread-buttons' className='clear-fix'>
            <SearchInput placeholder="input search text" style={{ width: 200 }} />
            <div className='top-buttons'>
                <>
                    <Button type="circle" icon={<DownloadOutlined />} />
                    <Button type="circle" onClick={showModal} icon={<UploadOutlined />} />
                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <UploadFiles />
                    </Modal>
                </>
            </div>
        </div>
    )
}

export default FileTableTopBar