import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/coupon`);

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

  const deleteCategory = async (couponId) => {
    console.log("couponId", couponId);
    try {
      setLoading(true)
      const res = await fetch(`${apiUrl}/api/coupon/${couponId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchCategories();
        message.success("Kupon başarıyla silindi");
      } else {
        message.error("Kupon silinemedi");
      }
    } catch (error) {
      console.error("deleteCategory -->", error);
    }finally{
      setLoading(false)
    }
  };

  const columns = [
    {
      title: "Kupon Listesi",
      dataIndex: "code",
      key: "code",
      render: (code) => <b>{code}</b>,
    },
    {
      title: "Kupon indirim oranı (%)",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (percent) => <span>% {percent}</span>,
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
      dataSource={dataSource.coupon}
      columns={columns}
      rowKey={(record) => record?._id}
      loading={loading}
    />
  );
};

export default CouponPage;
