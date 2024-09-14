import React, { useEffect, useState } from "react";
import { getChannelSubscribers } from "../api/dashboard.api"; // Adjust the path as needed

const ChannelSubscriber = ({ channelId }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await getChannelSubscribers(channelId);
        setSubscribers(data.data); // Assuming the response data is in 'data.data'
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch subscribers");
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [channelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Subscribers</h2>
      <ul>
        {subscribers.map((subscriber) => (
          <li key={subscriber._id} className="flex items-center space-x-4">
            <img
              src={subscriber.avatar}
              alt={subscriber.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{subscriber.username}</h3>
              <p>{subscriber.fullName}</p>
              <p>{subscriber.subscribersCount} Subscribers</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelSubscriber;
