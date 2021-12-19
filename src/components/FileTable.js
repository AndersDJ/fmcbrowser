import { useState } from "react"

// import {Table} from 'antd'

function FileTable() {
    // const [data,setData] = useState(
    //     [{
    //         key: '1',
    //         name: '胡彦斌',
    //         age: 32,
    //         address: '西湖区湖底公园1号',
    //     },
    //     {
    //         key: '2',
    //         name: '胡彦祖',
    //         age: 42,
    //         address: '西湖区湖底公园1号',
    //     },]
    // )
    // const []
    const [data, setData] = useState({
         columns: [
      {
        label: "日期",
        prop: "date",
        width: 180
      },
      {
        label: "姓名",
        prop: "name",
        width: 180
      },
      {
        label: "地址",
        prop: "address"
      }
    ],
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }]
    })

    function rowClassName(row, index) {
        console.log(row,index)
        if (index = 1) {
            return 'info-row';
        } else if (index =3) {
            return 'positive-row';
        }
        return '';
    }

    return (
        <div></div>

    )


}

export default  FileTable