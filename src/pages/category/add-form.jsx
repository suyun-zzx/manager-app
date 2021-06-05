import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Select } from "antd";

const { Item } = Form;
const { Option } = Select

class AddForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        category:PropTypes.array,
        parentId:PropTypes.string,
        setForm:PropTypes.func
    }

    componentDidMount(){
        this.props.setForm(this.formRef.current)
    }

    render() {
        const {category,parentId} = this.props

        return (
            <Form
                ref={this.formRef}>
                <Item name='parentId' initialValue={parentId}>
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {category.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}
                    </Select>
                </Item>
                <Item 
                    name='categoryName'
                    rules={[
                        { required: true, message: '内容不能为空!' }
                    ]}>
                    <Input placeholder='请输入内容'></Input>
                </Item>
            </Form>
        );
    }
}

export default AddForm;