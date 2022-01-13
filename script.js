function createTable(json, isEven) {
    var timetable = isEven ? json.timetable.even : json.timetable.uneven;
    var table = "";
    var weeks = ["Пн", "Вт", "Ср", "Чт", "Пт", ]

    for (var i = 0; i < timetable.length; i++) {

        var tr = "";

        for (var j = 0; j < timetable[i].length; j++) {

            var n = timetable[i][j];

            var name = json.lessions[n].name,
                id = json.lessions[n].id,
                teacher = json.lessions[n].teacher,
                number = json.lessions[n].number;

            tr += `
                <tr name="${name}" id="${id}" teacher="${teacher}" number="${number}">
                <td class="lessionName">${name}</td>
                <td width="29px">${number == "Nil" ? "" : number}</td>
                </tr>
                `;

        }

        table += ` 
        <table cellpadding="5" cellspacing="0px">
        <center>${weeks[i]}</center>
        <tr>
        <th>
            Предмет
        </th>
        <th>
            Каб
        </th>
        </tr>
        ${tr}
        </table>
        <br><br><br>
        `;

    }

    return table;

}

function AddQR() {

    let qrCodeOutput = document.getElementsByClassName("qrCodeOutput")[0];
    let text = location.href + "?code=" + window.localStorage.code;
    qrCodeOutput.innerHTML = "";
    qrCodeOutput.append(QRCode.generateHTML(text, {}))
}

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

function Start() {

    if (location.search != "") {
        var search = location.search.substr(1)
            .split('&')
            .reduce(function(res, a) {
                var t = a.split('=');

                res[decodeURIComponent(t[0])] = t.length == 1 ? null : decodeURIComponent(t[1]);
                return res;
            }, {});
        if (search.code != null)
            GetData(search.code);
        else
            ErrorPro();
    } else if (localStorage.code != "") { // Убрать
        GetData(localStorage.code);
    }

}

function GetData(code) {

    var xml = new XMLHttpRequest();
    xml.open("GET", "https://megum13.github.io/d4rrR7p-280/data.txt")
    xml.send();

    xml.onload = function() {
        var text = BinaryToText(xml.response)
        var json = Coder(text, code);
        var jsonParse = JSON.parse(json);
        AddTable(jsonParse, true);
    }
    xml.onerror = function(e) {
        ErrorPro(e);
    }

}

function BinaryToText(str) {

var newBin = str.split(" ");
var binCode = [];

for (i = 0; i < newBin.length; i++) {
    binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
  }
return binCode.join("");
}

function ErrorPro(e) {
    var error = document.getElementsByClassName("error")[0].children[0];
    var mainTable = document.getElementsByClassName("main_table")[0];
    var isEval = document.getElementsByClassName("is_eval")[0];

    error.style["display"] = "block"
    mainTable.style["display"] = "none"
    isEval.style["display"] = "none"

}

function AddTable(json) {
    var table = createTable(json, true); // Определить четность
    var mainTable = document.getElementsByClassName("main_table")[0];
    mainTable.innerHTML += table;
}

Start();
