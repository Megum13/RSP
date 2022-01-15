function EncodeToJson(string, key) {
    let text = BinaryToText(string)
    let json = Encoder(text, key);
    return JSON.parse(json);
}

function Encoder(input, key) {
    let inp, k;
    let output = "";
    for (i = 0; i < input.length; i++) {
        inp = input.charCodeAt(i);
        k = key.charCodeAt(i % key.length);
        output += String.fromCharCode(inp ^ k);
    }
    return output;
}

function BinaryToText(str) {
    let newBin = str.split(" ");
    let binCode = [];
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

function getWeekDay() {
    var date = new Date();
    let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    return days[date.getDay()];
}