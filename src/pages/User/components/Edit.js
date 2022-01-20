import React ,{useEffect,useState}from 'react'
import {Button,Avatar,Switch,message,Modal} from 'antd'
// import {PlusOutlined,UserOutlined} from '@ant-design/icons'
// import { addUser, fetchUsers, lockUser } from '@/services/ant-design-pro/api';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { detailUser, updateUser } from '@/services/ant-design-pro/api';
import { Skeleton } from 'antd';

export default function Edit(props) {
    const {changeEditShow,editshow,actionRef,uid}=props;
    const [initalValue,setInitalValue]=useState(undefined);
    useEffect(async ()=>{
        if(uid!==undefined){
            const detail=await detailUser(uid);
            setInitalValue({name:detail.name,email:detail.email})
        }
        
    },[])
    const editSubmit=async function(value){
        const res_update=await updateUser(value,uid);
        // if(res_adduser.status==undefined){
        if(true){
            message.success('编辑用户成功')
            //更新表格
            actionRef.current.reload();
        }else{
            message.error('编辑用户失败')
        }
        // 关闭弹窗
        changeEditShow(false);
    }
    return (
        <Modal
        title='编辑用户'
        visible={editshow}
        onCancel={()=>{changeEditShow(false)}}
        footer={null}
        destroyOnClose={true}
        >
        {initalValue?<ProForm onFinish={(value)=>{editSubmit(value)}} initialValues={initalValue}>
            <ProFormText name="name" label="昵称" placeholder="请输入昵称" rules={[{required:true,message:"昵称不能为空"}]}>
            </ProFormText>
            <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" rules={[{required:true,message:"邮箱不能为空"},{type:'email',message:'邮箱格式不正确'}]}>
            </ProFormText>
        </ProForm>:<Skeleton paragraph={{ rows: 4 }} />}
        
    </Modal>
    )
}
