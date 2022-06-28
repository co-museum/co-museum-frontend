import MyCollection from "./my-collection";
import {useEffect} from "react";
import {connectMembershipERC721} from "../backend/Membership";
import {useWeb3} from "@3rdweb/hooks";

const index = () => {

  const web3 = useWeb3();



  useEffect(() => {
    console.log(web3);
    if (web3.address) {
      connectMembershipERC721().then((contract) => {
        // console.log('contract',contract); // You can save this in console, and you can try all of methods from object
        // // Important: All of methods like redeem or similar methods you can call after contract.connect()
        // // You can try call
        // console.log('address', contract.address);
        // console.log(contract.connect().redeemGenesis());
        // // or
        // console.log(contract.connect().redeemFriend());
      });
    }
  }, [web3.address])
  return <MyCollection/>;
}


export default index;