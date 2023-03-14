import axios from "axios";
import { getAntyData } from "entities/antyData/publicApi";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    getAntyData().then(({ id, baseUrl, apiToken, apiVersion }) => {
      axios(`${baseUrl}/browser_profiles/${id}`, {
        headers: {
          Authorization: apiToken,
          "X-Anty-App-Version": apiVersion,
        },
      }).then(({ data }) => {
        console.log(data);
      });
    });
  }, []);

  return <div>anty app</div>;
};

export default App;
