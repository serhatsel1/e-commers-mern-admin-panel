import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const CreateProductPage = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // setLoading(true);
      const res = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        message.success("Ürün başarıyla oluşturuldu");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Ürün Adı"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen ürün adını giriniz",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Fiyatı"
          name="price"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını giriniz",
            },
          ]}
        >
          ₺<InputNumber />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen ürün indirim oranı giriniz",
            },
          ]}
        >
          %<InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün görselleri(Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 ürün görsel linki yükleyin",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni satıra yazın"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün renkleri(RGB Kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 ürün rengi girin",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir renk RGB kodunu yeni satıra yazın"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Bedenleri"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün beden ölçüsü girin",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir ürün beden ölçüsünü yeni satıra yazın"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Kategori"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün kategorisi girin",
            },
          ]}
        >
          <Select>
            <Select.Option value="Akıllı Telefon" key={"Akıllı Telefon"}>
              Akıllı Telefon
            </Select.Option>
          </Select>
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

export default CreateProductPage;
