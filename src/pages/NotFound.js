import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <Result
          status="404"
          title="404"
          subTitle="对不起，您访问的页面不存在"
          extra={
            <Link to="/">
              <Button type="primary">返回首页</Button>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default NotFound; 