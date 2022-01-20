import React,{useRef,useState}from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table'
import {Button,Avatar,Switch,message,Modal} from 'antd'
import {PlusOutlined,UserOutlined} from '@ant-design/icons'
import { addUser, fetchUsers, lockUser } from '@/services/ant-design-pro/api';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import Edit from './components/Edit';

export default function User() {
    const actionRef=useRef();
    const [visible,setVisible]=useState(false);
    const [editshow,setEditshow]=useState(false);
    const [uid,setUid]=useState(undefined);
    // 请求首页数据
    const getTableList=async function(arg){
            const response=await fetchUsers(arg);
            return {
                data:response.data,
                success:true,
                total:response.meta.pagination.total
            }
        }
    // 启用和禁用
    const handleLockUser=async function(uid){
            console.log(555);
            const res_lock=await lockUser(uid);
            if(res_lock.status==undefined){
                message.success('操作成功')
            }
        }
    // 关闭弹窗
    const closeModal=function(){
        setVisible(false)
    }
    // 新建用户打开弹窗
    const openModal=function(){
        setVisible(true)
    }
    // 新建用户后提交
    const tableSubmit=async function(value){
        //const res_adduser=await addUser(value);
        // if(res_adduser.status==undefined){
        if(true){
            message.success('添加用户成功')
            //更新表格
            actionRef.current.reload();
        }else{
            message.error('添加用户失败')
        }
        // 关闭弹窗
        closeModal();
    }
    // 编辑用户-弹窗的展示与关闭
    const changeEditShow=function(flag,userid){
        setEditshow(flag);
        setUid(userid);
    }
    const columns=[
        {
        title:'头像',
        dataIndex:'avater_url',
        hideInSearch:true,
        render:(_,record)=>{
            return <Avatar size={32} icon={<UserOutlined />} src={record.avatar_url} />
        }},
        {
        title:'姓名',
        dataIndex:'name'
        },
        {
        title:'邮箱',
        dataIndex:'email'
        },
        {
        title:'是否禁用',
        dataIndex:'is_locked',
        hideInSearch:true,
        render:(_,record) => <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={record.is_locked===0} onChange={ () => handleLockUser(record.id) } />
        },
        {
        title:'创建时间',
        dataIndex:'created_at',
        hideInSearch:true,
        },
        {
        title:'操作',
        hideInSearch:true,
        render:(_,record)=>{
            return <a onClick={()=>{changeEditShow(true,record.id)}}>编辑</a>
        }}
    ];
    return (
    <PageContainer>
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={(params) => getTableList(params)}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            pagination={{
                pageSize: 5,
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined />} type="primary" onClick={openModal}>
                    新建
                </Button>,
            ]}
        />
        <Modal 
            title='新建用户'
            visible={visible}
            onCancel={closeModal}
            footer={null}
            destroyOnClose={true}
            >
            <ProForm onFinish={(value)=>{tableSubmit(value)}}>
                <ProFormText name="name" label="昵称" placeholder="请输入昵称" rules={[{required:true,message:"昵称不能为空"}]}>
                </ProFormText>
                <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[{required:true,message:"邮箱不能为空"},{type:'email',message:'邮箱格式不正确'}]}>
                </ProFormText>
                <ProFormText.Password name="password" label="密码" placeholder="请输入密码 " rules={[{required:true,message:"密码不能为空"}]}>
                </ProFormText.Password>
            </ProForm>
        </Modal>
        {editshow&&<Edit changeEditShow={changeEditShow} editshow={editshow} actionRef={actionRef} uid={uid}/>}
    </PageContainer>
    )
}
