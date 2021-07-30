import { useState, useEffect } from "react";
import { useAuth } from "../contexts";
import { GooglePhotoClient } from "../services";

export function useListAlbums(pageSize = 10) {
  const [albums, setAlbums] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();
  const auth = useAuth();

  const fetchNext = async () => {
    if (auth) {
      const client = new GooglePhotoClient(auth.tokenObj);
      const data = await client.getListAlbums(pageSize, nextPageToken);
      setNextPageToken(data.nextPageToken);
      setAlbums([...albums, ...data.albums]);
    }
  };

  useEffect(() => {
    fetchNext();
  }, [auth]);

  return { albums, fetchNext };
}

export function useListPhotoInAlbum(albumId, pageSize = 10) {
  const [photos, setPhotos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();
  const auth = useAuth();

  const fetchNext = async () => {
    if (auth) {
      const client = new GooglePhotoClient(auth.tokenObj);
      const data = await client.getPhotoInAlbum(
        albumId,
        pageSize,
        nextPageToken
      );
      setNextPageToken(data.nextPageToken);
      // setPhotos([...photos, ...data.mediaItems]);
      setPhotos(
        data.mediaItems.filter((item) => item.mimeType.startsWith("image"))
      );
    }
  };

  useEffect(() => {
    fetchNext();
  }, [auth]);

  return { photos, fetchNext };
}
