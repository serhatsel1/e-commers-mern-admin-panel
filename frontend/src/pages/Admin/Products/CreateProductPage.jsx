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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/categories`);

        if (res.ok) {
          const resData = await res.json();
          setCategories(resData.categories);
        } else {
          message.error("Kullanıcılar getirilemedi");
        }
      } catch (error) {
        console.error("fetchUsers -->", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);
  // console.log(categories);

  const onFinish = async (values) => {
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const colors = values.colors.split("\n").map((link) => link.trim());
    const sizes = values.sizes.split("\n").map((link) => link.trim());

    try {
      // setLoading(true);
      const res = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          img: imgLinks,
          sizes,
          colors,
        }),
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
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ürün Fiyatı"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını giriniz",
            },
          ]}
        >
          <InputNumber />
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
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="İndirim Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen ürün açıklaması giriniz",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ background: "white" }} />
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
