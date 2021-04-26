var CryptoJS = require('crypto-js');
var MCrypt = require('mcrypt').MCrypt;

var cipher =
  "1jS3CuoTdWKlV/xzDsTZWcckBl4AcOOiKMcJzqHwrw78D7bqa5NYHY64/3fmGC6SFxlptVyybjb/5qs2uu/UgIgEbwto+mA1IdWr+tQPEm/6A7rm2uCWZkp5v9P6Hmo1McrmdQB0NU78hCEOoX+rfaF9fyXM8zWSYRB22GJzqcjjy9Kg++i2nQ=="; 

var key = "ff39fc173e7ed3c35e01d139e6042e64";

// KEY
var keyMD5 = CryptoJS.MD5(key);
var str = keyMD5.toString(CryptoJS.enc.Hex);
var keySubs = str.substr(0, 24); // format Hex

// cipher text buffer
var cipherText = Buffer.from(cipher, 'base64');

var desEcb = new MCrypt("tripledes", "ecb");
// set the key
desEcb.open(keySubs); 

var plaintext = desEcb.decrypt(cipherText);
var plainStr = plaintext.toString();
console.log(plainStr);


// -- untuk menghilangkan char char aneh awakakakak
//get block size
var block = desEcb.getBlockSize();

var packing = plainStr.charCodeAt(plainStr.length - 1);

if (packing && (packing < block)) {
    for (var P = plainStr.length - 1; P >= plainStr.length - packing; P--) {
        if (plainStr.charCodeAt(P) != packing) {
            packing = 0;
        }
    }
}

var final = plainStr.substr(0, plainStr.length - packing);

console.log(final);
