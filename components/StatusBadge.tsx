import clsx from "clsx";
import Image from "next/legacy/image";

import { StatusIcon } from "@/constants";
import { Status } from "@/types";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        //@ts-ignore
        "bg-green-600": status === "confirmed",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
      //@ts-ignore
        src={StatusIcon[status]}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          //@ts-ignore
          "text-green-500": status === "confirmed",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};