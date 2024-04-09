import { useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import "../formRemind/style.css";
import dayjs from "dayjs";
import { useEffect } from "react";

const disabledDate = (current) => {
  return current && current < dayjs().startOf("day");
};

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

function FormRemind(props) {
  const [form] = Form.useForm();
  const [inputListContent, setInputListContent] = useState("");
  const [inputListDate, setInputListDate] = useState(null);

  const { handleAddList } = props;

  const handleChangeContentRemind = (event) => {
    setInputListContent(event.target.value);
  };

  const handleDateChange = (date) => {
    setInputListDate(date);
  };

  const handleSubmitForm = () => {
    handleAddList(inputListDate, inputListContent);
    setInputListContent("");
    setInputListDate(null);
    form.resetFields();
  };
  useEffect(() => {
    setInputListContent("");
    setInputListDate(null);
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form onFinish={handleSubmitForm} form={form}>
        <Form.Item
          label="Nội Dung"
          name="content"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập nội dung",
            },
          ]}
        >
          <Input
            placeholder="Mời nhập nội dung của ngày"
            value={inputListContent}
            onChange={handleChangeContentRemind}
          />
        </Form.Item>
        <div className="content-left-footer">
          <Form.Item
            label="Ngày Nhắc"
            name="dayremind"
            rules={[
              {
                required: true,
                message: "Bạn chưa chọn ngày nhắc",
              },
            ]}
          >
            <DatePicker
              placeholder="DD/MM/YYYY"
              disabledDate={disabledDate}
              format={dateFormatList[2]}
              value={inputListDate}
              onChange={handleDateChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu Ngày
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default FormRemind;
