import { useGetRelatedVideoQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ video }) {
  const { title, id } = video;

  const {
    data: videos,
    isLoading,
    isError,
  } = useGetRelatedVideoQuery({ title, id });

  /** <!-- render content --> */
  function contentRender() {
    let content = null;
    if (isLoading) {
      content = (
        <>
          <RelatedVideoLoader />
          <RelatedVideoLoader />
          <RelatedVideoLoader />
          <RelatedVideoLoader />
        </>
      );
    }

    if (!isLoading && isError) {
      content = <Error message='there was an error!' />;
    }

    if (!isLoading && !isError && videos.length === 0) {
      content = <Error message='related video not found!' />;
    }

    if (!isLoading && !isError && videos.length > 0) {
      content = (
        <>
          {videos?.map((video) => (
            <RelatedVideo key={video.id} video={video} />
          ))}
        </>
      );
    }
    return content;
  }
  /** <!-- render content --> */

  return (
    <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto'>
      {contentRender()}
    </div>
  );
}
