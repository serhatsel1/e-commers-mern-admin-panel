import { Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img
          style={{
            width: "50px",
            borderRadius: "50px",
          }}
          src={imgSrc}
          alt="avatar"
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/users`);

      if (res.ok) {
        const resData = await res.json();
        setDataSource(resData);
      } else {
        message.error("Kullanıcılar getirilemedi");
      }
    } catch (error) {
      console.log("fetchUsers -->", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  console.log(dataSource);
  // console.log(columns);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Table
      dataSource={dataSource.Users}
      columns={columns}
      rowKey={(record) => record?._id}
      loading={loading}
    />
  );
};

export default AdminUserPage;
