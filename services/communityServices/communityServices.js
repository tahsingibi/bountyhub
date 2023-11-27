import { usePathname, useRouter, notFound } from "next/navigation";
import { useDispatch } from "react-redux";
import { actions as CommunityStore } from "../../stores/communityStore/communityStore";
import getToken from "@/utils/getToken";
import { FE_API_URL, fetchApiRequest } from "@/utils/fetchRequest";
import UseStorage, { storages } from "@/utils/useStorage";

export default function CommunityServices() {
  const { keyStorage, communityUpdateResult } = storages;
  const {
    setCommunityCategory: setStoreCommunityCategory,
    setSingleCommunity: setStoreSingleCommunity,
    setSettingResult: setStoreSettingResult,
  } = CommunityStore;
  const dispatch = useDispatch();
  const { getItem, setItem } = UseStorage();
  const path = usePathname();
  const community = path.split("/")[1];
  const router = useRouter();

  const setSettingResult = (res) => dispatch(setStoreSettingResult(res));

  async function getCommunityCategory() {
    const _tokens = await getToken();
    const authorization = _tokens?.token;
    const access = _tokens?.access;
    const _url = FE_API_URL + "community/categories";

    let settings = {
      headers: {
        authorization: authorization,
        access: access,
      },
    };

    const categoryRequest = await fetchApiRequest(_url, settings, null);
    if (categoryRequest?.success) {
      dispatch(setStoreCommunityCategory(categoryRequest?.data));
    }
  }

  async function createCommunity(info) {
    dispatch(setStoreSingleCommunity(null));

    const formData = new FormData();

    formData.append("Title", info.Title);
    formData.append("Description", info.Description);
    formData.append("Categories", JSON.stringify(info.Categories));
    formData.append("LogoFile", info.LogoFile);

    const _url = FE_API_URL + "community";

    const _tokens = await getToken();
    const authorization = _tokens?.token;
    const access = _tokens?.access;

    const userKey = getItem(keyStorage);

    const config = {
      method: "POST",
      body: formData,
      headers: {
        authorization: authorization,
        access: access,
        token: userKey,
      },
    };

    const request = await fetchApiRequest(_url, config, null);

    return request;
  }

  async function getCommunityInfo() {
    dispatch(setStoreSingleCommunity(null));

    const _tokens = await getToken();
    const authorization = _tokens?.token;
    const access = _tokens?.access;
    const _url = FE_API_URL + "community";

    let settings = {
      headers: {
        authorization: authorization,
        access: access,
        community,
      },
    };

    const result = await fetchApiRequest(_url, settings, null);

    if (!result.success) notFound();
    dispatch(setStoreSingleCommunity(result?.data));

    const isNotOwner =
      result?.data?.role != "Owner" && path.includes("/settings");

    if (isNotOwner) router.replace("/" + path?.split("/")[1]);

    return result;
  }

  async function updateCommunity(value) {
    const formData = new FormData();
    setSettingResult(null);

    for (let key in value) {
      if (key == "categories") {
        formData.append(key, JSON.stringify(value[key]));
      } else {
        formData.append(key, value[key]);
      }
    }

    const _url = FE_API_URL + "community";

    const _tokens = await getToken();
    const authorization = _tokens?.token;
    const access = _tokens?.access;

    const userKey = getItem(keyStorage);

    const config = {
      method: "PUT",
      body: formData,
      headers: {
        authorization: authorization,
        access: access,
        token: userKey,
      },
    };

    const request = await fetchApiRequest(_url, config, null);

    setSettingResult(request);

    if (request?.success) {
      if (community != request?.data?.slug) {
        setItem(communityUpdateResult, request?.message);
        const newUrl = new URL(
          process.env.APP_ADDRESS + "/" + request?.data?.slug + "/settings"
        );
        router.replace(newUrl.href);
        return;
      }
      await getCommunityInfo();
    }
    return request;
  }

  return {
    setSettingResult,

    getCommunityCategory,
    createCommunity,
    getCommunityInfo,
    updateCommunity,
  };
}
