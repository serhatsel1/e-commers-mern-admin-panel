import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/api/products`);

        if (!res.ok) {
          message.error("Ürün listesi yüklenirken bir hata oluştu");
          setDataSource([]);
        } else {
          const resData = await res.json();
          message.success("Ürünler başarılya listelendi");

          setDataSource(resData.products);
          console.log(resData.products);
        }
      } catch (error) {
        console.error("fetchAllProducts -->", error);
        message.error("Ürün listesi yüklenirken bir hata oluştu");
        setDataSource([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [apiUrl]);

  const deleteProduct = async (productId) => {
    try {
      console.log("productId", productId);
      const res = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      console.log(res);

      if (res.ok) {
        // Mevcut veriyi filtreleyerek güncellenmiş veriyi atayın
        setDataSource((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );

        message.success("Ürün başarıyla silindi!");
      } else {
        const errorData = await res.json();
        console.error(errorData.message);
        message.error("Ürün silme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.log(error);
      message.error("Ürün silme işlemi sırasında bir hata oluştu.");
    }
  };

  const columns = [
    {
      title: "Ürün görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img width={100} src={imgSrc[0]} alt="avatar" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      render: (text) => <b>{text.name}</b>,
    },

    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>${text.current.toFixed(2)}</span>,
    },

    {
      title: "İndirim oranı",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>%{text.discount || 0}</span>,
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
              navigate(`/admin/product/update/${record?._id}`);
            }}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record?._id}
      loading={loading}
    />
  );
};

export default ProductPage;
