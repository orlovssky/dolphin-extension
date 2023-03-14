import { getAntyApiVersion, getAntyData } from "entities/antyData/publicApi";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    getAntyApiVersion().then((e) => {
      console.log(e);
    });

    console.log(getAntyData());
  }, []);

  return <div>asdasd</div>;
};

export default App;
