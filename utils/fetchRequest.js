import GetToken from "./getToken";

export const BE_API_URL = process.env.BE_API_URL;
export const FE_API_URL = process.env.APP_ADDRESS + "/api/";

function bearerToken(token) {
  const _prefix = "Bearer ";

  if (token && !token?.startsWith(_prefix)) {
    return _prefix + token;
  }

  return token;
}

let fetchRequestController = null;
let beforeRequestPath;
export default async function fetchRequest(path, settings) {
  const performRequest = async () => {
    const _tokens = await GetToken();
    const beToken = _tokens?.token;
    const feToken = _tokens?.access;

    let authorization = beToken || settings.authorization || null;
    let access = feToken || settings.access || null;

    let _bearer = bearerToken(authorization);

    const config = {
      method: "GET",
      headers: {
        authorization: _bearer,
        access: access,
      },
      "Content-Type": "application/json",
      onSuccess: () => {},
      onError: () => {},
      onLoading: () => {},
      onFinally: () => {},
    };

    if (settings) Object.assign(config, settings);

    if (
      settings.abort &&
      fetchRequestController &&
      path === beforeRequestPath
    ) {
      fetchRequestController.abort();
    }

    fetchRequestController = new AbortController();
    beforeRequestPath = path;

    config.onLoading(true);
    config.onError(null);
    config.signal = fetchRequestController.signal;

    try {
      const request = await fetch(FE_API_URL + path, config);
      const response = await request.json();

      if (request.status === 401 && !path?.includes("user/")) {
        await GetToken({ force: true, setReady: () => {}, key: null });
        await performRequest();
      } else if (response.success) {
        config.onSuccess(response);
      } else {
        config.onError(response.message);
      }
    } catch (error) {
      config.onError(error);
    } finally {
      config.onLoading(false);
      config.onFinally();
    }
  };

  await performRequest();
}
let fetchApiRequestController = null;
let beforeApiReqPath;

export async function fetchApiRequest(path, settings, req) {
  const performRequest = async () => {
    const auth =
      settings?.headers?.authorization ||
      req?.headers?.get("authorization") ||
      null;

    let _bearer = bearerToken(auth);

    let config = {
      method: "GET",
      headers: {
        authorization: _bearer,
      },
    };

    if (settings?.bodyType != "formData") {
      config.headers["Content-Type"] = "application/json";
    }

    if (settings) Object.assign(config, settings);

    beforeApiReqPath = path;
    fetchApiRequestController = new AbortController();
    config.signal = fetchApiRequestController.signal;

    const requestUrl = path.startsWith("http") ? path : BE_API_URL + path;

    const request = await fetch(requestUrl, config);
    const response = await request.json();

    if (request.status === 401 && !path?.includes("user/")) {
      await GetToken({ force: true, setReady: () => {}, key: null });
      await performRequest();
    }

    return response;
  };

  return performRequest();
}
