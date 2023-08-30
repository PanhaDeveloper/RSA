function isPrime(number) {
    if (number < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }
  
  function generatePrime(minValue, maxValue) {
    let prime = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    while (!isPrime(prime)) {
      prime = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }
    return prime;
  }
  
  function modReverse(e, phi) {
    for (let d = 3; d < phi; d++) {
      if ((d * e) % phi === 1) {
        return d;
      }
    }
    throw new Error("modReverse does not exist");
  }
  
  function encrypt(message, e, n) {
    const messageEncode = Array.from(message).map((ch) => ch.charCodeAt(0));
    const cipherText = messageEncode.map(
      (ch) => BigInt(ch) ** BigInt(e) % BigInt(n)
    );
    return cipherText;
  }
  
  function decrypt(cipherText, d, n) {
    const messageDecode = cipherText.map(
      (ch) => BigInt(ch) ** BigInt(d) % BigInt(n)
    );
    const decryptedMessage = messageDecode
      .map((ch) => String.fromCharCode(Number(ch)))
      .join("");
    return decryptedMessage;
  }
  
  let p = generatePrime(100, 500);
  let q = generatePrime(100, 500);
  while (p === q) {
    q = generatePrime(100, 500);
  }
  let n = p * q;
  let phiN = (q - 1) * (p - 1);
  let e = Math.floor(Math.random() * (phiN - 1 - 3 + 1)) + 3;
  while (gcd(e, phiN) !== 1) {
    e = Math.floor(Math.random() * (phiN - 1 - 3 + 1)) + 3;
  }
  
  document.getElementById("btn").onclick = function () {
    let message = document.getElementById("text").value;
  
    if (message === "") {
      alert("Please enter a message to encrypt.");
      return;
    }
  
    let d = modReverse(e, phiN);
  
    alert(`Public Key = ${e}`);
    alert(`Private Key = ${d}`);
  
    let cipherText = encrypt(message, e, n);
    document.getElementById("ciText").innerHTML = `Ciphertext: ${cipherText}`;
  
    sessionStorage.setItem("privateKey", d);
    sessionStorage.setItem("nValue", n);
  };
  
  document.getElementById("btn2").onclick = function () {
    let privateKey = document.getElementById("privateKey").value;
    if (privateKey.trim() === "") {
      alert("Please Input Private Key");
    } else {
      let nValue = sessionStorage.getItem("nValue");
      let cipherText = document
        .getElementById("decryptText")
        .value.split(",")
        .map(Number);
      let decryptedMessage = decrypt(cipherText, privateKey, nValue);
      // document.getElementById("decryptedText").innerHTML = `Decrypted Message: ${decryptedMessage}`;
      alert(decryptedMessage);
    }
  };
  
  // Helper function for calculating the greatest common divisor (gcd)
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }
  