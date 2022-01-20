import React from 'react';
import { Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ossConfig } from '@/services/common';

export default class OssUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
      // 初始化，获取签名
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await ossConfig();
      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  // 文件上传 过程中 触发，直到上传完成
  onChange = ({ fileList }) => {
    const { onChange } = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
  };

  // 额外的上传参数
  getExtraData = file => {
    const { OSSData } = this.state;

    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  // 选择文件之后，上传文件之前执行
  beforeUpload = async file => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    const dir='react/'
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.key=OSSData.dir+dir+filename;
    file.url = OSSData.host+OSSData.dir + filename;

    return file;
  };

  render() {
    const { value,accept} = this.props;
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType:'picture',
      maxCount:1,
      accept:accept||''
    };
    return (
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    );
  }
}