import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/categories`);

      if (res.ok) {
        const resData = await res.json();
        setDataSource(resData);
      } else {
        message.error("Kullanıcılar getirilemedi");
      }
    } catch (error) {
      console.error("fetchUsers -->", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCategory = async (categoryId) => {
    console.log("category", categoryId);
    try {
      const res = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchCategories();
      } else {
        message.error("Kullanıcı silinemedi");
      }
    } catch (error) {
      console.error("deleteCategory -->", error);
    }
  };


  const columns = [
    {
      title: "Kategori görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img width={100} src={imgSrc} alt="avatar" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/admin/categories/update/${record?._id}`);
            }}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Table
      dataSource={dataSource.categories}
      columns={columns}
      rowKey={(record) => record?._id}
      loading={loading}
    />
  );
};

export default CategoryPage;
