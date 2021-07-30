import { useState } from "react";
import { usePage } from "../../contexts";
import "./style.scss";

export default function AlbumItem(props) {
  const { data } = props;
  const { setPage } = usePage();
  const handleClick = () => {
    setPage({
      name: "album",
      params: {
        albumId: data.id,
      },
    });
  };

  return (
    <div className="Album" onClick={handleClick}>
      <img src={`${data.coverPhotoBaseUrl}=w200`} alt={data.title} />
      <h6>{data.title}</h6>
    </div>
  );
}
