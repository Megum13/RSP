var json = {
    "timetable": {
        "uneven": [
            [
                1,
                2,
                3,
                0
            ],
            [
                5,
                1,
                6
            ],
            [
                6,
                5,
                4,
                1
            ],
            [
                6,
                3,
                7
            ],
            [
                7,
                2,
                8,
                9
            ]
        ],
        "even": [
            [
                1,
                2,
                3,
                4
            ],
            [
                5,
                1,
                6
            ],
            [
                6,
                5,
                4,
                1
            ],
            [
                3,
                3,
                7
            ],
            [
                7,
                2,
                8,
                9
            ]
        ]
    },
    "lessions": [{
            "name": "Консультации",
            "id": "Nil",
            "teacher": "Nil",
            "number": "Nil"
        },
        {
            "name": "Основы информационной безопасности",
            "id": "ОП.13",
            "teacher": "Макарова М.В.",
            "number": 407
        },
        {
            "name": "Менеджмент в проффессиональной деятельности",
            "id": "ОП.12",
            "teacher": "Потягов А.В.",
            "number": 202
        },
        {
            "name": "Технология разработки и защиты баз данных",
            "id": "МДК.11.01",
            "teacher": "Чмыга М.А.",
            "number": 407
        },
        {
            "name": "Правовое обеспечение профессиональной деятельности",
            "id": "ОП.05",
            "teacher": "Кирьянова В.В.",
            "number": 202
        },
        {
            "name": "Стандартизация, сертификация и техническое документирование",
            "id": "ОП.09",
            "teacher": "Кирьянова В.В.",
            "number": 202
        },
        {
            "name": "Численные методы",
            "id": "ОП.10",
            "teacher": "Ревизникова Т.В.",
            "number": 402
        },
        {
            "name": "Внедрение и поддержка компьютерных систем",
            "id": "МДК.04.01",
            "teacher": "Макарова М.В.",
            "number": 407
        },
        {
            "name": "Иностранный язык",
            "id": "ОГСЭ.04",
            "teacher": "Nil",
            "number": "Nil"
        },
        {
            "name": "Физическая культура",
            "id": "ОГСЭ.05",
            "teacher": "Nil",
            "number": "C3"
        }

    ],
    "times": [
        "9:15-10:45",
        "10:55-12:25",
        "12:45-13:30",
        "13:50-14:35",
        "14:45-16:15"
    ],
    "week": [

        {
            "start": "10.01",
            "end": "16.01",
            "isEven": true
        },
        {
            "start": "17.01",
            "end": "23.01",
            "isEven": false
        },
        {
            "start": "24.01",
            "end": "30.01",
            "isEven": true
        },
        {
            "start": "31.01",
            "end": "06.02",
            "isEven": false
        },
        {
            "start": "07.02",
            "end": "13.02",
            "isEven": true
        },
        {
            "start": "14.02",
            "end": "20.02",
            "isEven": false
        },
        {
            "start": "21.02",
            "end": "27.02",
            "isEven": true
        },
        {
            "start": "28.02",
            "end": "06.03",
            "isEven": false
        },
        {
            "start": "07.03",
            "end": "13.03",
            "isEven": true
        },
        {
            "start": "14.03",
            "end": "20.03",
            "isEven": false
        },
        {
            "start": "21.03",
            "end": "27.03",
            "isEven": true
        },
        {
            "start": "28.03",
            "end": "03.04",
            "isEven": false
        },
        {
            "start": "04.04",
            "end": "10.04",
            "isEven": true
        },
        {
            "start": "11.04",
            "end": "17.04",
            "isEven": false
        },
        {
            "start": "18.04",
            "end": "24.04",
            "isEven": true
        },
        {
            "start": "25.04",
            "end": "01.05",
            "isEven": false
        },
        {
            "start": "02.05",
            "end": "08.05",
            "isEven": true
        },
        {
            "start": "09.05",
            "end": "15.05",
            "isEven": false
        },
        {
            "start": "16.05",
            "end": "22.05",
            "isEven": true
        },
        {
            "start": "23.05",
            "end": "29.05",
            "isEven": false
        },
        {
            "start": "30.05",
            "end": "05.06",
            "isEven": true
        },
        {
            "start": "06.06",
            "end": "12.06",
            "isEven": false
        },
        {
            "start": "13.06",
            "end": "19.06",
            "isEven": true
        },
        {
            "start": "20.06",
            "end": "26.06",
            "isEven": false
        },
        {
            "start": "27.06",
            "end": "03.07",
            "isEven": true
        },
        {
            "start": "04.07",
            "end": "10.07",
            "isEven": false
        },
        {
            "start": "11.07",
            "end": "17.07",
            "isEven": true
        },
        {
            "start": "18.07",
            "end": "24.07",
            "isEven": false
        },
        {
            "start": "25.07",
            "end": "31.07",
            "isEven": true
        }
    ]
}

function createTable(json, isEven) {

    // Определить Even, переписать json

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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function AddQR() {

    let qrCodeOutput = document.getElementsByClassName("qrCodeOutput")[0];
    let text = window.location.origin + "?code=" + window.localStorage.code;
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
    } else if (localStorage.json != null && localStorage.json != "") {
        var j;
        try {
            j = JSON.parse(localStorage.json);
        } catch (e) {
            localStorage.json = null;
            ErrorPro(e);
        }

        AddTable();

        return;
    } else if (localStorage.code != "") { // Убрать
        GetData(localStorage.code);
    }

}

function GetData(code) {

    var xml = new XMLHttpRequest();
    xml.open("GET", "https://github.com/Megum13/d4rrR7p-280/blob/main/data.txt")
    xml.send();

    xml.onload = function() {

        var i = xml.response.indexOf("[%45]") + 5;
        var length = xml.response.indexOf("[%46]");
        var text = "";
        for (; i < length; i++) {
            text += xml.response[i];
        }
        localStorage.json = Coder(text, code);
        AddTable(JSON.parse(localStorage.json), true);
    }
    xml.onerror = function(e) {
        ErrorPro(e);
    }


}

function ErrorPro(e) {
    var error = document.getElementsByClassName("error")[0].children[0];
    var mainTable = document.getElementsByClassName("main_table")[0];
    var isEval = document.getElementsByClassName("is_eval")[0];

    error.style["display"] = "block"
    mainTable.style["display"] = "none"
    isEval.style["display"] = "none"

}

function AddTable() {
    var table = createTable(j, true); // Определить четность
    var mainTable = document.getElementsByClassName("main_table")[0];
    mainTable.innerHTML += table;
}

Start();