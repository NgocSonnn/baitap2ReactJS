import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons";
import "../listRemind/style.css";
import { message } from "antd";

const ListRemind = (props) => {
  const { list, handleDeleteRemind } = props;
  const { contentRemind, dateRemind, id } = list;
  const formattedDate = dayjs(dateRemind).format("DD/MM/YYYY");

  const [messageApi, contextHolder] = message.useMessage();
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const currentDate = dayjs().format("DD/MM/YYYY");
    if (formattedDate === currentDate) {
      setIsToday(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAlert = () => {
    if (isToday) {
      messageApi.open({
        type: "warning",
        content: contentRemind,
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="content-right-list-padding">
        <div
          className={`content-right-list ${isToday ? "today" : ""}`}
          onClick={handleAlert}
        >
          <div className="content-right-list__header">
            <div className="content-right-list__header__date">
              Ngày: {formattedDate}
            </div>
            <button
              className="content-right-list__header__btn"
              onClick={() => handleDeleteRemind(id)}
            >
              <CloseOutlined />
            </button>
          </div>
          <div className="content-right-list__content">{contentRemind}</div>
        </div>
      </div>
    </div>
  );
};

export default ListRemind;
