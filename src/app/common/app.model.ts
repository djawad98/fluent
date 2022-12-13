import { PostgrestResponse } from "@supabase/supabase-js";

export type TransactionDto = {
    id?: number,
    created_at: string,
    description: string,
    amount: number,
    isPaid: boolean,
}

export type CreateTransactionDto = {
    created_at: Date,
    description: string,
    amount: number,
    isPaid: boolean,
}

export type EditTransactionDto = CreateTransactionDto

export type Transaction = {
    id: number,
    date: string,
    description: string,
    amount: number,
    isPaid: boolean,
}


export type Bank = {
    id: number,
    label: string,
    balance: number,
}


export type BankDto = {
    id: number,
    label: string,
    balance: number,
}

export interface FormValue {
    id?: number,
    date: Date,
    description: string,
    amount: number,
    isPaid: boolean,
}

export type ApiResponse<T> = PostgrestResponse<T>
export type ApiResponseSuccess<T> = {
    isSuccess: boolean;
    data: T[]
}


export function toTransaction(transactions: TransactionDto[]) {
    return transactions.map(t => ({
        id: t.id,
        amount: t.amount,
        date: t.created_at,
        description: t.description,
        isPaid: t.isPaid
    } as Transaction))
}

export function toBank(banks: BankDto[]) {
    return banks;
}


export function convertApiResponse<SRC, DES>(input: ApiResponse<SRC>, callback: (source: SRC[]) => DES[]): ApiResponse<DES> {
    console.log('convert')
    if (!input.error) {
        console.log(input.data)

        return {
            error: null,
            data: callback.call(null, input.data),
            count: input.count,
            status: input.status,
            statusText: input.statusText,
        } as ApiResponse<DES>
    } else {
        return input;
    }
}