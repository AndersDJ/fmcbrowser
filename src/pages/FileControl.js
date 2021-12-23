import { useRef, useEffect, useState, createContext } from 'react';
import { Layout, Table, Spin, Tooltip } from 'antd';
import '../static/style/FileControl.css'
import MenuLeft from '../components/MenuLeft'
import SearchInput from '../components/SelectBox';
import axios from 'axios';
import {
} from '@ant-design/icons';
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import UploadFiles from '../components/UploadFiles';
import FileTableTopBar from '../components/FileTableTopBar';
import BreadTop from '../components/BreadTop';

export const BasePathContext = createContext({
    basePath: "",
    refresh: true,
    setBasePath: () => { },
    setRefresh: () => { },
});

const { Header, Content, Footer } = Layout;

// function isNumber(val) {
//     var regPos = /^\d+(\.\d+)?$/; //非负浮点数
//     var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
//     if (regPos.test(val) || regNeg.test(val)) {
//         return true;
//     } else {
//         return false;
//     }
// }

function timeToTimestamp(date) {
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/'); //必须把日期'-'转为'/'
    var timestamp = new Date(date).getTime();
    return timestamp
}

const unitSize = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
    EB: 1024 * 1024 * 1024 * 1024 * 1024,
}

function unitySize(size) {
    if (size === "-") {
        return -1
    }
    let unit, num
    let l = size.split(" ")
    unit = l[1]
    num = l[0]
    let nn = num * unitSize[unit]
    if (nn < 0) {
        console.log(size)

    }
    return nn
}

function FileControl() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            // width: '10%',
            render: (text, record) => {
                if (record.is_dir) {
                    return (
                        <Tooltip placement='topLeft' title={text}>
                            <a onClick={() => {
                                setBasePath(basePath + text + "/")
                            }}>{text}</a>
                        </Tooltip>
                    )
                } else {
                    return (
                        <Tooltip placement='topLeft' title={text}>
                            {text}
                        </Tooltip>
                    )
                }
            },
            sorter: {
                compare: (a, b) => {
                    let stringA = a.name?.toUpperCase() || '0'; // ignore upper and lowercase
                    let stringB = b.name?.toUpperCase() || '0'; // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 2,
            },
            ellipsis: {
                showTitle: false,
            }
        },
        {
            title: 'Size',
            dataIndex: 'size',
            width: '10%',
            sorter: {
                compare: (a, b) => {
                    let intA = unitySize(a.size)
                    let intB = unitySize(b.size)
                    if (intA < intB) {
                        return 1
                    } else if (intA > intB) {
                        return -1
                    } else {
                        return 0
                    }
                },
                multiple: 1
            }
        },
        {
            title: 'Last modified',
            dataIndex: 'mod_time',
            width: '16%',
            sorter: {
                compare: (a, b) => {
                    let t1 = timeToTimestamp(a.mod_time)
                    let t2 = timeToTimestamp(b.mod_time)
                    if (t1 > t2) {
                        return -1
                    } else if (t1 < t2) {
                        return 1
                    } else {
                        return 0
                    }
                },
                multiple: 3
            }
        }
    ]

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }

    const [response, setResponse] = useState(null)
    const [refresh, setRefresh] = useState(true)
    const [basePath, setBasePath] = useState("/")
    const [_, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])



    const onSelectChange = selectedRowKeys => {
        // console.log("selectedRowKeys changed: ", selectedRowKeys)
        setSelectedRowKeys(selectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    }

    const setRowClassName = (record) => {
    }

    useEffect(() => {
        // useDeepCompareEffect(() => {
        const fetchData = async () => {
            setError(false)
            setLoading(true)
            var encodeBP = Base64.stringify(Utf8.parse(basePath))
            await axios.get("/service/fileList", {
                headers: {
                    'basePath': encodeBP
                }
            })
                .then(rsp => {
                    // console.log(rsp.data.data)
                    setResponse(rsp.data.data.list)
                }).catch(err => {
                    setError(err)
                })
            setLoading(false)
        }
        fetchData()
    }, [basePath, refresh])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MenuLeft />
            <Layout className="site-layout">
                <Header className="site-layout-background header" >
                    <BasePathContext.Provider
                        value={{ basePath, setBasePath }}
                    >
                        <BreadTop />
                    </BasePathContext.Provider>
                </Header>
                <Content className='site-layout-background content'>
                    <div className="body">
                        <Spin spinning={loading} delay={500}>
                            <Table
                                className='file-table'
                                bordered={true}
                                pagination={false}
                                columns={columns}
                                dataSource={response}
                                onChange={onChange}
                                rowClassName={setRowClassName}
                                rowSelection={rowSelection}
                                title={() => {
                                    return (
                                        <BasePathContext.Provider
                                            value={{ basePath, refresh, setRefresh }}
                                        >
                                            <FileTableTopBar />
                                        </BasePathContext.Provider>
                                    )
                                }}
                            />
                        </Spin>
                    </div>
                    <div>
                        <UploadFiles />
                    </div>
                </Content>
                <Footer className='footer'>
                    Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default FileControl