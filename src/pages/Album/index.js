import React from "react";
import { useListPhotoInAlbum, useDeviceInfo } from "../../hooks";
import { usePage } from "../../contexts";
import StackPaper from "../../components/PaperStack";
import Button from "../../components/Button";
import bgDesktop from "../../assets/images/bg-2-desktop.jpg";
import bgMobile from "../../assets/images/bg-2-mobile.jpg";
import "./style.scss";

export default function Album() {
  const { page, setPage } = usePage();
  const { photos, fetchNext } = useListPhotoInAlbum(page.params.albumId, 10);
  const { isMobile } = useDeviceInfo();

  return (
    <div className="Album BackApp">
      <div
        className="bg"
        style={{
          backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})`,
        }}
      ></div>
      <Button
        className="BackButton"
        onClick={() => {
          setPage("home");
        }}
      >
        Back
      </Button>
      <StackPaper
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
    </div>
  );
}
