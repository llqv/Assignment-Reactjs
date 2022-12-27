import {
    Button, Form,
    Input,
    InputNumber
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Cropper, CropperImage, CropperPreview, CropperState, CropperTransitions } from 'react-advanced-cropper';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
import { useGetProductQuery, useUpdateProductMutation } from "../../services/product";
import { uploadFile } from "../../utils/uploadfile";



type Props = {};

const ProductEdit = (props: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<IProduct>();
    const [updateProduct, result] = useUpdateProductMutation()
    const { id } = useParams();
    const { data } = useGetProductQuery(id)
    //Lay thong tin tu Cropper de set vao CropperImage
    const [state, setstate] = useState<CropperState | null>(null)
    const [image, setimage] = useState<CropperImage | null>(null)
    const [transition, settransition] = useState<CropperTransitions>()
    const [infocrop, setinfocrop] = useState<any>()

    //Khi ng dung upfile luu vao state nay
    const [files, setfiles] = useState<FileList | null>(null)
    //Theo doi file de set URL va luu vao preimg
    const [preimg, setpreimg] = useState<any>()
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    useEffect(() => {
        if (data) {
            reset({
                id: data.id,
                name: data.name,
                price: data.price,
                quantity: data.quantity,
                desc: data.desc
            })
            setpreimg(data.img)
        }
    }, [data])
    useEffect(() => {
        if (files && files.length > 0) {
            setpreimg(URL.createObjectURL(files[0]));
        }
    }, [files])
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        let img = preimg
        if (files) {
            img = await uploadFile({
                files: Object.values(files), options: infocrop, upload_preset: "Product_image"
            })
        }
        updateProduct({ ...data, img });
        navigate('/admin/products')
    };


    return (
        <div>
            <Form onFinish={handleSubmit(onSubmit)}
                name="validate_other"
                {...formItemLayout}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                }}
            >
                <Controller name="name" control={control} render={({ field }) =>
                    <Form.Item label="Name">
                        <Input  {...field} />
                    </Form.Item>} />
                <Controller name="price" control={control} render={({ field }) =>
                    <Form.Item label="Price">
                        <InputNumber  {...field} />
                    </Form.Item>} />
                <Controller name="quantity" control={control} render={({ field }) =>
                    <Form.Item label="Quantity">
                        <InputNumber  {...field} />
                    </Form.Item>} />
                <Controller name="desc" control={control} render={({ field }) =>
                    <Form.Item label="desc">
                        <TextArea rows={4}  {...field} />
                    </Form.Item>} />

                {/*UpLoad Image */}
                <Controller name="img" control={control} render={({ field }) =>
                    <Form.Item label="Image">
                        <Form.Item name="img" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <input
                                {...field}
                                accept={"image/*"}
                                type={"file"}
                                onChange={(event) => { setfiles(event.target.files) }}
                            />
                            {files ? <div style={{ display: "flex" }}>
                                <Cropper
                                    style={{ width: "350px", height: "350px" }}
                                    onChange={
                                        (data) => {
                                            setstate(data.getState());
                                            setimage(data.getImage());
                                            settransition(data.getTransitions());
                                            setinfocrop(data.getCoordinates());
                                        }}
                                    src={preimg}
                                    stencilProps={{
                                        grid: true
                                    }}
                                />
                                <CropperPreview
                                    style={{ width: "350px", height: "350px" }}
                                    image={image}
                                    state={state}
                                    transitions={transition}
                                />
                            </div> : <img src={preimg} />}

                        </Form.Item>
                    </Form.Item>} />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
}
export default ProductEdit;
