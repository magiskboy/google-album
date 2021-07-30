import { useListAlbums } from "../../hooks";
import AlbumItem from "../../components/AlbumItem";
import "./style.scss";

export default function Home() {
  const { albums } = useListAlbums();
  return (
    <div className="Home">
      {albums.map((item) => (
        <AlbumItem key={item.id} data={item} />
      ))}
    </div>
  );
}
