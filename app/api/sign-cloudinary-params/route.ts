import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { paramsToSign } = body
    const apiSecret = process.env.CD_API_SECRET;

    const signature = crypto
      .createHash("sha1")
      .update(
        Object.keys(paramsToSign)
          .sort()
          .map((key) => `${key}=${paramsToSign[key]}`)
          .join("&") + apiSecret
      )
      .digest("hex");

    return NextResponse.json({
      signature
    }, { status: 200 })
}
