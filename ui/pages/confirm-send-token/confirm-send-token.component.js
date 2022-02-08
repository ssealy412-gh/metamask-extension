import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ConfirmTokenTransactionBase from '../confirm-token-transaction-base/confirm-token-transaction-base.component';
import { SEND_ROUTE } from '../../helpers/constants/routes';
import { ASSET_TYPES, editTransaction } from '../../ducks/send';
import {
  contractExchangeRateSelector,
  currentNetworkTxListSelector,
  getCurrentCurrency,
} from '../../selectors';
import {
  getConversionRate,
  getNativeCurrency,
} from '../../ducks/metamask/metamask';
import { ERC20, ERC721 } from '../../helpers/constants/common';
import { getMaximumGasTotalInHexWei } from '../../../shared/modules/gas.utils';

export default function ConfirmSendToken({
  assetStandard,
  assetName,
  tokenSymbol,
  tokenAmount,
  tokenId,
  transaction,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlEditTransaction = ({
    txData,
    tokenData,
    tokenProps: assetDetails,
  }) => {
    const { id } = txData;
    dispatch(
      editTransaction(
        ASSET_TYPES.TOKEN,
        id.toString(),
        tokenData,
        assetDetails,
      ),
    );
  };

  const handleEdit = (confirmTransactionData) => {
    handlEditTransaction(confirmTransactionData);
    history.push(SEND_ROUTE);
  };
  const params = useParams();
  const currentNetworkTxList = useSelector(currentNetworkTxListSelector);
  const conversionRate = useSelector(getConversionRate);
  const nativeCurrency = useSelector(getNativeCurrency);
  const currentCurrency = useSelector(getCurrentCurrency);
  const contractExchangeRate = useSelector(contractExchangeRateSelector);
  const { id: paramsTransactionId } = params;

  // const {
  //   txData: {
  //     id: transactionId,
  //     txParams: { to: tokenAddress, data } = {},
  //   } = {},
  // } = confirmTransaction;

  const hexMaximumTransactionFee = getMaximumGasTotalInHexWei({
    gasLimit: transaction.gas ?? '0x0',
    gasPrice: transaction.gasPrice ?? '0x0',
  });
  // const { hexMaximumTransactionFee } = transactionFeeSelector(
  //   state,
  //   transaction,
  // );

  // const ethTransactionTotalMaxAmount = Number(
  //   hexWEIToDecETH(hexMaximumTransactionFee),
  // ).toFixed(6);

  let title, subtitle;

  if (assetStandard === ERC721) {
    title = assetName;
    subtitle = `#${tokenId}`;
  } else if (assetStandard === ERC20) {
    title = `${tokenAmount} ${tokenSymbol}`;
  }

  return (
    <ConfirmTokenTransactionBase
      onEdit={handleEdit}
      conversionRate={conversionRate}
      currentCurrency={currentCurrency}
      nativeCurrency={nativeCurrency}
      // hexMaximumTransactionFee={hexMaximumTransactionFee}
      contractExchangeRate={contractExchangeRate}
      title={title}
      subtitle={subtitle}
      assetStandard={assetStandard}
      assetName={assetName}
      tokenSymbol={tokenSymbol}
      tokenAmount={tokenAmount}
      tokenId={tokenId}
      transaction={transaction}
      // {...props}
    />
  );
}

ConfirmSendToken.propTypes = {
  tokenAmount: PropTypes.string,
};
