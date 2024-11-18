const { PinataSDK } = require("pinata-web3")
const fs = require("fs")
const { Blob } = require("buffer")
export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
    const pinata = new PinataSDK({
        pinataJwt: process.env.PINATA_JWT,
        pinataGateway: process.env.PINATA_GATEWAY,
      });

      const blob = new Blob([fs.readFileSync(file.path)]);
      console.log('blobb', blob);
      try {
        const upload = await pinata.upload.file(blob);
        return upload.IpfsHash;
      } catch (error) {
        
        return error.message;
      }

      
//use ipfs

}

