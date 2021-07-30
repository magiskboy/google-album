import { useState, useEffect } from "react";
import { useAuth } from "../contexts";
import { GooglePhotoClient } from "../services";

const ALLOW_ALBUMS = [
  "AFQKIAIDtGHas7h0c5nnnlDez-2BSpsbZldeRUAaI0TEU3DY2ktGwZu6oDQff6w9M_CWnhK-823B",
  "AFQKIAIDT9DT3pScu6fNwkuooH8haUjBQdePIoesJqMg3LD4TypzWPRESMtZ5zoA97yzpL0g9Y1g",
  "AFQKIAIdl9voQbVKtwOROkREXucrQQ0GlXaCy8ZUSemJZsPCeXHG3DRnuwC99cMu0ARP-WzCL_zT",
];

export function useListAlbums(pageSize = 10) {
  const [albums, setAlbums] = useState([]);
  const [nextPageToken, setNextPageToken] = useState();
  const auth = useAuth();

  const fetchNext = async () => {
    if (auth) {
      const client = new GooglePhotoClient(auth.tokenObj);
      const data = await client.getListAlbums(pageSize, nextPageToken);
      setNextPageToken(data.nextPageToken);
      // setAlbums([...albums, ...data.albums]);
      setAlbums(data.albums.filter((item) => ALLOW_ALBUMS.includes(item.id)));
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
