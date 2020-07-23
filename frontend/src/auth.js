import api from "./services/api";

export const isAuthenticated = () => false;

const oauthToken = async (requestData) => {
  requestData.client_id = process.env.REACT_APP_API_CLIENT_ID;
  requestData.client_secret = process.env.REACT_APP_API_CLIENT_SECRET;
  requestData.scope = "*";

  try {
    let oauth = await api.post("/oauth/token", requestData);

    if (oauth.status === 200) {
      return oauth.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const login = async (data) => {
  let oauthTk = await oauthToken(data);

  if (!oauthTk) {
    return false;
  }

  registerTokens({
    access_token: oauthTk.access_token,
    refresh_token: oauthTk.refresh_token,
    grant_type: data.grant_type,
    provider: data.provider,
  });

  return true;
};

const registerTokens = (toRegister) => {
  for (const key in toRegister) {
    localStorage.setItem(key, toRegister[key]);
  }
};
