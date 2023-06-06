import React, { useEffect } from "react";
import { Table, Row, Col, Tooltip, User, Text, Badge } from "@nextui-org/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import * as ChapterService from "services/chapterService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMutationHooks } from "hooks/useMutationHook";
import Head from "next/head";
import LoadingCustom from "components/Loading";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const id = context.query.id; // Get ID from slug `/book/1`
  // Rest of `getServerSideProps` code
  return {
    props: {
      id,
    },
  };
}

export default function ListChapter({ id }) {
  const router =  useRouter()
  const columns = [
    { name: "No.", uid: "chapterNo" },
    { name: "Tên chương", uid: "name" },
    { name: "Thời gian thêm", uid: "time" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const fetchStory = async () => {
    const res = await ChapterService.getChapterList(id);
    return res.data;
  };
  const query = useQuery({ queryKey: ["story"], queryFn: fetchStory });
  const { isLoading, data,refetch } = query;
  
  const mutation = useMutationHooks((data)=> ChapterService.deleteChapter(data))
  const {isLoading: isLoadingDel, data:dataDel} = mutation

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "chapterNo":
        return (
          <p className="text-black dark:text-[white] text-[13px]">
            {user.chapterNo}
          </p>
        );
      case "name":
        return (
          <p className="text-black dark:text-[white] text-[13px]">
            {user.title}
          </p>
        );

      case "time":
        return (
          <p className="text-black dark:text-[white] text-[13px]">
            {user.createdAt.slice(0,10)}
          </p>
        );
      case "actions":
        return (
          <Row justify="center" align="center" className="z-0">
            <Col css={{ d: "flex" }}>
              <Tooltip placement="bottom" content="Edit user">
                <button onClick={() => router.push({pathname:`/chapter/edit/${user._id}`,query: {name: user.title}})}>
                  <AiFillEdit size={20} fill="#ff9d00" />
                </button>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
               placement="bottom"
                content="Delete user"
                color="error"
                onClick={() => mutation.mutate(user._id)}
              >
                <button>
                  <AiFillDelete size={20} fill="#ff0000" />
                </button>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const notify = () =>
    toast.error(dataDel?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });

    const notifyS = () =>
    toast.success(dataDel?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    if(dataDel?.status === "ERR"){
      notify()
    }
    if(dataDel?.status === "OK"){
      notifyS()
      refetch();
    }
  }, [dataDel]);

  return (
    <div>
      <Head>
        <title>Danh sách chương</title>
      </Head>
      {isLoadingDel && <LoadingCustom tip="Đang xóa!" />}
      <h1 className="mb-4 text-[18px] dark:text-white text-black">
        Danh sách chưởng của truyện
      </h1>
      {!isLoading && (
          <Table
            aria-label="Example table with custom cells"
            css={{
              height: "auto",
              minWidth: "100%",
              zIndex: 1,
            }}
            selectionMode="none"
            className="border-none"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={data}>
              {(item) => (
                <Table.Row key={item._id}>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination
              shadow
              noMargin
              align="center"
              rowsPerPage={5}
            />
          </Table>
        )}
    </div>
  );
}
