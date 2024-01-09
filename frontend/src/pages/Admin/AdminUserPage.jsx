import { Button, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
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
      console.error("fetchUsers -->", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteUser = async (userEmail) => {
    console.log("userEmail", userEmail);
    try {
      const res = await fetch(`${apiUrl}/api/users/${userEmail}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchUsers();
      } else {
        message.error("Kullanıcı silinemedi");
      }
    } catch (error) {
      console.error("deleteUser -->", error);
    }
  };

  console.log(dataSource);

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
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Kullanıcıyı sil"
          description="Kullanıcıyı silmek istediğinizden emin misiniz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.email)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

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
