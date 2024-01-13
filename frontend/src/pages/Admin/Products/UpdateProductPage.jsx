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
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateProductPage = () => {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const imgLinks = values.img.split("\n").map((link) => link.trim());
      const colors = values.colors.split("\n").map((link) => link.trim());
      const sizes = values.sizes.split("\n").map((link) => link.trim());
      const res = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, img: imgLinks, colors, sizes }),
      });
      console.log("values-->", values);
      if (res.ok) {
        message.success("Başarıyla güncellendi");
        navigate(-1);
      } else {
        message.error("Güncelleme başarısız");
      }
    } catch (error) {
      console.log("onFinish-->", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log("categoryId", categoryId);

  const fetchSingleProduct = useCallback(async () => {
    const res = await fetch(`${apiUrl}/api/products/${productId}`);
    console.log(res);
    setLoading(true);
    try {
      if (!res.ok) {
        throw new Error("Veriler alınamadı");
      }
      const resData = await res.json();
      console.log("resData", resData);

      if (resData) {
        form.setFieldsValue({
          name: resData.singleProduct.name,
          current: resData.singleProduct.price.current,
          discount: resData.singleProduct.price.discount,
          description: resData.singleProduct.description,
          img: resData.singleProduct.img.join("\n"),
          colors: resData.singleProduct.colors.join("\n"),
          sizes: resData.singleProduct.sizes.join("\n"),
          // category: resData.singleProduct.category.name,

          // category: resData.singleProduct.category,
        });
        console.log(resData);
      }
    } catch (error) {
      console.error("fetchUsers -->", error);
    } finally {
      setLoading(false);
    }
  }, [productId, form]);
  useEffect(() => {
    fetchSingleProduct();
  }, [fetchSingleProduct]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/categories`);

        if (res.ok) {
          const resData = await res.json();
          setCategories(resData.categories);
        } else {
          message.error("Ürün getirilemedi");
        }
      } catch (error) {
        console.error("fetchUsers -->", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);
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
            Gücelle
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

export default UpdateProductPage;
