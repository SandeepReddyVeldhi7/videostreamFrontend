function ChannelVideos() {
  const channelId = useSelector((store) => store.auth?.user?._id);
  const {
    data: channelVideos,
    isFetching,
    isFetched,
  } = useVideos({ userId: channelId });

  

  if (isFetching) {
    return (
      <div className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
          {Array(8)
            .fill()
            .map((_, index) => (
              <LoadingSpinner key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (isFetched && channelVideos?.data?.videos?.length === 0) {
    return <div>No videos found.</div>;
  }

  return (
    <div className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        {channelVideos?.data?.videos?.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
