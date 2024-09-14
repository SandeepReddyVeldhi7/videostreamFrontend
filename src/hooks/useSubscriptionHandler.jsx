import { useState } from "react";
import { toast } from "react-hot-toast";
import toggleSubscription from "../api/user.api";

export const useSubscriptionHandler = (ownerId) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscription = async () => {
    try {
      const response = await toggleSubscription(ownerId);
      setIsSubscribed(response.data.isSubscribed);
    } catch (error) {
      console.error("Failed to toggle subscription", error);
      toast.error("Error toggling subscription");
    }
  };

  return { isSubscribed, handleSubscription };
};
