import { MAX_NUMBER, MIN_NUMBER } from "@/constants";
import { StatusEnum } from "@/enums";
import { PaymentType } from "@/types";
import { generateGmail, randEnumValue } from "@/utils";
import { useEffect, useState } from "react";

export function useMemoData() {
  const [data, setData] = useState<PaymentType[]>([]);
  const [total, setTotal] = useState(
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER)
  );

  useEffect(() => {
    const arr:PaymentType[] = new Array(total).fill(total).map((_item, index) => {
      const temp: PaymentType = {
        id: index + 1,
        status: randEnumValue(StatusEnum),
        amount: Math.floor(Math.random() * 1000),
        email: generateGmail(),
      };
      return temp;
    });
    setData(arr);
  }, []);

  return { data, total, setTotal };
}
