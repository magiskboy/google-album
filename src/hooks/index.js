import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts";
import { GooglePhotoClient } from "../services";

export function useListAlbums(pageSize = 10) {
  const [albums, setAlbums] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();
  const { auth, authReload } = useAuth();

  const fetchNext = useCallback(async () => {
    if (auth) {
      const client = new GooglePhotoClient(
        `${auth.token_type} ${auth.access_token}`
      );
      let data;
      try {
        data = await client.getListAlbums(pageSize, nextPageToken);
      } catch (e) {
        if (e.message.startsWith("401")) {
          await authReload();
          data = await client.getListAlbums(pageSize, nextPageToken);
        }
      }
      setNextPageToken(data?.nextPageToken);
      setAlbums(data?.albums);
    }
  }, [auth, setAlbums, nextPageToken, authReload, pageSize]);

  useEffect(() => {
    fetchNext();
  }, [auth]);

  return { albums, fetchNext };
}

export function useListPhotoInAlbum(albumId, pageSize = 10) {
  const [photos, setPhotos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();
  const { auth, authReload } = useAuth();

  const fetchNext = useCallback(async () => {
    if (auth) {
      const client = new GooglePhotoClient(
        `${auth.token_type} ${auth.access_token}`
      );
      let data;
      try {
        data = await client.getPhotoInAlbum(albumId, pageSize, nextPageToken);
      } catch (e) {
        if (e.message.startsWith("401")) {
          await authReload();
          data = await client.getPhotoInAlbum(albumId, pageSize, nextPageToken);
        }
      }
      setNextPageToken(data?.nextPageToken);
      setPhotos(data?.mediaItems);
    }
  }, [auth, albumId, authReload, nextPageToken, pageSize]);

  useEffect(() => {
    fetchNext();
  }, [auth]);

  return { photos, fetchNext };
}

export function useDeviceInfo() {
  const isMobile = window.screen.availWidth < 660;
  return { isMobile };
}
