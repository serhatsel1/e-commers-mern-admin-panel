import { Button, Form, Input, InputNumber, Space, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const CreateCouponPage = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/coupon`, {
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
      console.log("CreateCouponPage-->", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Kupon Adı"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen kuponun kodunu giriniz",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kupon indirim oranı (%)"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Lütfen indirim oranını giriniz",
            },
          ]}
        >
          <InputNumber />
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

export default CreateCouponPage;
