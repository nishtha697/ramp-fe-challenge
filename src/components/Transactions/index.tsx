import { useCallback, useState } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import {
  SetTransactionApprovalFunction,
  TransactionsComponent,
} from "./types"

export const Transactions: TransactionsComponent = ({ transactions, setApproved, getApprovalState }) => {
  const { fetchWithoutCache, loading } = useCustomFetch()

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithoutCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      })
      setApproved(transactionId, newValue);
    },
    [fetchWithoutCache, setApproved]
  )

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          approved={getApprovalState(transaction.id)}
          setTransactionApproval={setTransactionApproval}
          setApproved={setApproved}
        />
      ))}
    </div>
  )
}
