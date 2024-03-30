import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ProductUpdate.scss";
import axios from "axios";
import { Button, notification, Form, Input } from "antd";
const { TextArea } = Input;
const key = "updatable";
async function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsDataURL(file);
  });
}

const ProductUpdate = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [product, setProduct] = useState([]);

  const [api, contextHolder] = notification.useNotification();
  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.post("/api/admin/product/update", {
        SP_id: id,
      });
      console.log(response.data);
      if (response.data) {
        form.setFieldsValue({
          SP_ten: response.data.product[0].SP_ten,
          SP_soLuong: response.data.product[0].SP_soLuong,
          SP_HSD: response.data.product[0].SP_HSD,
          SP_NSX: response.data.product[0].SP_NSX,
          G_thoiGia: response.data.price[0].G_thoiGia,
          SP_trongLuong: response.data.product[0].SP_trongLuong,
          SP_donViTinh: response.data.product[0].SP_donViTinh,
          SP_moTa: response.data.product[0].SP_moTa,
          DMSP_ten: response.data.category[0].DMSP_ten,
        });
      }
    })();
  }, []);

  function formatDate(dateObject) {
    const date = new Date(dateObject);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits, pad with 0 if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const updateProduct = async (values) => {
    try {
      const response = await axios.put("/api/admin/product/update", {
        SP_id: id,
        SP_ten: values.SP_ten,
        SP_soLuong: values.SP_soLuong,
        SP_donViTinh: values.SP_donViTinh,
        SP_NSX: values.SP_NSX,
        SP_HSD: values.SP_HSD,
        SP_trongLuong: values.SP_trongLuong,
        SP_moTa: values.SP_moTa,
        G_thoiGia: values.G_thoiGia,
      });
      console.log(response);
      if (response.data) {
        api.open({
          key,
          message: "Cập nhật thông tin thành công",
        });
        navigation("/product");
      } else {
        api.open({
          key,
          message: "Cập nhật thông tin thất bại",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="container-upload pb-4 mt-4">
      {contextHolder}
      <div className="title-primary text-center">Cập nhật sản phẩm</div>
      <div className="mt-4">
        <Form
          className="col-sm-11 mx-auto"
          form={form}
          name="basic"
          layout="vertical"
          style={{}}
          initialValues={{
            remember: true,
          }}
          onFinish={updateProduct}
        >
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <Form.Item
              label="Tên sản phẩm"
              name="SP_ten"
              className="col-sm-5"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống tên!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              className="col-sm-5"
              label="Danh mục sản phẩm"
              name="DMSP_ten"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống danh mục sản phẩm!",
                },
              ]}
            >
              <Input disabled size="large" />
            </Form.Item>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <Form.Item
              label="Giá bán"
              name="G_thoiGia"
              className="col-sm-5"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống giá bán!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="SP_soLuong"
              className="col-sm-5"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống số lượng!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <Form.Item
              label="Ngày sản xuất"
              name="SP_NSX"
              className="col-sm-5"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống ngày sản xuất!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Hạn sử dụng"
              name="SP_HSD"
              className="col-sm-5"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống hạn sử dụng!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <Form.Item
              label="Trọng lượng"
              name="SP_trongLuong"
              className="col-sm-5"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống trọng lượng!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Đơn vị tính"
              name="SP_donViTinh"
              className="col-sm-5"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không để trống đơn vị tính!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <Form.Item
            label="Mô tả"
            name="SP_moTa"
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống mô tả!",
              },
            ]}
          >
            <TextArea size="large" rows={3} />
          </Form.Item>
          <Form.Item>
            <div className="text-end">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="btn-upload-product"
              >
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ProductUpdate;
