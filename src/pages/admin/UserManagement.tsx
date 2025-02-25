import { Table, Tag, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useUsersQuery,
} from "../../redux/features/users/usersApi";
import { toast } from "sonner";
import { TMessage } from "../../types";
type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
};

const UserManagement: React.FC = () => {
  const { data, isLoading, refetch } = useUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  if (isLoading) return <div>Loading...</div>;

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    try {
      await updateUserStatus({ userId, isActive });
      toast.success("User status updated");
      refetch();
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  const handleRoleChange = async (userId: string, role: "admin" | "user") => {
    try {
      await updateUserRole({ userId, role });
      toast.success("User role updated");
      refetch();
    } catch (error) {
      toast.error((error as TMessage).data.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 130,
      render: (createdAt: string) => {
        const date = new Date(createdAt);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 130,
      render: (role: "admin" | "user", record: TUser) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "admin",
                label: "Admin",
                onClick: () => handleRoleChange(record._id, "admin"),
              },
              {
                key: "user",
                label: "User",
                onClick: () => handleRoleChange(record._id, "user"),
              },
            ],
          }}
        >
          <Button style={{ width: "100%", textAlign: "left", textTransform: "capitalize" }}>
            {role} <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 140,
      render: (isActive: boolean, record: TUser) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "active",
                label: "Active",
                onClick: () => handleStatusChange(record._id, true),
              },
              {
                key: "inactive",
                label: "Inactive",
                onClick: () => handleStatusChange(record._id, false),
              },
            ],
          }}
        >
          <Button style={{ width: "100%", textAlign: "left" }}>
            <Tag color={isActive ? "green" : "red"}>
              {isActive ? "Active" : "Inactive"}
            </Tag>
            <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={data?.data || []}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default UserManagement;
