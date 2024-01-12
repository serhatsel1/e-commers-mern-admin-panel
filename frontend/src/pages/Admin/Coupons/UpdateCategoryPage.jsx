import { Button, Form, Input, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateCategoryPage = () => {
  const params = useParams();
  const categoryId = params.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/categories/update/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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

  const fetchSingleCategory = useCallback(async () => {
    const res = await fetch(`${apiUrl}/api/categories/${categoryId}`);
    console.log(res);
    setLoading(true);
    try {
      if (!res.ok) {
        throw new Error("Veriler alınamadı");
      }
      const resData = await res.json();
      if (resData) {
        form.setFieldsValue({
          name: resData.singleCategory.name,
          img: resData.singleCategory.img,
        });
        console.log(resData);
      }
    } catch (error) {
      console.error("fetchUsers -->", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, categoryId, form]);
  useEffect(() => {
    fetchSingleCategory();
  }, [fetchSingleCategory]);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
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

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
