import { Spin, Table, message } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Müşteri Email",
      dataIndex: "receipt_email",
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount",
      render: (record) => <b>${(record / 100).toFixed(2)}</b>,
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.stripe.com/v1/payment_intents`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
          },
        });

        if (res.ok) {
          const { data } = await res.json();
          setDataSource(data);
        } else {
          message.error("Kategoriler getirilemedi");
        }
      } catch (error) {
        console.error("fetchCategories -->", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [MY_STRIPE_SECRET_KEY]);
  console.log(dataSource);
  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record?.id}
        loading={loading}
      />
    </Spin>
  );
};

export default OrderPage;
