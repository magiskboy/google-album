import React, { useState, useEffect, useCallback } from "react";
import { useListAlbums, useDeviceInfo } from "../../hooks";
import { usePage, useAuth } from "../../contexts";
import PaperStack from "../../components/PaperStack";
import Button from "../../components/Button";
import bgDesktop from "../../assets/images/bg-1-desktop.jpg";
import bgMobile from "../../assets/images/bg-1-mobile.jpg";
import "./style.scss";

export default function Home() {
  const { albums } = useListAlbums(49);
  const { setPage } = usePage();
  const { logout } = useAuth();
  const [currentAlbum, setCurrentAlbum] = useState(0);

  useEffect(() => {
    albums && albums.length > 0 && setCurrentAlbum(albums.length - 1);
  }, [albums]);

  const handleClickItem = useCallback(
    (item) => {
      setPage({
        name: "album",
        params: {
          albumId: item.id,
        },
      });
    },
    [setPage]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handlePushoutItem = useCallback(() => {
    setCurrentAlbum(currentAlbum - 1);
  }, [currentAlbum]);

  const { isMobile } = useDeviceInfo();

  return (
    <div className="Home BackApp">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})`,
        }}
      ></div>
      <Button className="LogoutButton" onClick={handleLogout}>
        Logout
      </Button>
      <PaperStack
        papers={albums.map((item) => ({
          id: item.id,
          url: item.coverPhotoBaseUrl,
          width: undefined,
          height: undefined,
          title: item.title,
        }))}
        onPushoutItem={handlePushoutItem}
        onClickItem={handleClickItem}
      />
    </div>
  );
}
