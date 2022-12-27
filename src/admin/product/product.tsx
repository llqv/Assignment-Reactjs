import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { useParams } from 'react-router-dom';
import { useGetProductsQuery, useRemoveProductMutation } from "../../services/product";


const { Column } = Table;
type Props = {};

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Image",
        dataIndex: "img",
        key: "img",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
    },
];

const confirm = (id: number) => {
    message.info("Delete Successfully");
};
const Product = (props: Props) => {
    const { id } = useParams<{ id: any }>()
    const { data: products = [], isLoading, error } = useGetProductsQuery();
    const [deleteProduct, result] = useRemoveProductMutation()



    const getData = () => {
        return products.map((product) => ({
            key: product.id,
            name: product.name,
            img: product.img,
            price: product.price,
            quantity: product.quantity,
            desc: product.desc
        }));
    };
    // if (error) return <div>Error</div>;
    // if (isLoading) return <div>...Loading</div>;
    return (
        <div>
            <Table dataSource={getData()}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Image" render={(product) => <img style={{ width: "150px", height: "100px", objectFit: "cover" }} src={product.img} />} key="img" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
                <Column title="Desc" dataIndex="desc" key="desc" />
                <Column
                    title="Action"
                    key="action"
                    render={(product) => {
                        return (
                            <Space size="middle">
                                <Popconfirm
                                    title="Do you want to delete?"
                                    placement="top"
                                    onConfirm={() => {
                                        deleteProduct(product.key)
                                        confirm(product.key)
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteTwoTone />
                                </Popconfirm>
                                <Button type="link" href={`/admin/products/${product.key}/edit`}>
                                    <EditOutlined />
                                </Button>
                            </Space>
                        );
                    }}
                ></Column>
            </Table >
            {/* <Link to="/admin/products/add">Add</Link>
            {data.map((product: IProduct) => (
                <div key={product.id}>{product.name}
                    <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
                    <button onClick={() => deleteProduct(product.id)}>DELETE</button>
                </div>
            ))} */}
        </div >
    );
}

export default Product;
