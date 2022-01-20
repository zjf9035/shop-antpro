import React,{useRef,useState,useEffect}from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table'
import {Button,Avatar,Switch,message,Modal,Image,Cascader} from 'antd'
import {PlusOutlined,UserOutlined} from '@ant-design/icons'
import { addUser, fetchUsers, lockUser } from '@/services/ant-design-pro/api';
import { addGoods, fetchGoods, getCategory, isOn, isRecommend } from '@/services/Goods';
import ProForm, { ProFormText ,ProFormTextArea,ProFormDigit,ProFormUploadButton} from '@ant-design/pro-form';
import Edit from './components/Edit';
import OssUpload from '@/components/OSSUpload';
import EditorDemo from '@/components/RichEdit';

export default function Goods() {
    const actionRef=useRef();
    const [visible,setVisible]=useState(false);
    const [editshow,setEditshow]=useState(false);
    const [uid,setUid]=useState(undefined);
    const [options,setOptions]=useState([]);
    const [formObj]=ProForm.useForm();
    useEffect(async ()=>{
        const res_category=await getCategory();
        setOptions(res_category);
    },[])
    // 请求首页数据
    const getGoods=async function(arg){
            const response=await fetchGoods(arg);
            console.log('goods',response);
            return {
                data:response.data,
                success:true,
                total:response.meta.pagination.total
            }
        }
    // 商品上架与下架
    const handleIson=async function(uid){
            const res_ison=await isOn(uid);
            if(res_ison.status==undefined){
                message.success('操作成功')
            }
        }
    // 商品的推荐与未推荐
    const handleIsrecommend=async function(uid){
            const res_isrecommend=await isRecommend(uid);
            if(res_isrecommend.status==undefined){
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
        console.log('submit',value);
        const content={...value,category_id:value.category_id[1],cover:value.cover[0].key}
        console.log('content',content);
        const response_sub=await addGoods(content);
        if(response_sub.status==undefined){
            message.success('添加用户成功')
            //更新表格
            actionRef.current.reload();
        }else{
            message.error('添加用户失败')
        }
        // 关闭弹窗
        closeModal();
    }
    // 编辑输入内容后，设置details字段的value
    const setDetails=content=>formObj.setFieldsValue({'details':content})
    // 编辑用户-弹窗的展示与关闭
    const changeEditShow=function(flag,userid){
        setEditshow(flag);
        setUid(userid);
    }
    const columns=[
        {
        title:'封面图',
        dataIndex:'cover_url',
        hideInSearch:true,
        render:(_,record)=>{
            return <Image
            width={80}
            src={record.cover_url}
          />
        }},
        {
        title:'标题',
        dataIndex:'title'
        },
        {
        title:'价格',
        dataIndex:'price',
        hideInSearch:true,
        },
        {
        title:'库存',
        dataIndex:'stock',
        hideInSearch:true,
        },
        {
        title:'销量',
        dataIndex:'sales',
        hideInSearch:true,
        },
        {
        title:'是否上架',
        dataIndex:'is_on',
        valueType:'radioButton',
        valueEnum:{
            0:{text:'未上架'},
            1:{text:'已上架'}
        },
        render:(_,record) => <Switch checkedChildren="已上架" unCheckedChildren="未上架" defaultChecked={record.is_on===1} onChange={ () =>{handleIson(record.id)} } />
        },
        {
        title:'是否推荐',
        dataIndex:'is_recommend',
        valueType:'radioButton',
        valueEnum:{
            0:{text:'未推荐'},
            1:{text:'已推荐'}
        },
        render:(_,record) => <Switch checkedChildren="已推荐" unCheckedChildren="未推荐" defaultChecked={record.is_recommend===1} onChange={ () => {handleIsrecommend(record.id)} } />
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
            request={(params) => getGoods(params)}
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
            <ProForm onFinish={(value)=>{tableSubmit(value)}} form={formObj}>
                <ProForm.Item name="category_id" label="分类" placeholder="请输入分类" rules={[{required:true,message:"分类不能为空"}]}>
                    <Cascader options={options} placeholder="请选择分类" fieldNames={{label:'name',value:'id'}}/>
                </ProForm.Item>
                <ProFormText name="title" label="商品名" placeholder="请输入商品名" rules={[{required:true,message:"商品名不能为空"}]}>
                </ProFormText>
                <ProFormTextArea name="description" label="描述" placeholder="请输入描述" rules={[{required:true,message:"描述不能为空"}]}>
                </ProFormTextArea>
                <ProFormDigit name="price" label="价格" placeholder="请输入价格" min={1} max={10} rules={[{required:true,message:"价格不能为空"}]}/>
                <ProFormDigit name="stock" label="库存" placeholder="请输入库存" min={1} max={20} rules={[{required:true,message:"库存不能为空"}]}/>
                <ProForm.Item name="cover" label="上传"  action="upload.do" rules={[{required:true,message:"上传不能为空"}]}>
                    <OssUpload accept="image/*"/>
                </ProForm.Item>
                <ProForm.Item name="details" label="详情" placeholder="请输入详情" rules={[{required:true,message:"详情不能为空"}]}>
                    <div>
                    <EditorDemo setDetails={setDetails} />
                    </div>
                </ProForm.Item >
            </ProForm>
        </Modal>
        {editshow&&<Edit changeEditShow={changeEditShow} editshow={editshow} actionRef={actionRef} uid={uid}/>}
    </PageContainer>
    )
}
