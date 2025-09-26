import React, { useState } from 'react'
import { Select } from 'antd'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'

const { Option } = Select

export interface iconSelectProps {
    placeholder?: string
    onChange?: (value: string) => void
    defaultValue?: string
}
const IconSelect: React.FC<iconSelectProps> = ({ placeholder = '请选择图标',onChange,defaultValue }) => {


    // const iconList = Object.keys(icons)
    // 里面有一些是方法,要筛选一遍,否则页面会报错　　  
    const iconList = Object.keys(icons).filter((item) => typeof icons[item as keyof typeof icons] === 'object')
    return (
        <Select
            placeholder={placeholder}
            showSearch
            allowClear
            style={{ width: '100%' }}
            onChange={onChange}
            defaultValue={defaultValue}
        >
            {iconList.map(item => {
                return <Option value={item} key={item}>
                    <Icon component={icons[item]} style={{ marginRight: '8px' }} />
                    {item}
                </Option>
            })}
        </Select>
    )
}

export default IconSelect
