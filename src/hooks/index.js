import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts";
import { GooglePhotoClient } from "../services";

export function useListAlbums(pageSize = 10) {
  const [albums, setAlbums] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();
  const { auth, authReload } = useAuth();

  const fetchNext = useCallback(async () => {
    if (auth) {
      const client = new GooglePhotoClient(auth, authReload);
      const data = await client.invoke(
        "getListAlbums",
        pageSize,
        nextPageToken
      );
      setNextPageToken(data?.nextPageToken);
      setAlbums(data?.albums);
    }
  }, [auth, setAlbums, nextPageToken, authReload, pageSize]);

  useEffect(() => {
    fetchNext();
  }, [auth]);

  return { albums, fetchNext };
}

export function useDeviceInfo() {
  const isMobile = window.screen.availWidth < 660;
  return { isMobile };
}
