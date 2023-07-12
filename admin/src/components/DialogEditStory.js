import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { editStory } from "@/services/storyService";
import { toast } from "react-toastify";

function DialogEditStory({ open, setOpen, data,refect }) {
  const handleOpen = () => {
    setOpen(!open);
    setImg(data.thumbnail);
  };
  const [img, setImg] = useState(data.thumbnail);
  const [title, setTitle] = useState(data.title);
  const [show, setShow] = useState(data.published);

  useEffect(() => {
    setImg(data.thumbnail);
    setTitle(data.title);
    setShow(data.published)
  }, [data]);

  const mutation = useMutation({
    mutationFn: (data) => {
      return editStory(data);
    },
  });

  const { data: dataUpdate } = mutation;

  useEffect(() => {
    if(dataUpdate?.status === "OK"){
      toast.success("Cập nhật thành công!",{autoClose:3000})
      refect()
      handleOpen()
    }
  }, [dataUpdate]);

  const handleChangeAvatar = async (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImg(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="flex  flex-col"
      size="sm"
    >
      <DialogHeader className="text-[18px]">Chỉnh sửa truyện</DialogHeader>
      <DialogBody divider>
        <div className="flex items-center gap-4 justify-center flex-col">
          <img className="rounded-lg w-24" src={img} alt="nature image" />
          <input
            onChange={handleChangeAvatar}
            type="file"
            className="file-input file-input-sm file-input-bordered file-input-accent w-full max-w-xs"
          />
        </div>
        <form className="mt-8 mb-2 w-full">
          <div className="mb-4 w-full flex gap-6 items-center">
            <span className="text-[14px]">Xuất bản truyện:</span>
            <Switch
              checked={show}
              id="auto-update"
              color="green"
              label="On"
              onChange={(e)=>setShow(e.target.checked)}
            />
          </div>
          <div className="">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              label="Tên truyện"
            />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-1 font-normal mt-2"
            >
              Viết hoa chữ cái đầu mỏi từ. VD: Tên Truyện Kiếm Hiệp
            </Typography>
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() =>
            mutation.mutate({
              id: data._id,
              data: { title: title, published: show, thumbnail: img },
            })
          }
        >
          <span>Cập nhật</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DialogEditStory;
