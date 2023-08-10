import { useState, useEffect } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";
import { socket } from "../../socket";
import { apiGetUserProfile, getConversations } from "../../utils/axios";
const profile = JSON.parse(localStorage.getItem("profile"));
const usernames = [
  "user64ba3e01bd98d6d275fb345e",
  "user64b40570cb87275d8481e993",
].filter((x) => x !== profile?.username);
export default function Chat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    socket.auth = {
      Authorization: localStorage.getItem("access_token"),
    };
    socket.on("connect_error", (err) => {
      console.log(err.data);
      alert(err.message);
    });
    socket.on("disconnect", (err) => {
      console.log(err);
      // dispath logout
      // toash lên
      alert("IO server disconect ");
    });

    socket.on("s_response_message", (data) => {
      setMessages((messages) => [
        ...messages,
        { content: data.content, isSender: false },
      ]);
    });
    socket.on("s_user_not_online", (data) => {
      console.log(data);
      alert("user kia hien ko online ");
      return;
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (receiver) {
      getConversations(receiver).then((response) => {
        const data = response?.data.result?.conversations;
        let conversations = [];
        if (data) {
          conversations = data.map((conversation) => {
            return {
              ...conversation,
              isSender: conversation.sender_id === profile._id,
            };
          });
          setMessages(conversations);
        }
      });
    }
  }, [receiver]);

  const send = (e) => {
    e.preventDefault();
    if (!receiver) {
      alert("phải chọn 1 người để nhắn tin");
      return;
    }
    socket.emit("c_send_message", {
      sender_id: profile._id,
      receiver_id: receiver,
      content: value,
    });
    setMessages((messages) => [
      ...messages,
      { content: value, isSender: true },
    ]);
    setValue("");
  };
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const getProfile = (username) => {
    apiGetUserProfile(username).then((response) => {
      setReceiver(response.data.result._id);
    });
  };

  return (
    <div className="w-full h-screen bg-red-100">
      <div className="grid grid-cols-12  h-screen">
        <div className="col-span-3">
          <Link
            to={"/"}
            className="px-2 py-2 block bg-cyan-500 text-white rounded-sm shadow my-2"
          >
            Quay ve trang chu
          </Link>
          <p className="px-2 py-2 block bg-cyan-500 text-white rounded-sm shadow my-2">
            Bạn là {profile._id}
          </p>
          <p className="px-2 py-2 block bg-cyan-500 text-white rounded-sm shadow my-2">
            Bạn sẽ chat với <strong>{receiver}</strong>
          </p>
          <div>
            Danh sach những users có sẵn
            <br />
            {usernames.map((username, index) => {
              return (
                <div key={index}>
                  <button
                    className="bg-gray-200 text-black py-2 px-4 rounded-sm shadow-sm"
                    onClick={() => getProfile(username)}
                  >
                    <div className="flex justify-center items-center gap-2">
                      <span>{username} </span>
                      <span className="h-2 w-2 block bg-green-500 rounded-full"></span>
                    </div>
                  </button>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-9 conversation-zone">
          <div className="wrapper-message w-full h-96 max-h-[700px] relative bg-white overflow-auto">
            <div className="">
              {messages.map((message, index) => {
                return (
                  <p
                    key={index}
                    className={
                      message.isSender ? "message-right  " : "message-left  "
                    }
                    style={{ color: "black" }}
                  >
                    {message.content}
                  </p>
                );
              })}
            </div>
          </div>
          <form onSubmit={send} className="bg-slate-500 px-2 py-3 ">
            <input
              className="text-black py-2 px-5  rounded-sm outline-none shadow-sm"
              type="text"
              placeholder="nhap vao tin nhan"
              onChange={handleInputChange}
              value={value}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-5 py-2 rounded-sm shadow-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
