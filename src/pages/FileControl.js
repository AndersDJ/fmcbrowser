import { Layout, Breadcrumb, Table, Spin } from 'antd';
import '../static/style/FileControl.css'
import MenuLeft from '../components/MenuLeft'
import SearchInput from '../components/SelectBox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    HomeOutlined,
} from '@ant-design/icons';
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'


const { Header, Content, Footer } = Layout;

function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}

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
    let unit, num

    // if (isNumber(size.substr(0, size.length - 1))) {
    //     unit = "B"
    //     num = parseFloat(size.substr(0, size.length - 1))
    // } else {
    //     unit = size.substr(size.length - 2, 2)
    //     num = parseFloat(size.substr(0, size.length - 2))
    // }
    // if (unit === "-") {
    //     return -1
    // } else {
    //     return num * unitSize[unit]
    // }
}

function FileControl() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => {
                if (record.is_dir) {
                    return (<a onClick={() => {
                        setBasePath(basePath + text + "/")
                    }}>{text}</a>)
                } else {
                    return <>{text}</>
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
            }
        },
        {
            title: 'Size',
            dataIndex: 'size',
            width: '15%',
            sorter: {
                compare: (a, b) => {
                    let intA = unitySize(a.size)
                    let intB = unitySize(b.size)
                    if (intA > intB) {
                        return 1
                    } else if (intA < intB) {
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
            width: '20%',
            sorter: {
                compare: (a, b) => {
                    let t1 = timeToTimestamp(a.mod_time)
                    let t2 = timeToTimestamp(b.mod_time)
                    if (t1 < t2) {
                        return -1
                    } else if (t1 > t2) {
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
    const [basePath, setBasePath] = useState("/")
    const [error, setError] = useState('')
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
            // {
            //     key: 'odd',
            //     text: 'Select Odd Row',
            //     onSelect: changableRowKeys => {
            //         let newSelectedRowKeys = [];
            //         newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            //             if (index % 2 !== 0) {
            //                 return false;
            //             }
            //             return true;
            //         });
            //         setSelectedRowKeys(newSelectedRowKeys)
            //         // this.setState({ selectedRowKeys: newSelectedRowKeys });
            //     },
            // },
            // {
            //     key: 'even',
            //     text: 'Select Even Row',
            //     onSelect: changableRowKeys => {
            //         let newSelectedRowKeys = [];
            //         newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            //             if (index % 2 !== 0) {
            //                 return true;
            //             }
            //             return false;
            //         });
            //         setSelectedRowKeys(newSelectedRowKeys)
            //         // this.setState({ selectedRowKeys: newSelectedRowKeys });
            //     },
            // },
        ],
    }

    const onRow = record => {
        return {
            onClick: event => {
            }
        }
    }

    const setRowClassName = (record) => {
    }
    useEffect(() => {
        // useDeepCompareEffect(() => {
        const fetchData = async () => {
            setError(false)
            setLoading(true)
            var encodeBP = Base64.stringify(Utf8.parse(basePath))

            console.log(encodeBP)

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
    }, [basePath])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MenuLeft />
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, paddingLeft: '50px' }} >
                    <SearchInput placeholder="input search text" style={{ width: 200 }} />                    {/* abcd */}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} >
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
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Spin spinning={loading} delay={500}>
                            {/* <p>xxxxx</p> */}
                            <Table
                                pagination={false}
                                columns={columns}
                                dataSource={response}
                                onChange={onChange}
                                rowClassName={setRowClassName}
                                rowSelection={rowSelection}
                            />
                        </Spin>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default FileControl