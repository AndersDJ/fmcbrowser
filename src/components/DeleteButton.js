import {
    DeleteOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useContext, useState } from 'react';
import { BasePathContext, RowContext } from '../pages/FileControl';

function DeleteButton() {
    const [hasDir, setHasDir] = useState(false)
    const [filePath, setFilePath] = useState([])
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { selectedRowKeys, response } = useContext(RowContext)
    const { basePath, refresh, setRefresh } = useContext(BasePathContext)

    const deleteModal = () => {
        console.log(selectedRowKeys)
        if (selectedRowKeys.length > 0) {
            setHasDir(false)
            let fp = []
            if (response.length > 0) {
                response.forEach((f) => {
                    if (selectedRowKeys.indexOf(f.key) > -1) {
                        fp.push(basePath + "/" + f.name)
                        // console.log("=======", filePath, "======", f.is_dir, "=======")
                        if (f.is_dir && !hasDir) {
                            setHasDir(true)
                        }
                    }
                });
            }
            setFilePath(fp)

            console.log(hasDir)
            console.log(filePath, fp)
            if (hasDir) {
            }
        }
    }
    function confirm(e) {
        // console.log(e);
        setConfirmLoading(true)
        setFilePath([])
        setHasDir(false)
        //TODO: axios
        message.success('Click on Yes');
    }

    function cancel(e) {
        // console.log(e);
        setFilePath([])
        setHasDir(false)
        message.error('Click on No');
    }

    return (
        <Popconfirm
            title="Are you sure to delete these tasks?"
            onConfirm={confirm}
            onCancel={cancel}
            okButtonProps={{ loading: confirmLoading }}
            visible={visible}

        // okText="确认"
        // cancelText="取消"
        >
            <Button type="circle" onClick={deleteModal} icon={<DeleteOutlined />} />
        </Popconfirm>
    )
}

export default DeleteButton