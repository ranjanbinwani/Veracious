var ipfs = window.IpfsHttpClient({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https"
});
var buffer = [];
var ipfsHash;
var web3 = window.web3;
var storageInstance;
var contracts = {};
var account;
var fileName;
var MAP = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

/* Below Base58 implementation is taken from https://gist.github.com/diafygi/90a3e80ca1c2793220e5/ */

var to_b58 = function(
    B,            //Uint8Array raw byte input
    A             //Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
) {
    var d = [],   //the array for storing the stream of base58 digits
        s = "",   //the result string variable that will be returned
        i,        //the iterator variable for the byte input
        j,        //the iterator variable for the base58 digit array (d)
        c,        //the carry amount variable that is used to overflow from the current base58 digit to the next base58 digit
        n;        //a temporary placeholder variable for the current base58 digit
    for(i in B) { //loop through each byte in the input stream
        j = 0,                           //reset the base58 digit iterator
        c = B[i];                        //set the initial carry amount equal to the current byte amount
        s += c || s.length ^ i ? "" : 1; //prepend the result string with a "1" (0 in base58) if the byte stream is zero and non-zero bytes haven't been seen yet (to ensure correct decode length)
        while(j in d || c) {             //start looping through the digits until there are no more digits and no carry amount
            n = d[j];                    //set the placeholder for the current base58 digit
            n = n ? n * 256 + c : c;     //shift the current base58 one byte and add the carry amount (or just add the carry amount if this is a new digit)
            c = n / 58 | 0;              //find the new carry amount (floored integer of current digit divided by 58)
            d[j] = n % 58;               //reset the current base58 digit to the remainder (the carry amount will pass on the overflow)
            j++                          //iterate to the next base58 digit
        }
    }
    while(j--)        //since the base58 digits are backwards, loop through them in reverse order
        s += A[d[j]]; //lookup the character associated with each base58 digit
    return s          //return the final base58 string
}


var from_b58 = function(
    S,            //Base58 encoded string input
    A             //Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
) {
    var d = [],   //the array for storing the stream of decoded bytes
        b = [],   //the result byte array that will be returned
        i,        //the iterator variable for the base58 string
        j,        //the iterator variable for the byte array (d)
        c,        //the carry amount variable that is used to overflow from the current byte to the next byte
        n;        //a temporary placeholder variable for the current byte
    for(i in S) { //loop through each base58 character in the input string
        j = 0,                             //reset the byte iterator
        c = A.indexOf( S[i] );             //set the initial carry amount equal to the current base58 digit
        if(c < 0)                          //see if the base58 digit lookup is invalid (-1)
            return undefined;              //if invalid base58 digit, bail out and return undefined
        c || b.length ^ i ? i : b.push(0); //prepend the result array with a zero if the base58 digit is zero and non-zero characters haven't been seen yet (to ensure correct decode length)
        while(j in d || c) {               //start looping through the bytes until there are no more bytes and no carry amount
            n = d[j];                      //set the placeholder for the current byte
            n = n ? n * 58 + c : c;        //shift the current byte 58 units and add the carry amount (or just add the carry amount if this is a new byte)
            c = n >> 8;                    //find the new carry amount (1-byte shift of current byte value)
            d[j] = n % 256;                //reset the current byte to the remainder (the carry amount will pass on the overflow)
            j++                            //iterate to the next byte
        }
    }
    while(j--)               //since the byte array is backwards, loop through it in reverse order
        b.push( d[j] );      //append each byte to the result
    return new Uint8Array(b) //return the final byte array in Uint8Array format
};
function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}
$(document).ready(function() {
  /* NavBar transition and smooth scrolling */
  $(window).scroll(function() {
    if ($(this).scrollTop() >= $(".home").height() - 100) {
      $(".navbar").addClass("solid");
    } else {
      $(".navbar").removeClass("solid");
    }
  });
  $("#navbar a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          window.location.hash = hash;
        }
      );
    }
  });

  /* Drag and Drop Transitions and file upload*/

  $form = $(".upload-zone");
  $form
    .on("drag dragstart dragend dragover dragenter dragleave drop", function(
      e
    ) {
      e.preventDefault();
      e.stopPropagation();
    })
    .on("dragover dragenter", function() {
      $form.addClass("is-dragover");
      $(".upload-border").addClass("is-dragover2");
    })
    .on("dragleave dragend drop", function() {
      $form.removeClass("is-dragover");
      $(".upload-border").removeClass("is-dragover2");
    })
    .on("drop", function(ev) {
      ev.preventDefault();
      $(ev.originalEvent.dataTransfer.files).each(function() {
        fileName = this.name;
        var reader2 = new FileReader();
        reader2.onload = function(e) {
          buffer = new Uint8Array(reader2.result);
          buffer = window.IpfsHttpClient.Buffer(buffer);
          $(".rt").hide();
          $("#fileN").html(fileName);
        };
        reader2.readAsArrayBuffer(this);
      });
    });

  /* Getting web3 ready */
  var web3Provider;
  if (typeof web3 !== "undefined") {
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
    console.log("Injected web3 detected");
  } else {
    web3Provider = new Web3.providers.HttpProvider(
      "http://rinkeby.infura.io/v3/0dc8e842be5f45bc838891057d6340d5"
    );
    /* web3 for Ganache */
    // web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    // web3 = new Web3(web3Provider);
  }
  $.getJSON("Storage.json", function(storage) {
    contracts.Storage = TruffleContract(storage);
    contracts.Storage.setProvider(web3Provider);
    contracts.Storage.deployed().then(function(instance) {
      storageInstance = instance;
      storageInstance
      .getCount.call({ from: account })
      .then(c => {
        for(let i=1;i<c;i++){
          storageInstance.getEntry.call(i, { from: account })
            .then(ipfsH => {
              var [_digest, _hashFunction, _size] = ipfsH;
              _hashFunction = _hashFunction.toNumber().toString();
              _size = _size.toNumber().toString();
              _digest = _digest.slice(2);
              var multihash = _hashFunction + _size + _digest;
              multihash = new Uint8Array(multihash.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
              var _ipfsHash = to_b58(multihash,MAP);
              $('.list-group').append(`<li>https://ipfs.io/ipfs/${_ipfsHash}</li>`);
            });
        }
      });
    });
  });
  web3.eth.getAccounts((err, accounts) => {
    if (err) {
      console.log(err);
    }
    account = accounts[0];
  });

  /* Input through Upload button */

  function readURL(input) {
    if (input.files && input.files[0]) {
      fileName = input.files[0].name;
      var reader2 = new FileReader();
      reader2.onload = function(e) {
        buffer = new Uint8Array(reader2.result);
        buffer = window.IpfsHttpClient.Buffer(buffer);
        $(".rt").hide();
        $("#fileN").html(fileName);
      };
      reader2.readAsArrayBuffer(input.files[0]);
    }
  }

  $("#fileUpload").change(function() {
    readURL(this);
  });
  /* Uploading file to IPFS and making transaction */

  $(".pub").click(function() {
    $(this).removeClass("clicked");
    setTimeout(function() {
      $(".pub").addClass("clicked");
    }, 10);
    $(".pub").hide();
    $("#loading").show();
    ipfs.add(buffer, (err, result) => {
      if (err) {
        console.log("Error is " + err);
        return;
      }
      ipfsHash = result[0].hash; // base58 encoded multihash
      ipfsHash = ipfsHash.toString();
      $(".ipfsLink").html(`Your IPFS Link : https://ipfs.io/ipfs/${ipfsHash}`);
      $('.list-group').append(`<li>https://ipfs.io/ipfs/${ipfsHash}</li>`);
      var decoded = toHexString(from_b58(ipfsHash,MAP)).toUpperCase();
      var digest= `0x${decoded.slice(4)}`;
      var hashFunction = parseInt(decoded[0]+decoded[1]);
      var size= parseInt(decoded[2]+decoded[3]);
      storageInstance
        .addFile(digest, hashFunction, size,{ from: account })
        .then(() => {
          $(".pub").show();
          $("#loading").hide();
          $(".rt").show();
          $("#fileN").html("");
        });
    });
  });
});
