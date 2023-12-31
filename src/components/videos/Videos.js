import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data, isLoading, isError } = useGetVideosQuery();

  /** <!-- content render --> */
  function contentRender() {
    let content = null;
    if (isLoading && !isError)
      content = (
        <>
          {" "}
          <VideoLoader />
          <VideoLoader />
          <VideoLoader />
          <VideoLoader />
          <VideoLoader />
          <VideoLoader />
          <VideoLoader />
        </>
      );
    if (!isLoading && isError && data?.length === 0)
      content = <Error message='there was an server error' />;
    if (!isLoading && !isError && data?.length > 0) {
      content = data?.map((video) => <Video key={video.id} video={video} />);
    }
    return content;
  }
  /** <!-- content render --> */

  return <>{contentRender()}</>;
}
