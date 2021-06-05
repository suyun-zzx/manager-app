import React, { Component } from 'react'
import { Card, Table, Modal } from 'antd'
import { ArrowRightOutlined, UserAddOutlined } from '@ant-design/icons'
import { LinkButton, TextButton } from '../../components/LinkButton'
import { getCategory, reqUpdateCategory, reqAddCategory } from '../../api/category'
import UpdateForm from './update-form'
import AddForm from './add-form'

export default class Category extends Component {
    state = {
        category: [],
        categorySon:[],
        loading: false,
        parentId: '0',
        parentName: '',
        isAddModal: false,
        isUpdateModal: false
    }

    async getCategoryData() {
        const { parentId } = this.state
        this.setState({ loading: true })
        const res = await getCategory(parentId)
        this.setState({ loading: false })
        if (res.status === 0 && parentId === '0') {
            this.setState({ category: res.data })
        }else {
            this.setState({ categorySon: res.data })
        }
    }

    componentDidMount() {
        this.getCategoryData()
    }

    showCategorySon(category) {
        this.setState({ parentId: category._id, parentName: category.name }, () => {
            this.getCategoryData()
        })
    }

    showCategory() {
        this.setState({ parentId: '0' }, () => {
            this.getCategoryData()
        })
    }

    render() {
        // 表格的标题
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name'
            },
            {
                title: '操作',
                width: 400,
                render: (category) => <div>
                    <TextButton onClick={() => { showUpdate(category) }}>修改分类 </TextButton>
                    {this.state.parentId === '0' ? <TextButton onClick={() => { this.showCategorySon(category) }}> 查看子分类</TextButton> : null}
                </div>
            }
        ]

        const { category, loading, parentName, parentId, isAddModal, isUpdateModal, categorySon } = this.state

        // 修改后的标签内容
        const title = parentId === '0' ? '一级分类列表' : (
            <div>
                <TextButton onClick={() => { this.showCategory() }}>一级分类列表</TextButton>
                <ArrowRightOutlined style={{ margin: '0 10px' }} />
                <span style={{ fontSize: '15px' }}>{parentName}</span>
            </div>
        )

        const updateCategory = async () => {
            this.setState({ isUpdateModal: false })
            const id = this.nowCategory._id
            const categoryName = this.form.getFieldValue('categoryName')
            const res = await reqUpdateCategory({
                id,
                categoryName
            })
            if(res.status === 0) {
                this.getCategoryData()
            }
        }

        const addCategory = async () => {
            const categoryName = this.addForm.getFieldValue('categoryName')
            if (categoryName !== '' && categoryName !== undefined) {
                this.setState({isAddModal:false})
            }
            const parentId = this.addForm.getFieldValue('parentId')
            const res = await reqAddCategory({
                categoryName,
                parentId
            })
            if(res.status === 0 && parentId === this.state.parentId) {
                this.getCategoryData()
            }
        }

        const handleCancel = () => {
            isUpdateModal ? this.setState({ isUpdateModal: false }) : this.setState({ isAddModal: false })
        }

        const showAdd = () => {
            this.setState({ isAddModal: true })
        }

        const showUpdate = (category) => {
            this.categoryName = category.name
            this.setState({ isUpdateModal: true })
            this.nowCategory = category
        }

        return (
            <div className='category'>
                <Card
                    title={title}
                    extra={<LinkButton onClick={showAdd}><UserAddOutlined />添加</LinkButton>}
                    className='card'
                >
                    <Table
                        dataSource={ parentId === '0' ? category : categorySon }
                        columns={columns}
                        bordered
                        rowKey='_id'
                        pagination={{ showQuickJumper: true }}
                        loading={loading}
                    >
                    </Table>
                    <Modal destroyOnClose={true} title="添加" visible={isAddModal} onOk={addCategory} onCancel={handleCancel}>
                        <AddForm setForm={(form) => {this.addForm = form}} category={category} parentId={parentId}/>
                    </Modal>
                    {/* destoryOnClose 关闭时清除Form 下次打开不再显示上次的值 */}
                    <Modal destroyOnClose={true} title="修改" visible={isUpdateModal} onOk={updateCategory} onCancel={handleCancel}>
                        <UpdateForm setForm={(form) => {this.form = form}} categoryName={this.categoryName}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}
