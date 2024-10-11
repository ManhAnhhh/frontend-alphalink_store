import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Message = () => {
  const tooltip = (content) => {
    return (
      <Tooltip className="in" id="tooltip-top">
        {content}
      </Tooltip>
    );
  };
  
  return (
    <div id="message">
      <div className="message-top d-flex mb-1 p-2 border-2 border-bottom align-items-center flex-wrap">
        <h5
          className="fw-bold mb-0 me-4"
          style={{ color: "var(--main-color)" }}
        >
          # Message
        </h5>
        <div className="mx-0 my-2 my-md-0 ms-sm-auto me-4 d-flex gap-3 align-items-center">
          <OverlayTrigger placement="top" overlay={tooltip("Notify")}>
            <i className="icon fa-solid fa-bell fa-xl cursor-pointer" />
          </OverlayTrigger>
          <input
            className="search-message outline-none rounded "
            type="text"
            placeholder="Find messages . . ."
          />

          <OverlayTrigger placement="left" overlay={tooltip("Help")}>
            <i className="icon fa-regular fa-circle-question fa-xl cursor-pointer" />
          </OverlayTrigger>
        </div>
      </div>
      <div className="message-bottom rounded position-relative box-chat">
        <div
          id="box-chat"
          className="wrapper-items-chat overflow-y-scroll d-flex flex-column "
        >
          <div className="items-chat">
            <div className="divider d-flex align-items-center gap-2">
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
              <div className="mt-1 text-nowrap">Today</div>
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Ngô Mạnh Anh</span>
                  <span className="text-body-tertiary fs-12"> 20:56</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Linhhh oiiii
                </div>
              </div>
            </div>
          </div>
          <div className="items-chat">
            <div className="divider d-flex align-items-center gap-2">
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
              <div className="mt-1 text-nowrap">29/05/2024</div>
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Nguyễn Đăng Đức</span>
                  <span className="text-body-tertiary fs-12"> 20:56</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  10-6 tới. Doanh nghiệp tổ chức đi du lịch mọi người chú ý nhé.
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Nguyễn Đăng Đức</span>
                  <span className="text-body-tertiary fs-12"> 20:57</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Mọi người sẽ được nghỉ 4 ngày nha.
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Ngô Mạnh Anh</span>
                  <span className="text-body-tertiary fs-12"> 20:58</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Okok.
                </div>
              </div>
            </div>
          </div>
          <div className="items-chat">
            <div className="divider d-flex align-items-center gap-2">
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
              <div className="mt-1 text-nowrap">21/05/2024</div>
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Ngô Mạnh Anh</span>
                  <span className="text-body-tertiary fs-12"> 8:15</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Cho tôi bản kế hoạch tuần này của của công ty với.
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Nguyễn Đăng Đức</span>
                  <span className="text-body-tertiary fs-12"> 8:20</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Đợi tý.
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Nguyễn Đăng Đức</span>
                  <span className="text-body-tertiary fs-12"> 8:21</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  KeHoachTuan10_2024.docx
                </div>
              </div>
            </div>
          </div>
          <div className="items-chat">
            <div className="divider d-flex align-items-center gap-2">
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
              <div className="mt-1 text-nowrap">Ngày 20/05/2024</div>
              <div className="line bg-dark opacity-25 mt-3 mb-2" />
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Ngô Mạnh Anh</span>
                  <span className="text-body-tertiary fs-12"> 7:30</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Chào mọi người, hôm nay chúng ta có cuộc họp để thảo luận về
                  dự án mới. Ai cũng đã nhận được tài liệu chưa?
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Nguyễn Đăng Đức</span>
                  <span className="text-body-tertiary fs-12"> 7:31</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Vâng, tôi đã xem qua rồi. Tôi nghĩ chúng ta nên bắt đầu bằng
                  việc phân chia công việc. Ai sẽ chịu trách nhiệm chính?
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start p-2 item-chat gap-2">
              <div>
                <img src="/img/linhh.jpg" alt="true" />
              </div>
              <div>
                <div>
                  <span className="fw-bold">Nguyễn Anh Đức</span>
                  <span className="text-body-tertiary fs-12"> 7:31</span>
                </div>
                <div className="border-start border-2 border-info ps-1">
                  Tôi có thể đảm nhận phần nghiên cứu thị trường. Tôi đã có một
                  số dữ liệu từ dự án trước, có thể áp dụng được cho lần này.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "var(--light-color)",
            borderRadius: "var(--radius-m)",
          }}
          className="send-message d-flex align-items-center position-absolute bottom-0 start-0 end-0 p-2 border-1 border-top"
        >
          <div className="me-2">
            <img src="/img/linhh.jpg" alt="true" />
          </div>
          <div>
            <input type="file" id="sendFile" className="d-none" />
            <label htmlFor="sendFile">
              <div className="wrapper-message-icon">
                <i className="icon fa-regular fa-image fa-xl icon" />
              </div>
            </label>
          </div>
          <div className="wrapper-message-icon">
            <i className="fa-solid fa-paperclip icon"></i>
          </div>
          <div className="flex-grow-1 position-relative mx-2">
            <input
              className="w-100 outline-none rounded-pill border border-1 px-2 py-2"
              type="text"
              placeholder="Aa"
            />
          </div>
          <div className="wrapper-message-icon">
            <i className="icon fa-solid fa-thumbs-up fa-xl icon" />
          </div>
          <div className="wrapper-message-icon heart-icon">
            <i className="icon fa-solid fa-heart fa-xl icon " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
