import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import getMessage from "@/utils/getMessage";
import arrayToSelectbox from "@/utils/arrayToSelectbox";

export const POST = async (req) => {
  const formData = await req.formData();

  const community = {
    Title: formData.get("Title") || null,
    Description: formData.get("Description") || null,
    Categories: JSON.parse(formData.get("Categories")) || null,
    LogoFile: formData.get("LogoFile") || null,
  };

  const body = new FormData();
  body.append("Title", community.Title?.trim());
  body.append("Description", community.Description?.trim());
  community.Categories.forEach((element, i) => {
    body.append(`categories[${i}].id`, element?.id);
  });
  body.append("LogoFile", community.LogoFile);

  const setting = {
    method: "POST",
    body,
    bodyType: "formData",
  };

  const request = await fetchApiRequest("community", setting, req);

  const _message = request?.message ? getMessage(request?.message) : null;

  const response = {
    success: request?.success,
    ...request,
    message: _message,
  };

  return NextResponse.json(response);
};

export const GET = async (req) => {
  const reqHeaders = req?.headers;
  const community = reqHeaders?.get("community") || null;
  let request = await fetchApiRequest(community, null, req);

  const message = request?.message
    ? getMessage(request?.message)?.replace("{scope}", "Community")
    : null;

  let response = {
    ...request,
    success: request?.success,
  };

  if (response?.data?.community?.categories?.length) {
    response.data.community.categories = arrayToSelectbox({
      array: response?.data?.community?.categories,
    });
  }
  if (message) response.message = message;

  return NextResponse.json(response);
};

export const PUT = async (req) => {
  const formData = await req.formData();

  const body = new FormData();
  const categories = JSON.parse(formData.get("categories"));
  const community = {
    id: formData.get("id"),
    logoFile: formData.get("logoFile"),
    CoverImageFile: formData.get("coverImageFile"),
    logo: formData.get("logo"),
    coverImage: formData.get("coverImage"),
    title: formData.get("title")?.trim(),
    description: formData.get("description")?.trim(),
    slug: formData.get("slug"),
    webSiteUrl: formData.get("webSiteUrl"),
    isPublic: formData.get("isPublic"),
    isDraft: formData.get("isDraft"),
  };

  categories?.forEach((element, i) => {
    body.append(`categories[${i}].id`, element?.id);
  });

  for (let key in community) {
    if (
      community[key] &&
      community[key] != undefined &&
      community[key] != null &&
      community[key] != "null" &&
      community[key] != "undefined"
    ) {
      body.append(key, community[key]);
    }
  }

  const setting = {
    method: "PUT",
    body,
    bodyType: "formData",
  };

  const request = await fetchApiRequest(
    `community/${community?.id}`,
    setting,
    req
  );

  const messages = {
    success: getMessage("T004").replace("{community}", request?.data?.title),
    error: getMessage(request?.message),
  };

  const message = request?.success ? messages.success : messages.error;

  const response = {
    success: request?.success,
    ...request,
    message,
  };

  return NextResponse.json(response);
};
