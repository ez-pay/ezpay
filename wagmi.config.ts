

export default {
    out: 'src/generated.ts', //Path to output generated code.
    contracts: [
      {
        abi: ["function getPaymentDetails(bytes32 _paymentId) external view returns (address, uint256, bool)"],
        address: '0xAc3716c5FE3a5eF3e0Cc0bC8f749905533c73c5d',
        name: 'anyNAME ',
      }
    ],
  }
