

async function info_profile_sock(image_contenedor){
    
        const selectorNFTs = document.getElementById('selector_NFTs').value;
        
        const accounts = await web3.eth.getAccounts();
        const myAddress = accounts[0];
        //alert('Conectado con éxito a MetaMask. Dirección de la cuenta: ' + myAddress);
            
        const contract = new web3.eth.Contract(NFT_ContractABI, nftContractAddress);
       
    
        try {
            
            const codeHexaImage = await contract.methods.getimagecodeHexaFromUsername(selectorNFTs).call();     
          
            const info_username = await contract.methods.getNFTInfoByUsername(selectorNFTs).call();
            const total_minted_NFT = await contract.methods.getTotalMintedNFTs().call();
            
             alert('info' +" "+ info_username+ "*/* " + total_minted_NFT;

             //function transferNFT(address to, string memory username)

            await loadImagesFromHex(codeHexaImage,image_contenedor,"big");                           

        }catch (error) {   
            
            console.error('Error:', error);
        }
    
}