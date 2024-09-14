import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChannelSubscribers } from "../api/subscription.api"; // Import your API function
import LoadingSpinner from "../pages/LoadingSpinner";
import { toast } from "react-hot-toast"; // Import toast

const ChannelSubscribers = () => {
  const { username } = useParams(); // Get username from route parameters
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setIsLoading(true);
      try {
        const data = await getChannelSubscribers(username);
        setSubscribers(data);

        if (data.length === 0) {
          toast("No subscribers found."); // Toast for no subscribers
        } else {
          toast.success("Subscribers loaded successfully!"); // Toast for successful fetch
        }
      } catch (error) {
        console.error("Failed to fetch channel subscribers", error);
        setIsError(true);
        toast.error("Failed to fetch subscribers."); // Error toast
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, [username]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching subscribers.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Subscribers</h2>
      {subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <ul>
          {subscribers.map((subscriber) => (
            <li
              key={subscriber._id}
              className="flex items-center space-x-4 mb-4"
            >
              <img
                src={subscriber.avatar}
                alt={`${subscriber.username}'s avatar`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{subscriber.username}</p>
                <p className="text-sm text-gray-500">{subscriber.fullName}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelSubscribers;
