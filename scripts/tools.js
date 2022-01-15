function Coder(input, key) {
    var inp, k;
    var output = "";

    key = key.repeat(100);

    for (i = 0; i < input.length; i++) {
        inp = input.charCodeAt(i);
        k = key.charCodeAt(i);
        output += String.fromCharCode(inp ^ k);
    }

    return output;
}

function BinaryToText(str) {
    var newBin = str.split(" ");
    var binCode = [];

    for (i = 0; i < newBin.length; i++) {
        binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
    }
    return binCode.join("");
}

function TextToBinary(string) {
    return string.split('').map(function(char) {
        return char.charCodeAt(0).toString(2);
    }).join(' ');
}