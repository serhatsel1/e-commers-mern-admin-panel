import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UpdateCouponPage = () => {
  const params = useParams();
  const couponId = params.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/coupon/${couponId}`, {
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
  // console.log("couponId", couponId);

  const fetchSingleCoupon = useCallback(async () => {
    const res = await fetch(`${apiUrl}/api/coupon/${couponId}`);
    console.log(res);
    setLoading(true);
    try {
      if (!res.ok) {
        throw new Error("Veriler alınamadı");
      }
      const resData = await res.json();
      console.log("resData",resData)
      if (resData) {
        form.setFieldsValue({
          code: resData.singlecoupon.code,
          discountPercent: resData.singlecoupon.discountPercent,
        });
        console.log(resData);
      }
    } catch (error) {
      console.error("fetchUsers -->", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, couponId, form]);
  useEffect(() => {
    fetchSingleCoupon();
  }, [fetchSingleCoupon]);

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
          label="Kupon Kodu"
          name="code"
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
          label="Kupon indirim oranı(%)"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Lütfen görseli yükleyin",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
