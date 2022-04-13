import React,{useEffect,useState}from 'react'
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { fetchDashboard } from '@/services/Dashboard';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';

export default function Dashboard() {
    let [dashboardData,setdashboardData]=useState({});
    useEffect(async ()=>{
        const mainPage=await fetchDashboard();
        setdashboardData(mainPage)
    },[])
    const text=useIntl().formatMessage({id:'flag'})
    return (
        <div className="site-statistic-demo-card">
            <h2>{text}</h2>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="用户数"
                            value={dashboardData.users_count}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="商品数"
                            value={dashboardData.goods_count}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="订单数"
                            value={dashboardData.order_count}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
