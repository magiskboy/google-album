import React, { useState, useCallback, useEffect } from "react";
import { useDeviceInfo, useListAlbums } from "../../hooks";
import { useAuth } from "../../contexts";
import { GooglePhotoClient } from "../../services";
import StackPaper from "../../components/PaperStack";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import bgDesktop from "../../assets/images/bg-2-desktop.jpg";
import bgMobile from "../../assets/images/bg-2-mobile.jpg";
import "./style.scss";

export default function Home() {
  const { albums } = useListAlbums(49);
  const { isMobile } = useDeviceInfo();
  const [showMenuAlbum, setShowMenuAlbum] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState();
  const { auth, authReload } = useAuth();
  const [photos, setPhotos] = useState();
  const [nextPhotosToken, setNextPhotosToken] = useState();

  const turnOnMenuAlbum = useCallback(
    () => setShowMenuAlbum(true),
    [setShowMenuAlbum]
  );
  const turnOffMenuAlbum = useCallback(
    () => setShowMenuAlbum(false),
    [setShowMenuAlbum]
  );

  const fetchNext = async () => {
    const client = new GooglePhotoClient(auth, authReload);
    const data = await client.invoke(
      "getPhotoInAlbum",
      currentAlbum.id,
      10,
      nextPhotosToken
    );
    setNextPhotosToken(data?.nextPageToken);
    setPhotos(data?.mediaItems);
  };

  useEffect(() => {
    (async function () {
      if (currentAlbum) {
        const client = new GooglePhotoClient(auth, authReload);
        const data = await client.invoke(
          "getPhotoInAlbum",
          currentAlbum.id,
          10
        );
        setNextPhotosToken(data?.nextPageToken);
        setPhotos(data?.mediaItems);
      }
    })();
  }, [currentAlbum, auth]);

  useEffect(() => albums, [albums]);

  const handleMenuItemClicked = (item) => {
    setCurrentAlbum(item);
    turnOffMenuAlbum();
  };

  return (
    <div className="Home BackApp">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})`,
        }}
      ></div>
      {!!albums && albums.length > 0 ? (
        <Button className="ShowAlbumMenuButton" onClick={turnOnMenuAlbum}>
          Albums
        </Button>
      ) : (
        <Loading className="ShowAlbumMenuButton" />
      )}
      {!!albums && albums.length > 0 && (
        <Sidebar className={`MenuAlbum ${showMenuAlbum ? "Show" : "Hidden"}`}>
          <ul className="AlbumList">
            {albums.map((item) => (
              <li
                className="AlbumItem"
                key={item.id}
                onClick={() => handleMenuItemClicked(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </Sidebar>
      )}
      {!!photos && photos.length > 0 && (
        <StackPaper
          onClick={turnOffMenuAlbum}
          onNext={fetchNext}
          papers={photos
            .filter((item) => item.mimeType.startsWith("image/"))
            .map((item) => ({
              id: item.id,
              url: item.baseUrl,
              width: item.mediaMetadata.width,
              height: item.mediaMetadata.height,
              title: item.filename,
            }))}
        />
      )}
    </div>
  );
}
