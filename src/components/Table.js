
function Table() {
  const data = {
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
    }
    return (
        <Table
            style={{width: '100%'}}
            rowClassName={this.rowClassName.bind(this)}
            columns={data.columns}
            data={data.data}
        />
        
        // render() {
        //   return (
        //     <Table
        //       style={{width: '100%'}}
        //       columns={this.state.columns}
        //       data={this.state.data}
        //       stripe={true}
        //     />
        //   )
        // }

        // rowClassName(row, index) {
        //   if (index === 1) {
        //     return 'info-row';
        //   } else if (index === 3) {
        //     return 'positive-row';
        //   }
        //   return '';
        // }

        // render() {
        //   return (
        //     <Table
        //       style={{width: '100%'}}
        //       rowClassName={this.rowClassName.bind(this)}
        //       columns={this.state.columns}
        //       data={this.state.data}
        //     />
        //   )
        // }
    )
}