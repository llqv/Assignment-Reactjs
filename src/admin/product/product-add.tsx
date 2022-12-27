import {
    Button, Form,
    Input,
    InputNumber
} from 'antd';
import { SizeType } from "antd/es/config-provider/SizeContext";
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from "react";
import { Cropper, CropperImage, CropperPreview, CropperState, CropperTransitions } from 'react-advanced-cropper';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IProduct } from '../../interfaces/product';
import { useAddProductMutation } from '../../services/product';
import { uploadFile } from '../../utils/uploadfile';
import Toastify from 'toastify-js'
type Props = {};


const ProductAdd = (props: Props) => {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const [addProduct, result] = useAddProductMutation();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<IProduct>();
    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        let img = ""
        if (files) {
            img = await uploadFile({
                files: Object.values(files), options: infocrop, upload_preset: "Product_image"
            })
        }
        Toastify({
            text: "Add product successfully",
            duration: 3000,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                fontSize: "20px",
                background: "linear-gradient(to right, #00b09b, #96c93d",
            },
        }).showToast()
        addProduct({ ...data, img });
        navigate('/admin/products')
    };

    //Lay thong tin tu Cropper de set vao CropperImage
    const [state, setstate] = useState<CropperState | null>(null)
    const [image, setimage] = useState<CropperImage | null>(null)
    const [transition, settransition] = useState<CropperTransitions>()
    const [infocrop, setinfocrop] = useState<any>()

    //Khi ng dung upfile luu vao state nay
    const [files, setfiles] = useState<FileList | null>(null)
    //Theo doi file de set URL va luu vao preimg
    const [preimg, setpreimg] = useState<any>()
    useEffect(() => {
        if (files && files.length > 0) {
            setpreimg(URL.createObjectURL(files[0]));
        }
    }, [files])
    //Upfile

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
                <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <input
                            accept={"image/*"}
                            type={"file"}
                            onChange={(event) => { setfiles(event.target.files) }}
                        />
                        <div style={{ display: "flex" }}>
                            <Cropper
                                style={{ width: "350px", height: "350px" }}
                                onChange={(data) => {
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
                        </div>
                    </Form.Item>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} />
                <input type="text" {...register("price")} />
                <button>Add</button>
            </form> */}
        </div >
    );
};

export default ProductAdd;
