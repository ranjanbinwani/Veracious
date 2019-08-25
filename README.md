# Veracious - Adderall
*HaXplore Hackathon Project*

![Screenshot (155)](https://user-images.githubusercontent.com/26346816/63646310-14a08d00-c72e-11e9-9d8b-24f7f6dc37db.png)
### The Problem

Currently journalists belonging to different media houses have to find and write about content approved by the media houses, which are often manipulated and controlled by those in high power. These passionate journalists when try to reveal the truth behind scam, spying or corruption which is affecting the masses, are suppressed and have to face harsh consequences by a person in high post or having high power. Even if they try to publish evidences through various centralized sources are tracked down and punished. The truth never sees the light.

### Solution

We provide a *Decentralized platform for Journalism* providing anonymity to journalists who wish to relinquish the true facts behind the story involving war, spying, and corruption without facing harsh consequences by a person at a high post.We are using Decentralized storage with the help of IPFS and our platform is built on top of the Ethereum network (Rinkeby). Smart contracts are deployed with the help of truffle.

- The user uploads a document along with the description of the file (32 char).
- A real-time feed of the file uploads is available on the platform which is anonymous and stored using **IPFS**.
- A live preview of all the uploaded files and documents is visible on the portal.
- The person is also able to share a given document securely using a trustless platform with the help of **public-private key encryption**.
- We get the recipient public key corresponding to his/her private key.
- We encrypt the document using the receiver's public key and then send the *cypher object* to the recipient by any means of communication.
- The end-user is able to decrypt the corresponding document using his private key and no one in the middle can decrypt the document even if he knows the cypher-text.
- The website is hosted using the following two options - one is a decentralized approach using IPFS wherein the website is **Fully Decentralized** and the second way is deploying using **Amazon Web Services** using  **S3 bucket**.

### The Challenges We Faced
1. Storing all of the hashes of files stored on ipfs into our smart contract in order to get the feed for the users where they can see all the content that is uploaded by other users. We optimized and reduced the gas consumption on a particular transaction by storing the *IPFS hashes* in form of **Multihash** where we convert the *base58 encoded IPFS hash* into *hex* and break it into 3 parts:
```
struct Multihash {
  bytes32 hash
  uint8 hash_function
  uint8 size
}
```
2. Finding the CDNs/making methods/using Browserify for converting object into different data types, cause we can't use modules directly in vanilla JS.
3. Setting up the IPFS http-client and integrating the web3js library with the metamask.  

### Technologies & Modules used
1. Ethereum
2. Smart contracts
3. IPFS
4. eth-crypto
5. web3
6. window.IpfsHttpClient
7. ethereumjs-util
8. truffle-hdwallet-provider
9. ipfs-http-client
10. truffle-contract
11. Browserify

### Future Perspectives
- Secure sharing of files between one to many persons.
- To give users the functionality to share documents for a short period of time(self destructing link).

### Team Members
1. [Ayush Gupta](https://github.com/AK-007)
2. [Niraj Shubham](https://github.com/nirajx1d)
3. [Ranjan Binwani](https://github.com/ranjanbinwani)

![Screenshot (156)](https://user-images.githubusercontent.com/26346816/63646316-22561280-c72e-11e9-9d4c-7e6215333eff.png)

![Screenshot (158)](https://user-images.githubusercontent.com/26346816/63646322-313cc500-c72e-11e9-9c0b-afb3d8ad406c.png)

![Screenshot (159)](https://user-images.githubusercontent.com/26346816/63646375-46662380-c72f-11e9-9232-fc5de015aa30.png)
