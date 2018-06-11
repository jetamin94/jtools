import * as common from "./src/common";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const wallet_url = '../getAdress/wallet_demo.csv'

const wallets = fs.readFileSync(wallet_url, 'utf8')
const walletsArr = wallets.split('\r\n');
console.log('start...', walletsArr);

const params = {
  // startblock: 1,
  // endblock: 10,
  apikey: '',
  action: 'tokentx',
  page: 1,
  offset: 10,
  sort: 'desc'
}

// let data = {};
let txns = [];
let content = ''

for (let address of walletsArr) {
  params.address = address;
  const url = common.requestAPI(params)
  const xhttp = new XMLHttpRequest();
  console.log('Sending request...')
  xhttp.open("GET", url, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  let { result } = JSON.parse(xhttp.responseText)
  txns = txns.concat(result);
  txns = common.addType(txns, address);
}

// const newtxns = common.getNewTxns(txns, 864000);

// fs.writeFile('Txns2.json', JSON.stringify({ result: txns }), function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });



console.log(txns.length)
const contracttxn = common.combineTxns(txns);

fs.writeFile('Txns3.json', JSON.stringify({ result: contracttxn }), function (err) {
  if (err) throw err;
  console.log('Saved!');
});