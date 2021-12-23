import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { BasePathContext } from '../pages/FileControl';


const { Dragger } = Upload;


function UploadFiles() {

    const { basePath, refresh, setRefresh } = useContext(BasePathContext)

    const props = {
        name: 'file',
        multiple: true,
        // action: 'http://www.mocky.io/v2/5cc8019d300000980a055e76',
        action: '/service/uploadFiles',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log("uploading")
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setRefresh(refresh ? false : true)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        headers: {
            basePath: basePath,
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        // beforeUpload: () => {
        //     console.log(basePath)
        // }
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
    )
}


export default UploadFiles