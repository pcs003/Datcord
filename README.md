# Datcord

[Live Site](http://datcord-aa.herokuapp.com)

![Datcord Banner](/app/assets/images/Banner.png)

## Table of Contents
* [Background](#Background)
* [Technologies](#Technologies)
* [Features](#Features)
    * [UserAuth](#UserAuth)
    * [Servers](#Servers)
    * [Channels](#Channels)
    * [LiveChat](#LiveChat)

## Background
Datcord is a full stack web application inspired by the website Discord. The website allows users to create an account and sign in. As an account holder, users can open the discord app, join/leave servers, and send and receive messages live in server channels. If a user is the creator of a server, they can edit the server name, add/remove/edit channels, and delete the server. If a user does not want to sign up for an account, they can use the demo login and explore the discord app. 

This site was built on a Ruby on Rails framework for the backend with active record to avoid N+1 queries. PostgreSQL was used as the database to store the data. React and Redux were utilized to create a dynamic, single-page web app allowing users to smoothly navigate through the site. On the landing page, css animations are used to create a moving background. On the login/signup page, javascript canvas is used to render a bezier curve circle.

## Technologies
* Ruby on Rails
* React.js
* Redux.js
* Node.js
* Webpack
* PostgreSQL
* HTML
* CSS

## Features
* [UserAuth](#UserAuth)
* [Servers](#Servers)
* [Channels](#Channels)
* [LiveChat](#LiveChat)

### UserAuth
![Alt Text](https://media.giphy.com/media/cGKJgBe7W7KBB4dJPL/giphy.gif)

Upon navigating to the login/signup page, users can create a new account or log in to an existing one. If incorrect information is given or fields are missing, the form will indicate which fields need fixing. 

Log in authentication is done by sending an ajax request to the sessions controller and querying the postgres database for a user matching the information provided, if no user is found then the controller sends back an error message in json format. If a user is found, then a new session is created with that users information.

### Servers
A logged in user can create, view, and leave and server of which they are a member. If the user is the owner of the server, they can also update and delete.

#### View Servers
![Alt Text](https://media.giphy.com/media/7WbnGu08K9uNthGCUd/giphy.gif)

The server page has navbar on the left side in which you can scroll through all of the servers in which you are a member. Clicking on a server will open that server's page on the right. The server page includes a list of all of the server's channels, a view of the currenlty selected channel's chat, and a list of the members of the current server.

#### Create Servers
![Alt Text](https://media.giphy.com/media/qdczKBZ6cIvWgeGMgF/giphy.gif)

In the server navbar there is a tab that, when clicked, opens the create server modal. This modal allows you to create a new server with a name of your choice of which you will be the owner and have the ability to update and delete. A new server has a default General text and voice channel. The invite code for the server is on the server settings page to which only the owner has access.

#### Update Servers
![Alt Text](https://media.giphy.com/media/SoIjtizeYv28twTas6/giphy.gif)

As previously stated, only the server owner has access to the server settings page, which is where you can update the server info. Upon changing the server name, a popup will appear that lets you know that the name has been changed and you must click save changes to apply the change.

#### Leave Server
![Alt Text](https://media.giphy.com/media/JModWMMuvl4BSxfGmg/giphy.gif)

If you are not the owner, you can leave a server at any time by right clicking the server in the server nav and clicking 'Leave Server'. This immediately re-renders the page without that server and if you are currently on that server's page then it redirects to your home page.

#### Delete Server
![Alt Text](https://media.giphy.com/media/7VCbv24tI2bZOITBuX/giphy.gif)

If you are the owner, you can delete a server at any time by right clicking the server in the server nav and clicking 'Server Settings'. There, you can click delete server and a modal will pop up asking you to type the name of the server to confirm that you actually want to delete the server. Once finished, the server will be deleted from you page and all memebers' pages.

### Channels
The main content of a server is its channels. A server owner can create, update, and delete channels within any servers they own. Server members can view channels and participate in the channel chat.

#### Create Channels
![Alt Text](https://media.giphy.com/media/ntvEGp8Uk70wLz7rpK/giphy.gif)

A server owner can create a channel at any time by clicking the plus icon next to the 'Text Channels' or 'Voice Channels' header in the channel nav. Upon clicking it, a modal appears, prompting the user for the channel type (i.e. text or voice) and a channel name. Upon submitting the form, the channel will appear in the channel nav and can be opened.

#### Update Channels
![Alt Text]()

A server owner can update any channel within any server they own. To do so, the server owner can either right click the channel and select the 'Edit Channel' option or click the settings gear icon that appears upon selecting or hovering over a channel. Once in the channel settings menu, the functionality is similar to server settings in that a modal appears asking you to save changes if you make any changes to the channel.

#### Delete Channels
![Alt Text](https://media.giphy.com/media/MV9IIVGh6xMYMF6BVW/giphy.gif)

A server owner can delete any channel within any server they own. To do so, the server owner can either open the channel settings and click 'Delete Channel' or right click the channel and select 'Delete Channel'. Upon clicking 'Delete Channel' a modal will pop up asking you to confirm. After confirming, the channel will be removed from the server.

### LiveChat
A user can participate in live chat in both channels and in their private messages. This feature is implemented using rails actioncable and redis to manage web-socket connections. Separate channels and subscriptions are made for channel and private chat.

#### Channel Messaging
![Alt Text](https://media.giphy.com/media/DcrxhVreDZgxuIg9tV/giphy.gif)

All members of a server can participate in live messaging in any of that servers channels, each channel with its own message history. 

#### Private Messaging
![Alt Text](https://media.giphy.com/media/1ZjhXTBkIFPsrvhH8D/giphy.gif)

A user can start conversations with any of their friends by clicking the plus icon next to the direct messages header. There is a search bar in which you can search for a friend by their username. Once a conversation is created it will appear in the list of conversations in the nav on the left. If no message is sent in that conversation and you refresh the page, the conversation will remain, however, when you leave that conversation page it will disappear.
