import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  CONFIRM_APPROVE_PATH,
  CONFIRM_SEND_TOKEN_PATH,
  CONFIRM_TOKEN_METHOD_PATH,
  CONFIRM_TRANSACTION_ROUTE,
  CONFIRM_TRANSFER_FROM_PATH,
} from '../../helpers/constants/routes';
import { transactionFeeSelector } from '../../selectors';
import ConfirmApprove from '../confirm-approve';
import ConfirmSendToken from '../confirm-send-token';
import ConfirmTokenTransactionBase from '../confirm-token-transaction-base/confirm-token-transaction-base.component';
import ConfirmTransactionBase from '../confirm-transaction-base/confirm-transaction-base.component';
import ConfirmTransactionSwitch from '../confirm-transaction-switch';

const { useAssetDetails } = require('../../hooks/useAssetDetails');

export const ConfirmTokenTransactionSwitch = ({ transaction }) => {
  const {
    txParams: { data, to: tokenAddress, from: userAddress } = {},
  } = transaction;

  const {
    assetStandard,
    assetName,
    userBalance,
    tokenSymbol,
    decimals,
    tokenImage,
    tokenAmount,
    tokenId,
    toAddress,
  } = useAssetDetails(tokenAddress, userAddress, data);

  const {
    ethTransactionTotal,
    fiatTransactionTotal,
    hexTransactionTotal,
  } = useSelector((state) => transactionFeeSelector(state, transaction));

  return (
    <Switch>
      <Route
        exact
        path={`${CONFIRM_TRANSACTION_ROUTE}/:id?${CONFIRM_APPROVE_PATH}`}
        render={() => (
          <ConfirmApprove
            assetStandard={assetStandard}
            assetName={assetName}
            userBalance={userBalance}
            tokenSymbol={tokenSymbol}
            decimals={decimals}
            tokenImage={tokenImage}
            tokenAmount={tokenAmount}
            tokenId={tokenId}
            userAddress={userAddress}
            tokenAddress={tokenAddress}
            toAddress={toAddress}
            transaction={transaction}
            ethTransactionTotal={ethTransactionTotal}
            fiatTransactionTotal={fiatTransactionTotal}
            hexTransactionTotal={hexTransactionTotal}
          />
        )}
      />
      <Route
        exact
        path={`${CONFIRM_TRANSACTION_ROUTE}/:id?${CONFIRM_TRANSFER_FROM_PATH}`}
        // component={ConfirmTokenTransactionBaseContainer}
        render={() => (
          <ConfirmTokenTransactionBase
            assetStandard={assetStandard}
            assetName={assetName}
            userBalance={userBalance}
            tokenSymbol={tokenSymbol}
            decimals={decimals}
            image={tokenImage}
            tokenAddress={tokenAddress}
            toAddress={toAddress}
            tokenAmount={tokenAmount}
            tokenId={tokenId}
            userAddress={userAddress}
            tokenAddress={tokenAddress}
            transaction={transaction}
            ethTransactionTotal={ethTransactionTotal}
            fiatTransactionTotal={fiatTransactionTotal}
            hexTransactionTotal={hexTransactionTotal}
          />
        )}
      />
      <Route
        exact
        path={`${CONFIRM_TRANSACTION_ROUTE}/:id?${CONFIRM_SEND_TOKEN_PATH}`}
        // component={ConfirmSendToken}
        render={() => (
          <ConfirmSendToken
            assetStandard={assetStandard}
            assetName={assetName}
            userBalance={userBalance}
            tokenSymbol={tokenSymbol}
            decimals={decimals}
            image={tokenImage}
            tokenAddress={tokenAddress}
            toAddress={toAddress}
            tokenAmount={tokenAmount}
            tokenId={tokenId}
            userAddress={userAddress}
            tokenAddress={tokenAddress}
            transaction={transaction}
            ethTransactionTotal={ethTransactionTotal}
            fiatTransactionTotal={fiatTransactionTotal}
            hexTransactionTotal={hexTransactionTotal}
          />
        )}
      />
      <Route
        exact
        path={`${CONFIRM_TRANSACTION_ROUTE}/:id?${CONFIRM_TOKEN_METHOD_PATH}`}
        component={ConfirmTransactionBase}
      />
      <Route path="*" component={ConfirmTransactionSwitch} />
    </Switch>
  );
};