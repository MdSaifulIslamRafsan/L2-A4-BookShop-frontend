import React from "react";
import { Table, Button, Space, Modal } from "antd";
import { useGetProductsQuery } from "../../redux/features/Products/ProductsApi";
import { useDeleteProductMutation } from "../../redux/features/Products/ProductsApi";
import { TMessage, TProduct } from "../../types";
import { toast } from "sonner";
import TableLoading from "../../component/Loading/TableLoading";
import { Link } from "react-router-dom";

const ProductManagement: React.FC = () => {
    const { data, isLoading, refetch } = useGetProductsQuery(undefined);
    const [deleteProduct] = useDeleteProductMutation();

    if (isLoading) {
        return <TableLoading/>;
    }

    const handleDelete = async (productId: string) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Do you really want to delete this product? This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: async () => {
                try {
                    const res = await deleteProduct(productId);
                    if (res?.data?.success) {
                        toast.success(res?.data?.message);
                        refetch();
                    } else {
                        toast.error(res?.data?.message);
                    }
                } catch (error) {
                    toast.error((error as TMessage)?.data?.message);
                }
            },
        });
    };



    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: string) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: TProduct) => (
                <Space>
                    <Link to={`/dashboard/update-product/${record._id}`}><Button type="primary">Update</Button></Link>
                    <Button type="primary" danger onClick={() => handleDelete(record._id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Table<TProduct>
                columns={columns}
                dataSource={data?.data || []}
                rowKey="_id"
                bordered
                pagination={{ pageSize: 5 }}
                scroll={{ x: "max-content" }}
            />
        </Space>
    );
};

export default ProductManagement;