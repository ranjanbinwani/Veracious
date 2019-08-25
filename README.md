# Veracious - Adderall
HaXplore Hackathon Project

### The Problem

Media bias occurs when the media systematically skews reporting in a way that crosses standards of professional journalism. Claims of media bias include claims of conservative bias, corporate bias, liberal bias, and mainstream bias. A variety of watchdog groups combat this by fact-checking both biased reporting and unfounded claims of bias, and some characterise individual news outlets by perceived bias. A variety of scholarly disciplines study media bias. Many news outlets make no pretence of being unbiased, and give their readers or listeners the news they want, leading to what has been called post truth politics.

Currently people fear the consequences of providing evidences of something happening illegal around them and those who act brave and come forward, often end up facing harsh consequences.

### Solution

We provide a Decentralized platform for those who wish to relinquish the true facts behind the story. The users get a platform where they can remain anonymous and upload censored articles, images and videos into the IPFS like those involving war, spying and corruption. We are using Decentralized storage with the help of IPFS and our platform is built on top of the Ethereum network (Rinkeby). Smart contracts are deployed with the help of truffle.

- The user uploads a document along with the description of the file (32 char).
- A real-time feed of the file uploads is available on the platform which is anonymous and stored using ipfs.
- A live preview of all the uploaded files and documents is visible on the portal.
- The person is able to share a given document securely using a trustless platform with the help of public-private encryption.
- We get the recipient public key corresponding to his/her private key.
- We encrypt the document using the receiver's public key and then send the cypher object to the recipient by any means of communication.
- The end-user is able to decrypt the corresponding document using his private key and no one in the middle can decrypt the document.
- The website is hosted using the following two options - one is a decentralized approach using ipfs the website is completely decentralized and the second way by being deployed using amazon web services using  s3 bucket.

### The Challenges We Faced
Storing all of the hashes of files stored on ipfs into our smart contract in order to get the feed for the users where they can see all the content that is uploaded by other users. 

Setting up the IPFS http-client and integrating the web3js library with the metamask.  

### Future Perspectives
Secure sharing of files between one to many persons.
