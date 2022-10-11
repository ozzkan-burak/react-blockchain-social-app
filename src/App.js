import {useEffect, useState} from 'react';
import {
  urlClinet,
  LENS_HUB_CONTRACT_ADRESS,
  queryRecommendedProfiles,
  queryExplorePublications,
} from './queries';
import LENS_HUB from "./lenshub.json";
import {ethers} from "ethers";
import {Box, Button, Image} from '@chakra-ui/react';

function App() {
  const [account, setAccount] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);

  const signIn = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_questAccounts",
    });
    setAccount(accounts[0]);
  }

 const getRecommendedProfiles = async () => {
  const response = await urlClinet.query(queryRecommendedProfiles)
    .toPromise();
  const profiles = response.data.recommendedProfiles.slice(0,5);
  setProfiles(profiles);
 }

  return (
    <div className="app">

    </div>
  );
}

export default App;
