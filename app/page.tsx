"use client";
import { DataGrid } from "@/components/DataGrid";
import { useMemo, useState } from "react";
import { useMemoData } from "@/hooks/useDemoData";
import { DEFAULT_PAGE_SIZE, PAYMENT_COLUMNS } from "@/constants";
import clsx from 'clsx'
import { PaymentType, SortOrderType } from "@/types";

export default function Home() {
  const [emailFilter, setEmailFilter] = useState("");
  const [page, setPage] = useState(1);
  const [sortAttribute, setSortAttribute] = useState<keyof PaymentType>('amount')
  const [sortOrder, setSortOrder] = useState<SortOrderType>('')
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, total } = useMemoData();

  const gridData = useMemo(() => {
    let result = emailFilter ? data
    .filter((item) => item.email.includes(emailFilter)): data
    if (sortOrder && sortAttribute) {
      result.sort((a: PaymentType, b: PaymentType) => {
        if (sortOrder === 'asc') {
          return (a[sortAttribute] as number) -( b[sortAttribute] as number)
        }
        return (b[sortAttribute] as number) - (a[sortAttribute] as number)
      })
    }
    return result.slice((page - 1) * pageSize, page * pageSize)
  }, [page, emailFilter, data, pageSize, sortAttribute, sortOrder]);

  return (
    <main className="p-24 h-[100vh]">
      <input
        placeholder="Filter emails..."
        value={emailFilter}
        onChange={(event) => setEmailFilter(event.target.value)}
      ></input>

      <DataGrid
        columns={PAYMENT_COLUMNS}
        data={gridData}
        sortAttribute={sortAttribute}
        sortOrder={sortOrder}
        setSortAttribute={setSortAttribute}
        setSortOrder={setSortOrder}
        className="mt-[24px] w-[1000px] mx-[auto]"
      ></DataGrid>

      {total !== 0 && (
        <div className="mt-[24px] flex justify-between">
          <span>Total: {total}</span>
          <div>
          <button
            type="button"
            className={clsx('mr-[24px] border-[1px] border-solid border-[grey] rounded-[5px]', page === 1? 'cursor-not-allowed': 'cursor-pointer')}
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            Previous
          </button>
          <button
            type="button"
            className={clsx('border-[1px] border-solid border-[grey] rounded-[5px]', page * pageSize >= total ? 'cursor-not-allowed': 'cursor-pointer')}
            disabled={page * pageSize >= total}
            onClick={() => setPage((page) => page + 1)}
          >
            Next
          </button>

          </div>
        </div>
      )}
    </main>
  );
}
