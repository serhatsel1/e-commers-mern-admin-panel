import { Button, Form, Input, Space, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const CreateCategoryPage = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      console.log(res);
      if (res.ok) {
        form.resetFields();
        message.success("Ürün başarıyla oluşturuldu !");
      }
    } catch (error) {
      message.error("Ürün oluşturulurken bir hatayla karşılaşıldı ");
      console.log("CreateCategoryPage-->", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Kategori Adı"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen kategorinin adını giriniz",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori görseli"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen görseli yükleyin",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Space size={"large"}>
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
          <Button
            type="primary"
            style={{ background: "gray", borderColor: "gray" }}
            htmlType="submit"
            onClick={() => navigate(-1)}
          >
            Ürün listesine Dön
          </Button>
        </Space>
      </Form>
    </Spin>
  );
};

export default CreateCategoryPage;
