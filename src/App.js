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

  console.log(' ~ account', account);
  console.log(' ~ profiles', profiles);

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

 const getPosts = async () => {
  const response = await urlClinet.query(queryExplorePublications)
    .toPromise();

  const posts = response.data.explorePublications.items.filter((post) => {
    if(post.profile) return post;
    return "";
  });
  setPosts(posts);
 }

 async function follow(id) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    LENS_HUB_CONTRACT_ADRESS,
    LENS_HUB,
    provider.getSigner()
  );
  const tx = await contract.follow([parseInt(id)]);
  await tx.wait();
 }

 useEffect(()=> {
  getRecommendedProfiles();
  getPosts();
 }, [])

  return (
    <div className="app">
      <Box width="100%" backgroundColor="regb(5,32,64,28)">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="55%"
          margin="auto"
          color="white"
          padding="10px 0"
        >
          <Box>
            <Box fontFamily="DM Serif Display" fontSize="44px" fontStyle="italic">
              MerkeziSiz
            </Box>
            <Box>Merkeziyetsiz Sosyal Medya Uygulaması</Box>

          </Box>
          {
              account ? (
                <Box backgrounColor="000" padding="15px" borderRadius="6pc">
                  Bağlandı
                </Box>
              ) : <Button onClick={signIn} color="rgba(5,32,64)" _hover={{backgroundColor: "#080808", color:"white"}}>Giriş Yap</Button>
            }
        </Box>
      </Box>
      {/* ----- CONTENT ---- */}

      <Box>
        
      </Box>
    </div>
  );
}

export default App;
