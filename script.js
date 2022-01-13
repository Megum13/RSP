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
    let text = location.href;
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
    }
}

function GetData(code) {
    var xml = new XMLHttpRequest();
    xml.open("GET", "https://megum13.github.io/d4rrR7p-280/data.txt")
    xml.send();

    xml.onload = function() {
        try {
            var text = BinaryToText(xml.response)
            var json = Coder(text, code);
            var jsonParse = JSON.parse(json);
            AddTable(jsonParse);
        } catch (e) {
            ErrorPro(e);
        }
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
    var eval = EvalLocate(json);
    var table = createTable(json, eval); // Определить четность
    var mainTable = document.getElementsByClassName("main_table")[0];
    mainTable.innerHTML += table;

}

function EvalLocate(json) {

    let now = new Date();
    var day = now.getDate()
    var month = now.getMonth() + 1;
    var isEval;

    for (var i = 0; i < json.week.length; i++) {

        var start = json.week[i].start;
        var end = json.week[i].end;

        var startDay = parseInt(start.split(".")[0]),
            startMonth = parseInt(start.split(".")[1]),
            endDay = parseInt(end.split(".")[0]),
            endMonth = parseInt(end.split(".")[1]);

        console.log(`${startDay}.${startMonth}    ${endDay}.${endMonth}            ${day} ${month}`)
        if (startDay <= day && endDay >= day && startMonth <= month && endMonth >= month) {
            isEval = json.week[i].isEven;
            break;
        }
    }

    if (isEval) {
        document.body.innerHTML += `   
        <div class="is_eval">
        <div class="eval" style="margin-left: 8px; color: green">Ч</div>
        </div>`
    } else {
        document.body.innerHTML += `   
        <div class="is_eval">
        <div class="" style="margin-left: 5px; color: red">НЧ</div>
        </div>`
    }
    return isEval;
}

Start();
