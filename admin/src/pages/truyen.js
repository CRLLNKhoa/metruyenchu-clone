import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import DialogEditStory from "@/components/DialogEditStory";
import { useQuery } from "@tanstack/react-query";
import { getStory } from "@/services/storyService";

function Story() {
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === data?.totalPage) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

const fecth = async (page) => {
  const res = await getStory(page)
  return res
}

const {
    data,refetch
  } = useQuery({
    queryKey: ['stoory', active-1],
    queryFn: () => fecth(active-1),
    keepPreviousData : true
  })

  useEffect(() => {
    setList(data?.data)
  }, [data]);

  const [list, setList] = useState();

  const [dataEdit, setDataEdit] = useState({})

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "thumbnail", //access nested data with dot notation
        header: "Ảnh Bìa",
        Cell: ({ cell }) => <img className="w-20" src={cell.getValue()} />,
        size: 100,
      },
      {
        accessorKey: "title",
        header: "Tên truyện",
        size: 250,
      },
      {
        accessorKey: "userId.displayName", //normal accessorKey
        header: "Tác giả",
        size: 200,
      },
      {
        accessorKey: "published",
        header: "Public",
        size: 50,
        Cell: ({ cell }) => {
          if (cell.getValue()) {
            return (
              <Chip
                variant="ghost"
                color="green"
                size="sm"
                value="Đã xuất bản"
                icon={
                  <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
                }
              />
            );
          } else
            return (
              <Chip
                variant="ghost"
                color="red"
                size="sm"
                value="Chưa xuất bản"
                className=""
                icon={
                  <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-red-900" />
                }
              />
            );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Ngày đăng",
        size: 100,
        Cell: ({ cell }) => <span>{cell.getValue().slice(0,10)}</span>,
      },
    ],
    []
  );

  return (
    <>
      <DialogEditStory open={open} refect={refetch} data={dataEdit} setOpen={setOpen} />
      <div className=" bg-white rounded-lg p-4 flex flex-col gap-8">
        <Breadcrumb path="Truyện" />
        <div>
          <MaterialReactTable
            enableRowActions
            renderRowActions={({ row }) => (
              <div className="flex items-center gap-4">
                <Button className="w-32" onClick={() => {setOpen(true),setDataEdit(row.original)}} size="sm" color="amber">
                  Chỉnh sửa
                </Button>
                <Popover placement="left">
                  <PopoverHandler>
                    <Button size="sm" color="red">
                      Xóa
                    </Button>
                  </PopoverHandler>
                  <PopoverContent className="flex items-center gap-4 z-50 shadow-lg bg-blue-600">
                    <Typography variant="h6" color="white" className="">
                      Bạn có đồng ý xóa không!
                    </Typography>
                    <Button color="red" variant="gradient">
                      xác nhận
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            )}
            columns={columns}
            data={list || []}
            positionActionsColumn="last"
            enablePagination={false}
          />
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton {...getItemProps(active)}>{active}</IconButton>
          </div>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={next}
            disabled={active === data?.totalPage}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Story;
