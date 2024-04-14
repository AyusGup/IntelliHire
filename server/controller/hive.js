const { Client } = require('hivesigner');
const session = require('express-session');
const {handlenewUser} = require('./user');

const client = new Client({
    app: 'ag8350961', // Replace 'your-app-name' with your actual app name
    callbackURL: 'http://localhost:3000/', // Replace with your callback URL
    accessToken: '',
    scope: ['custom_json', 'comment', 'vote'] 
});

async function login(req,res){
    const loginURL = client.getLoginURL(); // Get the login URL
    console.log(loginURL)
    res.json({
        url: loginURL
    }); // Redirect the user to the loginURL

}

async function logout(req,res){
    console.log("logout")
    client.revokeToken(function (err, res) {
        console.log(err, res)
    });

    res.send("logout sucessfully")
}

async function callback(req,res){
    const { access_token, username } = req.query; // Get the authorization code from the query parameters
 
  client.setAccessToken(access_token)
  try {
    // Exchange the authorization code for an access token
    // Store the access token in session (you can store it in a database as well)
    req.session.accessToken = access_token;
    req.session.username = username;

  //  console.log(req.session.accessToken, req.session.username)
    client.me()
    .then((res)=>{
        console.log(res)
        handlenewUser(username, res.user_metadata.profile.profile_image)
    });
    
    // Redirect the user to a logged-in page or perform other actions
    // res.send(req.sessionID);
    res.send("welcome to intellihire");
  } catch (error) {
    // Handle errors appropriately
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
}

async function submitCustomJson(req,res){
    // Check if the user is logged in (e.g., by checking for the presence of the access token)
    // if (!req.session.accessToken) {
    //     console.log("not logged in")
    //     return res.redirect('/login');
    // }
    const {token, username} = req.query;
    if(!token){
        return res.send("not logged in");
    }
    // client.me(function (err, res) {
    //   console.log(err, res)
    // });

    // Check if the account has the required authority
    // const accountInfo = await client.me();
    // console.log(accountInfo.account.auths)
    // const hasAuthority = accountInfo.account.auths.some(auth => auth[0] === 'custom_json');

    // if (!hasAuthority) {
    //   throw new Error('Account does not have required authority to perform custom JSON operations');
    // }

    console.log("custom json")
    const requiredAuths = []; // Accounts required to authorize the operation
    const requiredPostingAuths = [username]; // Accounts required to post the operation
    const id = 'this is first to go'; // Unique identifier for the operation
    const data = { message: 'Hello, Hive!' }; // JSON data to submit to the blockchain
    const json = JSON.stringify(data);
    let tid = 'ghis';
    await client.customJson(requiredAuths, requiredPostingAuths, id, json, function (err, res) {
        if (err) {
        console.error('Error broadcasting custom JSON operation:', err, req.session.username);
        } else {
        console.log('Custom JSON operation broadcasted successfully:', res.result.id);
        tid = res.result.id;
        }
    });

    // client.vote("ag8350961", "david-doran", "vibes-web3-music-contest-week", 10000, function (err, res) {
    //   console.log(err, res)
    // });
    console.log(tid)
    res.send(tid);
}

module.exports = {login, logout, callback, submitCustomJson};