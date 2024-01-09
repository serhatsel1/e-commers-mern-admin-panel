import { Button, Checkbox, Form, Input } from "antd";

const UpdateCategoryPage = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form
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
  );
};

export default UpdateCategoryPage;
