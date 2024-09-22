"use server";

import { VerificationLevel } from "@worldcoin/idkit-core";
import { verifyCloudProof } from "@worldcoin/idkit-core/backend";

export type LogVerificationReply = {
  success: boolean;
  message: string;
  verificationSuccess?: boolean;
  verificationDetail?: string;
};

export type IDKitResponse = {
  nullifier_hash: string;
  proof: string;
  merkle_root: string;
  verification_level: VerificationLevel;
};

// Check if environment variables are set
const app_id = process.env.NEXT_PUBLIC_WLD_APP as 'app_$string';
const action = process.env.NEXT_PUBLIC_WLD_ACTIO as string;

if (!app_id || !action) {
  console.error("Missing app_id or action in environment variables");
}

console.log("App ID:", app_id);
console.log("Action:", action);

export async function logVerification(
  address: string,
  idkitResponse: IDKitResponse
): Promise<LogVerificationReply> {
  try {
    // Log the address (signal) and IDKit response
    console.log("Wallet Address (Signal):", address);
    console.log("IDKit Response:", JSON.stringify(idkitResponse, null, 2));

    // Prepare proof and signal for verification
    const proof = {
      nullifier_hash: idkitResponse.nullifier_hash,
      proof: idkitResponse.proof,
      merkle_root: idkitResponse.merkle_root,
      verification_level: idkitResponse.verification_level
    };

    // Verify the proof
    const verifyRes = await verifyCloudProof(proof, app_id, action, address);

    if (verifyRes.success) {
      return {
        success: true,
        message: "Verification data logged and verified successfully",
        verificationSuccess: true,
        verificationDetail: "Verification successful"
      };
    } else {
      return {
        success: false,
        message: "Verification data logged but verification failed",
        verificationSuccess: false,
        verificationDetail: verifyRes.detail || "Verification failed"
      };
    }
  } catch (error) {
    console.error("Error logging verification data:", error);
    return {
      success: false,
      message: "Error occurred while logging verification data",
      verificationSuccess: false,
      verificationDetail: "An error occurred during verification"
    };
  }
}
