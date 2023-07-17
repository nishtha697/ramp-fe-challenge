import { Dispatch, FunctionComponent, SetStateAction } from "react"
import { Transaction } from "../../utils/types"

export type SetTransactionApprovalFunction = (params: {
  transactionId: string
  newValue: boolean
}) => Promise<void>

export type GetApprovalStateFunction = (transactionId: string) => boolean
export type SetApprovalStateFunction = (transactionId: string, value: boolean) => void

type TransactionsProps = {
  transactions: Transaction[] | null,
  getApprovalState: GetApprovalStateFunction
  setApproved: SetApprovalStateFunction
}

type TransactionPaneProps = {
  transaction: Transaction
  loading: boolean
  approved?: boolean
  setApproved: SetApprovalStateFunction
  setTransactionApproval: SetTransactionApprovalFunction
}

export type TransactionsComponent = FunctionComponent<TransactionsProps>
export type TransactionPaneComponent = FunctionComponent<TransactionPaneProps>
