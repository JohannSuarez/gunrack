# Gunrack

Repository containing the works on GUN development.

Gun is a decentralized protocol for syncing data. Data is stored in a graph database by peers called "nodes", making it capable of storing SQL-like tables, JSON-like documents, and even for files and livestreaming.


### Resources

- [Docs](https://gun.eco/docs/API)
- [Working Session Notes](https://www.notion.so/fa6405a159474e2b812125fa10baea67?v=69cd2f36361a44e495cfc6bc5b05dbf6&p=f8c940a1221746bf8f29d055f2269685)

## Field Guide

### The Two Views of GUN

- Client
    - Connecting to a GUN app and interacting with the chat (for example)
    - No extra configuration is needed
- Host (A Node)
    - Hosting a node that syncs with the network specified, allowing private uses to connect *to your node*.
    - This is where `start_node.ts` comes into play
----
#### Example 

> Just like video games, there's a different set of software needed to host your own server where people can join you through your public IP but, you can connect to servers as a client without any extra setup.
----
### Initialization

In order to get up and running with GUN, you will need
to install a few prerequisites. 


----
#### Requirements:

- Git
- NodeJS
- npm
- TypeScript

#### Steps:

Clone the repository.

```
git@github.com:longtailfinancial/gunrack.git
```

Install the required dependencies.
```
npm install
```


### Hosting a Node

> I'll write what I understand LOL

In order to host a GUN Node, you will ofcourse need an internet connection / system to communicate with other computers on the network.

Hosting a node can be done on a variety of devices, examples include

- Laptops
- Raspberry Pi's (implied from laptops)
- Remote Linode Servers
- Phones can connect / interact but we haven't seen a use case for it to act as a Node.


### Connecting to a Node

To connect to a Node, they need to be running a Gun server using http and with a port open.
A Node script has been provided for this as **dist/start_node.js**.

The connecting client does not need this setup, and simply needs to have the **server's url** + **'/gun'** provided in the Gun constructor of their NodeJS code/Webpage's javascript.
Example here:

![](https://i.imgur.com/P7BAoqs.png)



### Studying the examples

The Gun package comes pre-installed with a handful of examples.
From the root of the repo, go to:
```
node_modules/gun/examples
```
The examples ( mostly in.html ) will work on their own without prior setup as JavaScript code is already embedded in them using *< script >*  tags. Gun will create a local storage to save data generated from these examples.

