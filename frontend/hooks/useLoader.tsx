import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useLoading() {
  const { events } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const enableLoader = () => setIsLoading(true);
  const disableLoader = () => setIsLoading(false);

  useEffect(() => {
    events.on("routeChangeStart", enableLoader);
    events.on("routeChangeComplete", disableLoader);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      events.off("routeChangeStart", enableLoader);
      events.off("routeChangeComplete", disableLoader);
    };
  }, [events]);

  return { isLoading };
}
