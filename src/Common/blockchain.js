const { Web3 } = require('web3');

export const query_getAmountOut = async (props) => {
  const { router_contract, amountIn, tokenA_address, tokenB_address } = props;

  let result;
  try {
    result = await router_contract.methods.getAmountOut(amountIn, tokenA_address, tokenB_address).call();
  } catch (error) {
    console.log(error);
    result = 'error';
  }

  return result;
};

export const query_getAmountsOut = async (props) => {
  const { router_contract, amountIn, path } = props;

  let result;
  try {
    result = await router_contract.methods.getAmountsOut(amountIn, path).call();
  } catch (error) {
    console.log(error);
    result = 'error';
  }

  return result;
};

const create_swapExactTokensForTokens = async (props) => {
  const { router_contract, amountIn, amountOutMin, path, account_address } = props;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 6;
  //console.log(deadline);
  const tx = await router_contract.methods.swapExactTokensForTokens(amountIn, amountOutMin, path, account_address, deadline);
  //console.log(tx);
  return tx;
};

function step_dex() {
  const network = 'https://rpc.step.network';
  const web3 = new Web3(new Web3.providers.HttpProvider(network));
  const contract_ABI = [
    {
      type: 'constructor',
      stateMutability: 'nonpayable',
      inputs: [
        { type: 'address', name: '_factory', internalType: 'address' },
        { type: 'address', name: '_WFITFI', internalType: 'address' },
      ],
    },
    { type: 'function', stateMutability: 'view', outputs: [{ type: 'address', name: '', internalType: 'address' }], name: 'WFITFI', inputs: [] },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [
        { type: 'uint256', name: 'amountA', internalType: 'uint256' },
        { type: 'uint256', name: 'amountB', internalType: 'uint256' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
      ],
      name: 'addLiquidity',
      inputs: [
        { type: 'address', name: 'tokenA', internalType: 'address' },
        { type: 'address', name: 'tokenB', internalType: 'address' },
        { type: 'uint256', name: 'amountADesired', internalType: 'uint256' },
        { type: 'uint256', name: 'amountBDesired', internalType: 'uint256' },
        { type: 'uint256', name: 'amountAMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountBMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'payable',
      outputs: [
        { type: 'uint256', name: 'amountToken', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFI', internalType: 'uint256' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
      ],
      name: 'addLiquidityFITFI',
      inputs: [
        { type: 'address', name: 'token', internalType: 'address' },
        { type: 'uint256', name: 'amountTokenDesired', internalType: 'uint256' },
        { type: 'uint256', name: 'amountTokenMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFIMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    { type: 'function', stateMutability: 'view', outputs: [{ type: 'address', name: '', internalType: 'address' }], name: 'factory', inputs: [] },
    {
      type: 'function',
      stateMutability: 'pure',
      outputs: [{ type: 'uint256', name: 'amountIn', internalType: 'uint256' }],
      name: 'getAmountIn',
      inputs: [
        { type: 'uint256', name: 'amountOut', internalType: 'uint256' },
        { type: 'uint256', name: 'reserveIn', internalType: 'uint256' },
        { type: 'uint256', name: 'reserveOut', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'pure',
      outputs: [{ type: 'uint256', name: 'amountOut', internalType: 'uint256' }],
      name: 'getAmountOut',
      inputs: [
        { type: 'uint256', name: 'amountIn', internalType: 'uint256' },
        { type: 'uint256', name: 'reserveIn', internalType: 'uint256' },
        { type: 'uint256', name: 'reserveOut', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'getAmountsIn',
      inputs: [
        { type: 'uint256', name: 'amountOut', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'view',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'getAmountsOut',
      inputs: [
        { type: 'uint256', name: 'amountIn', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'pure',
      outputs: [{ type: 'uint256', name: 'amountB', internalType: 'uint256' }],
      name: 'quote',
      inputs: [
        { type: 'uint256', name: 'amountA', internalType: 'uint256' },
        { type: 'uint256', name: 'reserveA', internalType: 'uint256' },
        { type: 'uint256', name: 'reserveB', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [
        { type: 'uint256', name: 'amountA', internalType: 'uint256' },
        { type: 'uint256', name: 'amountB', internalType: 'uint256' },
      ],
      name: 'removeLiquidity',
      inputs: [
        { type: 'address', name: 'tokenA', internalType: 'address' },
        { type: 'address', name: 'tokenB', internalType: 'address' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
        { type: 'uint256', name: 'amountAMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountBMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [
        { type: 'uint256', name: 'amountToken', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFI', internalType: 'uint256' },
      ],
      name: 'removeLiquidityFITFI',
      inputs: [
        { type: 'address', name: 'token', internalType: 'address' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
        { type: 'uint256', name: 'amountTokenMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFIMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [{ type: 'uint256', name: 'amountFITFI', internalType: 'uint256' }],
      name: 'removeLiquidityFITFISupportingFeeOnTransferTokens',
      inputs: [
        { type: 'address', name: 'token', internalType: 'address' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
        { type: 'uint256', name: 'amountTokenMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFIMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [
        { type: 'uint256', name: 'amountToken', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFI', internalType: 'uint256' },
      ],
      name: 'removeLiquidityFITFIWithPermit',
      inputs: [
        { type: 'address', name: 'token', internalType: 'address' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
        { type: 'uint256', name: 'amountTokenMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFIMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
        { type: 'bool', name: 'approveMax', internalType: 'bool' },
        { type: 'uint8', name: 'v', internalType: 'uint8' },
        { type: 'bytes32', name: 'r', internalType: 'bytes32' },
        { type: 'bytes32', name: 's', internalType: 'bytes32' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [{ type: 'uint256', name: 'amountFITFI', internalType: 'uint256' }],
      name: 'removeLiquidityFITFIWithPermitSupportingFeeOnTransferTokens',
      inputs: [
        { type: 'address', name: 'token', internalType: 'address' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
        { type: 'uint256', name: 'amountTokenMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountFITFIMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
        { type: 'bool', name: 'approveMax', internalType: 'bool' },
        { type: 'uint8', name: 'v', internalType: 'uint8' },
        { type: 'bytes32', name: 'r', internalType: 'bytes32' },
        { type: 'bytes32', name: 's', internalType: 'bytes32' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [
        { type: 'uint256', name: 'amountA', internalType: 'uint256' },
        { type: 'uint256', name: 'amountB', internalType: 'uint256' },
      ],
      name: 'removeLiquidityWithPermit',
      inputs: [
        { type: 'address', name: 'tokenA', internalType: 'address' },
        { type: 'address', name: 'tokenB', internalType: 'address' },
        { type: 'uint256', name: 'liquidity', internalType: 'uint256' },
        { type: 'uint256', name: 'amountAMin', internalType: 'uint256' },
        { type: 'uint256', name: 'amountBMin', internalType: 'uint256' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
        { type: 'bool', name: 'approveMax', internalType: 'bool' },
        { type: 'uint8', name: 'v', internalType: 'uint8' },
        { type: 'bytes32', name: 'r', internalType: 'bytes32' },
        { type: 'bytes32', name: 's', internalType: 'bytes32' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'payable',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'swapExactFITFIForTokens',
      inputs: [
        { type: 'uint256', name: 'amountOutMin', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'payable',
      outputs: [],
      name: 'swapExactFITFIForTokensSupportingFeeOnTransferTokens',
      inputs: [
        { type: 'uint256', name: 'amountOutMin', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'swapExactTokensForFITFI',
      inputs: [
        { type: 'uint256', name: 'amountIn', internalType: 'uint256' },
        { type: 'uint256', name: 'amountOutMin', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'swapExactTokensForFITFISupportingFeeOnTransferTokens',
      inputs: [
        { type: 'uint256', name: 'amountIn', internalType: 'uint256' },
        { type: 'uint256', name: 'amountOutMin', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'swapExactTokensForTokens',
      inputs: [
        { type: 'uint256', name: 'amountIn', internalType: 'uint256' },
        { type: 'uint256', name: 'amountOutMin', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [],
      name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      inputs: [
        { type: 'uint256', name: 'amountIn', internalType: 'uint256' },
        { type: 'uint256', name: 'amountOutMin', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'payable',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'swapFITFIForExactTokens',
      inputs: [
        { type: 'uint256', name: 'amountOut', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'swapTokensForExactFITFI',
      inputs: [
        { type: 'uint256', name: 'amountOut', internalType: 'uint256' },
        { type: 'uint256', name: 'amountInMax', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    {
      type: 'function',
      stateMutability: 'nonpayable',
      outputs: [{ type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' }],
      name: 'swapTokensForExactTokens',
      inputs: [
        { type: 'uint256', name: 'amountOut', internalType: 'uint256' },
        { type: 'uint256', name: 'amountInMax', internalType: 'uint256' },
        { type: 'address[]', name: 'path', internalType: 'address[]' },
        { type: 'address', name: 'to', internalType: 'address' },
        { type: 'uint256', name: 'deadline', internalType: 'uint256' },
      ],
    },
    { type: 'receive', stateMutability: 'payable' },
  ];
  const router_address = '0xa4196322aa900acc92cd5cd978ab47e77efa07eb';
  const router_contract = new web3.eth.Contract(contract_ABI, router_address);

  return { router_contract, web3 };
}

export function thena_bnb() {
  const network = 'https://bsc-dataseed1.binance.org:443';
  const web3 = new Web3(new Web3.providers.HttpProvider(network));

  const contract_ABI = [
    {
      inputs: [
        { internalType: 'address', name: '_factory', type: 'address' },
        { internalType: 'address', name: '_wETH', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amount0In', type: 'uint256' },
        { indexed: false, internalType: 'address', name: '_tokenIn', type: 'address' },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        { indexed: false, internalType: 'bool', name: 'stable', type: 'bool' },
      ],
      name: 'Swap',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'UNSAFE_swapExactTokensForTokens',
      outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'amountTokenDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    { inputs: [], name: 'factory', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'address', name: 'tokenIn', type: 'address' },
        { internalType: 'address', name: 'tokenOut', type: 'address' },
      ],
      name: 'getAmountOut',
      outputs: [
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
      ],
      name: 'getAmountsOut',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
      ],
      name: 'getReserves',
      outputs: [
        { internalType: 'uint256', name: 'reserveA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveB', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [{ internalType: 'address', name: 'pair', type: 'address' }], name: 'isPair', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
      ],
      name: 'pairFor',
      outputs: [{ internalType: 'address', name: 'pair', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
      ],
      name: 'quoteAddLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      name: 'quoteRemoveLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
      ],
      name: 'sortTokens',
      outputs: [
        { internalType: 'address', name: 'token0', type: 'address' },
        { internalType: 'address', name: 'token1', type: 'address' },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETH',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address', name: 'tokenFrom', type: 'address' },
        { internalType: 'address', name: 'tokenTo', type: 'address' },
        { internalType: 'bool', name: 'stable', type: 'bool' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokensSimple',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        {
          components: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'bool', name: 'stable', type: 'bool' },
          ],
          internalType: 'struct RouterV2.route[]',
          name: 'routes',
          type: 'tuple[]',
        },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { inputs: [], name: 'wETH', outputs: [{ internalType: 'contract IWETH', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    { stateMutability: 'payable', type: 'receive' },
  ];
  const router_address = '0xd4ae6eCA985340Dd434D38F470aCCce4DC78D109';
  const router_contract = new web3.eth.Contract(contract_ABI, router_address);

  return { router_contract, web3 };
}

export function pancake_bnb() {
  const network = 'https://bsc-dataseed1.binance.org:443';
  const web3 = new Web3(new Web3.providers.HttpProvider(network));

  const contract_ABI = [
    {
      inputs: [
        { internalType: 'address', name: '_factory', type: 'address' },
        { internalType: 'address', name: '_WETH', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    { inputs: [], name: 'WETH', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'amountTokenDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    { inputs: [], name: 'factory', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
      ],
      name: 'getAmountIn',
      outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
      ],
      name: 'getAmountOut',
      outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
      ],
      name: 'getAmountsIn',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
      ],
      name: 'getAmountsOut',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveB', type: 'uint256' },
      ],
      name: 'quote',
      outputs: [{ internalType: 'uint256', name: 'amountB', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
      outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
      outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapETHForExactTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETH',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactETH',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ];
  const router_address = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
  const router_contract = new web3.eth.Contract(contract_ABI, router_address);

  return { router_contract, web3 };
}
function find_token_Step(token_name) {
  const token_list = [
    ['RJV', '0x264c1383EA520f73dd837F915ef3a732e204a493', 6],
    ['USDT', '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f', 6],
    ['PRIMAL', '0x0bbe45a033aab7a90006c05aa648efd3d2993f9e', 18],
    ['USDC', '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d', 6],
    ['FITFI', '0xb58A9d5920AF6aC1a9522B0B10F55dF16686D1b6', 18],
    ['KCAL', '0x68b2DFC494362AAE300F2C401019205d8960226b', 18],
    ['XETA', '0xf390830DF829cf22c53c8840554B98eafC5dCBc2', 18],
    ['AVAX', '0xd6070ae98b8069de6B494332d1A1a81B6179D960', 18],
    ['DAO', '0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454', 18],
    ['SPEX', '0x7db4072D6e26BBF35129E826d656f230F791CD2f', 18],
  ];

  let token_address = '';
  let token_decimal = '';

  for (let item of token_list) {
    if (token_name == item[0]) {
      token_address = item[1];
      //token_address = Web3.toChecksumAddress(token_address);
      token_decimal = item[2];
      break;
    }
  }
  if (token_address != '') {
    return [token_address, token_decimal];
  } else alert('Không tìm thấy địa chỉ token');
}

function find_token_BNB(token_name) {
  const token_list = [
    ['RJV', '0x1135883a1bC6776bF90c97845adc491922106dFb', 6],
    ['USDT', '0x55d398326f99059fF775485246999027B3197955', 18],
    ['WBNB', '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
    ['BUSD', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
    ['PRIMAL', '0xcb5327ed4649548e0d73e70b633cdfd99af6da87', 18],
    ['USDC', '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 18],
    ['DAO', '0x4d2d32d8652058Bf98c772953E1Df5c5c85D9F45', 18],
    ['PLAY', '0xD069599E718f963bD84502b49ba8F8657fAF5B3a', 18],
    ['FITFI', '0x7588DF009C3d82378Be6ab81F2108fa963c10fc8', 18],
    ['XETA', '0xBC7370641ddCF16A27eeA11230Af4a9F247B61F9', 18],
    ['ZIX', '0x48077400FAF11183c043Feb5184a13ea628Bb0DB', 18],
    ['ARBI', '0xa7bD657C5838472dDF85FF0797A2e6fce8fd4833', 18],
    ['AVAX', '0x1CE0c2827e2eF14D5C4f29a091d735A204794041', 18],
    ['EGO', '0x44a21B3577924DCD2e9C81A3347D204C36a55466', 18],
    ['SOPH', '0x73fBD93bFDa83B111DdC092aa3a4ca77fD30d380', 18],
    ['SEILOR', '0xE29142E14E52bdFBb8108076f66f49661F10EC10', 18],
  ];

  let token_address = '';
  let token_decimal = '';

  for (let item of token_list) {
    if (token_name == item[0]) {
      token_address = item[1];
      //token_address = Web3.toChecksumAddress(token_address);
      token_decimal = item[2];
      break;
    }
  }
  if (token_address != '') {
    return [token_address, token_decimal];
  } else alert('Không tìm thấy địa chỉ token');
}
export { step_dex, create_swapExactTokensForTokens, find_token_Step, find_token_BNB };
