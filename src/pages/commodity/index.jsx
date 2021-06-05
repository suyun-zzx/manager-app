import React, { Component } from 'react'
import { Card, Select, Table, Input, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { LinkButton, TextButton } from '../../components/LinkButton'
import { reqCommodity, searchCommodity } from '../../api/commodity'

export default class Commodity extends Component {
    state = {
        commodity: [],
        s_commodity: [],
        pageSize: '8',
        total: '0',
        loading: false,
        searchName: '',
        searchType: 'productName',
        searchNow: false
    }

    componentDidMount() {
        this.getCommodity(1)
    }

    // 得到全部商品信息
    async getCommodity(pageNum) {
        const { pageSize } = this.state
        this.setState({ loading: true })
        const res = await reqCommodity({
            pageNum,
            pageSize
        })
        this.setState({ loading: false })
        const { data } = res
        if (res.status === 0) {
            this.setState({ commodity: data.list, total: data.total })
        }
    }

    // 得到搜索的商品信息
    search = async (pageNum) => {
        const { searchType, searchName, pageSize } = this.state
        this.setState({ loading: true })
        const res = await searchCommodity({
            searchType,
            searchName,
            pageNum,
            pageSize
        })
        this.setState({ loading: false })
        const { data } = res
        if (res.status === 0) {
            this.setState({ s_commodity: data.list, total: data.total, searchNow: true })
        }
    }

    render() {
        const { commodity, total, pageSize, loading, searchName, searchType, searchNow, s_commodity } = this.state
        const { Option } = Select
        // 卡片标题
        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: '150px' }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='productName'>按名字搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    style={{ width: '160px', margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button onClick={() => { this.search(1) }} style={{ backgroundColor: 'pink', color: 'white' }}>搜索</Button>
            </span>
        )

        // 表格标头
        const columns = [
            {
                title: '商品名称',
                width: 240,
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                width: 650,
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price'
            },
            {
                title: '状态',
                render: () => <LinkButton>下架</LinkButton>
            },
            {
                title: '操作',
                render: () => <TextButton>详情修改</TextButton>
            }
        ]

        return (
            <div className='commodity'>
                <Card
                    title={title}
                    extra={<LinkButton><UserAddOutlined />添加商品</LinkButton>}
                >
                    <Table
                        columns={columns}
                        bordered
                        dataSource={searchNow ? s_commodity : commodity}
                        rowKey='_id'
                        loading={loading}
                        pagination={
                            {
                                total, defaultPageSize: pageSize,
                                showQuickJumper: true,
                                onChange: (pageNum) => searchNow ? this.search(pageNum) : this.getCommodity(pageNum)
                            }
                        }
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}
