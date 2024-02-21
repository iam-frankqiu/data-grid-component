import { StatusEnum } from "@/enums"

export type PaymentType = {
    id: number,
    status: StatusEnum,
    email: string,
    amount: number
}

export type SortOrderType = "asc" | "desc" | ""
