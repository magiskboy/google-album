async function getListAlbums(token, pageSize = 10, nextPageToken = null) {
  let url = `https://photoslibrary.googleapis.com/v1/albums?&pageSize=${pageSize}`;
  if (nextPageToken) {
    url += `&pageToken=${nextPageToken}`;
  }
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (resp.status !== 200) {
    throw new Error(`${resp.status}: Fail to load list albums`);
  }
  const data = await resp.json();
  return data;
}

async function getPhotoInAlbum(
  token,
  albumId,
  pageSize = 10,
  nextPageToken = null
) {
  let url = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
  const bodyParams = {
    albumId: albumId,
    pageSize: pageSize,
    pageToken: nextPageToken,
  };
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(bodyParams),
  });
  if (resp.status !== 200) {
    throw new Error(`${resp.status}: Fail to load list photo in the album`);
  }
  const data = await resp.json();
  return data;
}

export class GooglePhotoClient {
  constructor(auth, authReload) {
    this.auth = auth;
    this.authReload = authReload;
  }

  getToken() {
    return `${this.auth.token_type} ${this.auth.access_token}`;
  }

  async invoke(action, ...args) {
    let invoker;
    switch (action) {
      case "getListAlbums":
        invoker = getListAlbums;
        break;
      case "getPhotoInAlbum":
        invoker = getPhotoInAlbum;
        break;
      default:
        throw new Error(`Can't found action ${action}`);
    }

    let data;
    try {
      data = await invoker(this.this.getToken(), ...args);
    } catch {
      await this.authReload();
      data = await invoker(this.getToken(), ...args);
    }
    return data;
  }
}
