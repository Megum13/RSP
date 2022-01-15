function createTable(json, isEven) {


    let table = "";
    let spanEven = "";
    let weeks = ["Пн", "Вт", "Ср", "Чт", "Пт", ]

    let nowWeek = getWeekDay();
    if (nowWeek == "Сб" || nowWeek == "Вс") {
        isEven = isEven ? isEven = false : isEven = true;
        spanEven = isEven ? `<div class="span_even_green"> Ч </div>` : `<div class="span_even_red"> НЧ </div>`
    }
    let timetable = isEven ? json.timetable.even : json.timetable.uneven;


    table += `
    <center class="Сб" style="${nowWeek == "Сб" ? "color: lightgreen" : ""}">Сб</center>
    <br>
    <center class="Вс" style="${nowWeek == "Вс" ? "color: lightgreen" : ""}">Вс</center>
    <br>
    
    ${spanEven}
    <br>
    `

    for (let i = 0; i < timetable.length; i++) {

        let tr = "";

        for (var j = 0; j < timetable[i].length; j++) {

            var n = timetable[i][j];

            var name = json.lessions[n].name,
                id = json.lessions[n].id,
                teacher = json.lessions[n].teacher,
                number = json.lessions[n].number;

            tr += `
                <tr class="lession">
                    <td class="lessionName">${name}
                        <br>
                        <br>
                        <b class="lessionTeacher">${teacher}</b> 
                        <div class="lessionCode">${id}</div>
                    </td>
                    <td class="lessionNumber">${number}</td>
                </tr>
                `;

        }

        table += ` 
        <table cellpadding="12" cellspacing="0px">
            <center class="${weeks[i]}" style="${nowWeek == weeks[i] ? "color: lightgreen" : ""}">${weeks[i]}</center>
            <tr>
            <th class = "lessionNameH">
                Предмет
            </th>
            <th class = "lessionCodeH">
                Каб
            </th>
            </tr>
            ${tr}
            </table>
        <br>
        <br>
        <br>
        `;

    }

    return table;

}

function AddTable(json) {
    let eval = EvalLocate(json);
    let table = createTable(json, eval);
    let mainTable = document.getElementsByClassName("main_table")[0];
    mainTable.innerHTML += table;

    // Прокрутка
    let week = getWeekDay();
    if (week != "Сб" && week != "Вс") document.getElementsByClassName(week)[0].scrollIntoView();
}

function getWeekDay() {
    var date = new Date();
    let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    return days[date.getDay()];
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
    } else {
        ErrorPro();
    }
}

function GetData(code) {
    var xml = new XMLHttpRequest();
    xml.open("GET", "/data.txt")
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

function ErrorPro(e) {
    var error = document.getElementsByClassName("error")[0].children[0];
    var mainTable = document.getElementsByClassName("main_table")[0];

    error.style["display"] = "block"
    mainTable.style["display"] = "none"

    console.log(e);
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

        if (startDay <= day && endDay >= day && startMonth <= month && endMonth >= month) {
            isEval = json.week[i].isEven;
            break;
        }
    }

    if (isEval) {
        document.body.innerHTML += `   
        <div class="is_eval">
        <div class="eval" style="margin-left: 8px; color: lightgreen">Ч</div>
        </div>`
    } else {
        document.body.innerHTML += `   
        <div class="is_eval">
        <div class="" style="margin-left: 5px; color: tomato">НЧ</div>
        </div>`
    }
    return isEval;
}

function TimeDetector() {

    let date = new Date();
    setInterval(function() {

        let hour = date.getHours();
        let second = date.getSeconds();

    }, 1000 * 60);

}

Start();
TimeDetector();