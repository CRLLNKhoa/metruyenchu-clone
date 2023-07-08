import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Popover,
  Row,
  Text,
} from "@nextui-org/react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiMedalFill } from "react-icons/ri";
import { BsArrowUpCircle, BsFillBellFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { TbPassword } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import * as AuthService from "services/authService";
import { resetAuth, updateAuth } from "redux/slice/authSlice";
import jwt_decode from "jwt-decode";
import { isJsonString, themeColor } from "../../untils";
import { FaUserCircle } from "react-icons/fa";
import { TbCandy } from "react-icons/tb";
import { IoMdFlower } from "react-icons/io";
import { useMutationHooks } from "hooks/useMutationHook";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from 'use-debounce';
import * as StoryService from "services/storyService"

export default function Header() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    cfPassword: "",
  });

  // NOTE Login
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const mutationLogin = useMutationHooks((data) => AuthService.loginUser(data));
  const { data: dataLogin } = mutationLogin;
  const handleLogin = () => {
    mutationLogin.mutate({
      email: inputData.email,
      password: inputData.password,
    });
  };

  useEffect(() => {
    if (dataLogin?.status === "OK") {
      toast.success("Đăng nhập thành công!");
      localStorage.setItem(
        "access_token",
        JSON.stringify(dataLogin?.access_token)
      );
      if (dataLogin?.access_token) {
        const decoded = jwt_decode(dataLogin?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, dataLogin?.access_token);
        }
      }
      closeHandler();
    }
    if (dataLogin?.status === "ERR") {
      toast.error(dataLogin.message);
    }
  }, [dataLogin]);

  // NOTE SIGNUP

  const [visibleR, setVisibleR] = useState(false);
  const handlerR = () => setVisibleR(true);

  const closeHandlerR = () => {
    setVisibleR(false);
  };

  const mutationSignUp = useMutationHooks((data) =>
    AuthService.signUpUser(data)
  );
  const { data: dataSignUp } = mutationSignUp;
  const handleSignUp = () => {
    mutationSignUp.mutate({
      email: inputData.email,
      password: inputData.password,
    });
  };

  useEffect(() => {
    if (dataSignUp?.status === "OK") {
      toast.success("Đăng ký thành công!");
      closeHandlerR();
      handlerR();
    }
    if (dataSignUp?.status === "ERR") {
      toast.error(dataSignUp.message);
    }
  }, [dataSignUp]);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  // Add a request interceptor
  AuthService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserSevice.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailUser = async (id, token) => {
    const res = await AuthService.getDetailUser(id, token);
    dispatch(updateAuth({ ...res?.data, access_token: token }));
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await AuthService.logoutUser();
    dispatch(resetAuth());
    push("/");
  };

  // NOTE Notic

  const fetch = async () => {
    const res = await AuthService.getNotic(auth?.id, 3);
    return res;
  };

  const query = useQuery({
    queryKey: ["noticfecth", auth?.id],
    queryFn: fetch,
    // The query will not execute until the userId exists
    enabled: !!auth?.id,
  });

  const { data, isLoading: isLoadingNotic } = query;

  const goToNotic = (tab) => {
    router.push({
      pathname: "/tai-khoan",
      query: {
        tab: tab,
      },
    });
  };


  return (
    <section
      className={`w-full ${
        router.pathname.slice(0, 7) === "/chuong"
          ? `bg-[${themeColor[auth.theme].body}] ${
              auth.theme === 6 && "text-white"
            }`
          : "bg-[#F5F4F2] text-black"
      }  flex justify-center`}
    >
      <header
        className={`h-[62px] w-[1200px] ${
          router.pathname.slice(0, 7) === "/chuong"
            ? `bg-[${themeColor[auth.theme].body}] ${
                auth.theme === 6 && "text-white"
              } `
            : "bg-[#F5F4F2]"
        }  flex justify-between items-center px-12`}
      >
        {/* NOTE Modal Login */}
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Welcome to
              <Text b className="ml-2" size={18}>
                MTC
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<AiOutlineMail fill="currentColor" />}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              type="password"
              placeholder="Password"
              contentLeft={<TbPassword fill="currentColor" />}
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Ghi nhớ</Text>
              </Checkbox>
              <Text size={14}>Quên mật khẩu</Text>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Đóng
            </Button>
            <Button auto onPress={handleLogin}>
              Đăng nhập
            </Button>
          </Modal.Footer>
        </Modal>
        {/* NOTE Modal Signup */}
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visibleR}
          onClose={closeHandlerR}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Đăng ký tài khoản
              <Text b className="ml-2" size={18}>
                MTC
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<AiOutlineMail fill="currentColor" />}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              type="password"
              placeholder="Password"
              contentLeft={<TbPassword fill="currentColor" />}
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              type="password"
              placeholder="Password"
              contentLeft={<TbPassword fill="currentColor" />}
            />
            <Row justify="space-between">
              <Checkbox>
                <Text size={14}>Đồng ý với thoải thuận</Text>
              </Checkbox>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandlerR}>
              Đóng
            </Button>
            <Button auto onPress={handleSignUp}>
              Đăng ký
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="flex items-center gap-8">
          <Link href="/">
            <img
              src="https://metruyencv.com/assets/images/logo.png?90125"
              alt="?"
              width={42}
            />
          </Link>
          <Popover trigger="hover" placement="bottom-left">
            <Popover.Trigger>
              <p className="flex  items-center gap-2 cursor-pointer hover:text-[#835443]">
                <FaBars />
                Thể loại
              </p>
            </Popover.Trigger>
            <Popover.Content>
              <div className="p-6 w-[400px] flex justify-between flex-wrap gap-4">
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Tất cả
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Võng Du" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Võng Du
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Đồng Nhân" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Đồng Nhân
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Cạnh Kỹ" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Cạnh Kỹ
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Kiếm Hiệp" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Kiếm Hiệp
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Tiên Hiệp" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Tiên Hiệp
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Khoa Huyễn" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Khoa Huyễn
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Đô Thị" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Đô Thị
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Dã Sử" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Dã Sử
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Huyền Nghi" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Huyền Nghi
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Huyền Huyễn" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Huyền Huyễn
                </p>
                <p
                  onClick={() =>
                    router.push({
                      pathname: `/tim-kiem`,
                      query: { genre: "Kỳ Ảo" },
                    })
                  }
                  className="text-black w-[45%] hover:text-[#835443] cursor-pointer"
                >
                  Kỳ Ảo
                </p>
              </div>
            </Popover.Content>
          </Popover>
          <Popover trigger="hover" placement="bottom-left">
            <Popover.Trigger>
              <p className=" flex  items-center gap-2 cursor-pointer hover:text-[#835443]">
                <RiMedalFill />
                Bảng xếp hạng
              </p>
            </Popover.Trigger>
            <Popover.Content>
              <div className="p-6 w-[200px] flex justify-between flex-wrap gap-4">
                <Link href="/bang-xep-hang" className="w-full text-black cursor-pointer hover:text-[#835443]">
                  Thịnh Hành
                </Link>
                <Link href="/bang-xep-hang" className="w-full text-black cursor-pointer hover:text-[#835443]">
                  Đọc Nhiều
                </Link>
                <Link href="/bang-xep-hang" className="w-full text-black cursor-pointer hover:text-[#835443]">
                  Tặng Thưởng
                </Link>
                <Link href="/bang-xep-hang" className="w-full text-black cursor-pointer hover:text-[#835443]">
                  Đề Cử
                </Link>
                <Link href="/bang-xep-hang" className="w-full text-black cursor-pointer hover:text-[#835443]">
                  Yêu Thích
                </Link>
                <Link href="/bang-xep-hang" className="w-full text-black cursor-pointer hover:text-[#835443]">
                  Thảo Luận
                </Link>
              </div>
            </Popover.Content>
          </Popover>
        </div>
        {/* NOTE search */}
        <div className="bg-white w-[320px] relative focus:border-blue border-2 border-solid h-[36px] rounded-full">
          <input
            placeholder="Tìm kiếm"
            className="w-full h-[32px] pl-4 pr-12 text-black rounded-full outline-none bg-white"
            type="text"
          />
          <Link
            className="absolute right-4 top-[50%] translate-y-[-50%] "
            href="/"
          >
            <ImSearch fill="#B78A28" />
          </Link>
        </div>
        <div className="flex gap-14 text-[14px]">
          <a className="flex items-center gap-2 hover:text-[#835443]" target="_blank href="https://metruyenchu-tacgia.vercel.app/">
            <BsArrowUpCircle />
            Đăng truyện
          </a>
          {auth?.id ? (
            <>
              <div className="dropdown dropdown-bottom dropdown-end flex items-center cursor-pointer p-2 z-50">
                <label className="cursor-pointer relative" tabIndex={0}>
                  <BsFillBellFill size={20} />
                  <div className="badge bg-red-500 text-white badge-xs absolute -top-[5px] right-[-5px] py-1 px-1 text-[8px]">
                    {(data?.count > 9 ? "+9" : data?.count) || 0}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[400px]"
                >
                  {data?.data?.map((item) => (
                    <li  key={item._id}>
                      <Link
                        className="text-black"
                        href={item.link}
                      >
                        <img
                          className="w-[42px] h-[42px] rounded-full"
                          src={item.thumbnail}
                          alt="..."
                        />
                        <div className="flex flex-col">
                          <b className="text-[13px]">{item.title}</b>
                          <i className="text-[10px]">{item.desc}</i>
                        </div>
                      </Link>
                    </li>
                  ))}

                  {data?.data?.length === 0 ? (
                    <li className="flex">
                      <i className="w-full flex text-black justify-center items-center">
                        Chưa có thông báo mới!
                      </i>
                    </li>
                  ) : (
                    <p
                      className="w-full flex items-center justify-center text-black py-2 italic hover:text-sky-600"
                      onClick={() => goToNotic(8)}
                    >
                      Xem thêm
                    </p>
                  )}
                </ul>
              </div>
              <Popover trigger="hover" placement="bottom-right">
                <Popover.Trigger>
                  <div className=" relative font-semibold flex  items-center gap-2 cursor-pointer hover:text-[#835443]">
                    <img
                      src={auth?.avatar}
                      alt="..."
                      className="w-[32px] h-[32px] rounded-full"
                    />
                    <p>{auth?.displayName}</p>
                    <p className="absolute right-[-10px] top-[0px] text-[8px]">
                      {auth?.vip.status && <b className=" text-red-600">Vip</b>}
                    </p>
                  </div>
                </Popover.Trigger>
                <Popover.Content>
                  <div className="p-6 w-[200px] flex justify-between flex-wrap gap-4">
                    <div className="text-black flex gap-2 items-center">
                      <img
                        src={auth?.avatar}
                        alt="..."
                        className="w-[32px] h-[32px] rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-[12px]">{auth?.displayName}</span>
                        <div className="flex items-center text-[12px] gap-2 ">
                          <span className="flex items-center gap-2">
                            <TbCandy />
                            {auth?.candy.quantity}
                          </span>
                          <span className="flex items-center gap-2">
                            <IoMdFlower />
                            {auth?.flower.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      onClick={() => goToNotic(1)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Hồ sơ
                    </span>
                    <span
                      onClick={() => goToNotic(2)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Tủ truyện
                    </span>
                    <span
                      onClick={() => goToNotic(4)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Tài sản
                    </span>
                    <span
                      onClick={() => goToNotic(5)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Mua kẹo
                    </span>
                    <span
                      onClick={() => goToNotic(6)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Nâng cấp
                    </span>
                    <span
                      onClick={() => goToNotic(7)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Nhận thưởng
                    </span>
                    <span
                      onClick={() => goToNotic(8)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Thông báo
                    </span>
                    <span
                      onClick={() => goToNotic(9)}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Trợ giúp & báo lỗi
                    </span>
                    <p
                      onClick={handleLogout}
                      className="w-full text-black cursor-pointer hover:text-[#835443]"
                    >
                      Đăng xuất
                    </p>
                  </div>
                </Popover.Content>
              </Popover>
            </>
          ) : (
            <div className="flex gap-8">
              <span
                onClick={handlerR}
                className="cursor-pointer text-black hover:text-[#835443]"
              >
                Đăng ký
              </span>
              <span
                className="cursor-pointer text-black hover:text-[#835443]"
                onClick={handler}
              >
                Đăng nhập
              </span>
            </div>
          )}
        </div>
      </header>
    </section>
  );
}
