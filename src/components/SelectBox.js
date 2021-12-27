import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import { useState } from 'react';

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const { result } = d;
          const data = [];
          result.forEach(r => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

function SearchInput(props) {
  const [data, setData] = useState([])
  const [value, setValue] = useState(undefined)

  function handleSearch(value) {
    if (value) {
      fetch(value, data => setData(data));
    } else {
      setData([])
      // this.setState({ data: [] });
    }
  };

  const handleChange = value => {
    setValue(value)
    // this.setState({ value });
  };

  const options = data.map(d => <Option key={d.value}>{d.text}</Option>);
  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
}

export default SearchInput