import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Upload, Modal, Progress, Spin, message } from 'antd';
import { UploadOutlined, VideoCameraOutlined, DownloadOutlined, ShareAltOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import './Home.css';

const { Title, Paragraph } = Typography;

const AIVideoEdit = () => {
  const [aiUploading, setAiUploading] = useState(false);
  const [aiUploadProgress, setAiUploadProgress] = useState(0);
  const [aiVideoFile, setAiVideoFile] = useState(null);
  const [aiResultReady, setAiResultReady] = useState(false);

  // 图片上传相关状态
  const [imgFileList, setImgFileList] = useState([]);
  const [imgPreview, setImgPreview] = useState({ visible: false, url: '' });

  useEffect(() => {
    let timer;
    if (aiUploading && aiUploadProgress < 100) {
      timer = setInterval(() => {
        setAiUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setAiUploading(false);
            setTimeout(() => setAiResultReady(true), 800);
            return 100;
          }
          return prev + Math.floor(Math.random() * 10 + 5);
        });
      }, 400);
    }
    return () => clearInterval(timer);
  }, [aiUploading, aiUploadProgress]);

  const beforeUpload = (file) => {
    setAiVideoFile(file);
    setAiUploadProgress(0);
    setAiResultReady(false);
    setAiUploading(true);
    return false;
  };

  const handleReset = () => {
    setAiVideoFile(null);
    setAiUploadProgress(0);
    setAiResultReady(false);
    setAiUploading(false);
  };

  // 处理图片预览
  const handleImgPreview = async (file) => {
    setImgPreview({ visible: true, url: file.url || file.thumbUrl });
  };
  const handleImgPreviewCancel = () => setImgPreview({ visible: false, url: '' });

  // 图片上传变更
  const handleImgChange = ({ fileList }) => setImgFileList(fileList);

  return (
    <div className="ai-video-edit-page home-page">
      <div className="container">
        <div style={{ maxWidth: 900, margin: '0 auto', background: 'rgba(255,255,255,0.95)', borderRadius: 16, boxShadow: '0 8px 32px rgba(63,81,181,0.08)', padding: 40, marginTop: 48 }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: 16 }}>
            <VideoCameraOutlined style={{ color: '#3F51B5', marginRight: 12 }} />
            AI剪辑视频
          </Title>
          <Paragraph style={{ textAlign: 'center', color: '#666', marginBottom: 32 }}>
            智能识别精彩片段、自动配乐、字幕生成、风格滤镜等，轻松生成高质量短视频，助力文化传播与个人创作。
          </Paragraph>
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={14}>
              {/* 新增图片上传区域 */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>上传图片（可选，支持多张）：</div>
                <Upload
                  listType="picture-card"
                  fileList={imgFileList}
                  onPreview={handleImgPreview}
                  onChange={handleImgChange}
                  beforeUpload={() => false}
                  multiple
                >
                  {imgFileList.length >= 8 ? null : <div><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>}
                </Upload>
                <Modal open={imgPreview.visible} footer={null} onCancel={handleImgPreviewCancel}>
                  <img alt="预览" style={{ width: '100%' }} src={imgPreview.url} />
                </Modal>
              </div>
              {!aiResultReady && (
                <div style={{ textAlign: 'center', padding: 24 }}>
                  <Upload.Dragger
                    name="video"
                    accept="video/*"
                    beforeUpload={beforeUpload}
                    showUploadList={aiVideoFile ? [{ name: aiVideoFile.name }] : false}
                    disabled={aiUploading || aiResultReady}
                    style={{ marginBottom: 24 }}
                  >
                    <p className="ant-upload-drag-icon">
                      <VideoCameraOutlined style={{ fontSize: 40, color: '#3F51B5' }} />
                    </p>
                    <p className="ant-upload-text">点击或拖拽上传视频文件</p>
                    <p className="ant-upload-hint">支持mp4、mov等主流格式，单文件不超过200MB</p>
                  </Upload.Dragger>
                  {aiUploading && (
                    <div style={{ marginTop: 24 }}>
                      <Spin spinning={aiUploading} tip="AI智能分析中...">
                        <Progress percent={aiUploadProgress} status={aiUploadProgress < 100 ? 'active' : 'success'} />
                      </Spin>
                    </div>
                  )}
                </div>
              )}
              {aiResultReady && (
                <div style={{ textAlign: 'center', padding: 24 }}>
                  <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 48 }} />
                  <div style={{ margin: '16px 0 8px', fontSize: 18, fontWeight: 500 }}>AI剪辑完成！</div>
                  <div style={{ marginBottom: 16, color: '#888' }}>以下为智能剪辑片段预览：</div>
                  <Row gutter={[16, 16]} justify="center">
                    <Col span={8}>
                      <div className="ai-clip-thumb">
                        <img src="/images/retouch_2025071012240330.jpg" alt="片段1" style={{ width: '100%', borderRadius: 8 }} />
                        <div>片段1：开场精彩</div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="ai-clip-thumb">
                        <img src="/images/retouch_2025071012240355.jpg" alt="片段2" style={{ width: '100%', borderRadius: 8 }} />
                        <div>片段2：高光时刻</div>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="ai-clip-thumb">
                        <img src="/images/retouch_2025071012240377.jpg" alt="片段3" style={{ width: '100%', borderRadius: 8 }} />
                        <div>片段3：结尾总结</div>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ margin: '24px 0 8px' }}>
                    <Button type="primary" icon={<DownloadOutlined />} style={{ marginRight: 16 }}>
                      下载剪辑视频
                    </Button>
                    <Button icon={<ShareAltOutlined />}>
                      分享到社交平台
                    </Button>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Button type="link" onClick={handleReset}>返回继续剪辑</Button>
                  </div>
                </div>
              )}
            </Col>
            <Col xs={24} md={10}>
              <div className="ai-video-image-container">
                <img src="/images/retouch_2025070917094884.png" alt="AI剪辑视频" className="ai-video-image" />
                <div className="ai-video-image-text">AI让视频创作更简单</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AIVideoEdit; 