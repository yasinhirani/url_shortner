import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import { validationResult } from "express-validator";
import ApiError from "../utilities/apiError";
import { generateBase58Code } from "../utilities/generateBase58Code";
import { urlModel, urlWithoutUserIdModel } from "../model/urls.model";
import ApiResponse from "../utilities/apiResponse";
import { client } from "../db/db";

const shortenUrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ApiError(result.array({ onlyFirstError: true })[0].msg, 400);
    }

    const { userId, url } = req.body;

    let existingUrl;

    if (userId) {
      existingUrl = await urlModel.findOne({ userId, longUrl: url });
    } else {
      existingUrl = await urlWithoutUserIdModel.findOne({ longUrl: url });
    }

    if (existingUrl) {
      res.status(200).json(
        new ApiResponse({
          shortUrl: `${process.env.HOST_URL}${existingUrl.urlCode}`,
        })
      );
      return;
    }

    while (true) {
      try {
        const urlCode = generateBase58Code();
        let codeRes;
        if (!userId) {
          codeRes = await new urlWithoutUserIdModel({
            longUrl: url,
            urlCode,
          }).save();
        } else {
          codeRes = await new urlModel({
            userId,
            longUrl: url,
            urlCode,
          }).save();
        }
        if (codeRes) {
          res.status(200).json(
            new ApiResponse({
              shortUrl: `${process.env.HOST_URL}${codeRes.urlCode}`,
            })
          );
          return;
        }
      } catch (error: any) {
        if (error.code !== 11000) throw new ApiError(error.message, 400);
      }
    }
  }
);

const redirectToUrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new ApiError(result.array({ onlyFirstError: true })[0].msg, 400);
    }

    const { shortCode } = req.params;

    const cachedUrl = await client.get(shortCode as string);

    if (cachedUrl) {
      res.redirect(cachedUrl);
      return;
    }

    let urlRes;

    urlRes = await urlModel.findOne({ urlCode: shortCode });

    if (!urlRes) {
      urlRes = await urlWithoutUserIdModel.findOne({ urlCode: shortCode });
      if (!urlRes) {
        throw new ApiError("Invalid URL", 400);
      }
    }

    await client.setEx(shortCode as string, 3600, urlRes.longUrl as string);

    res.redirect(urlRes.longUrl ?? "");
  }
);

export { shortenUrl, redirectToUrl };
