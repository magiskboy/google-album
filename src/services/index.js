export class GooglePhotoClient {
  constructor(token) {
    this.token = token;
  }

  async getListAlbums(pageSize = 10, nextPageToken = null) {
    let url = `https://photoslibrary.googleapis.com/v1/albums?&pageSize=${pageSize}`;
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });

    if (resp.status !== 200) {
      throw new Error(`${resp.status}: Fail to load list albums`);
    }
    const data = await resp.json();
    return data;
  }

  async getPhotoInAlbum(albumId, pageSize = 10, nextPageToken = null) {
    let url = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
    const bodyParams = {
      albumId: albumId,
      pageSize: pageSize,
      pageToken: nextPageToken,
    };
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: this.token,
      },
      body: JSON.stringify(bodyParams),
    });
    if (resp.status !== 200) {
      throw new Error(`${resp.status}: Fail to load list photo in the album`);
    }
    const data = await resp.json();
    return data;
  }
}
