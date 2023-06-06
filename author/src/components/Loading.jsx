import { Loading } from "@nextui-org/react";

export default function LoadingCustom({tip="",textColor="white"}) {
  return(
    <section className="fixed z-50 bg-[#c8c8c82f] top-0 right-0 left-0 bottom-0 flex items-center justify-center">
       <Loading><span className={`text-[${textColor}] text-[12px]`}>{tip}</span></Loading>
    </section>
  );
}

