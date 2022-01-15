function CreateTable(json, isEven) {

    let table = "";
    let spanEven = "";
    let weeks = ["Пн", "Вт", "Ср", "Чт", "Пт", ]

    let nowWeek = getWeekDay();
    if (nowWeek == "Сб" || nowWeek == "Вс") isEven = isEven ? isEven = false : isEven = true;
    spanEven = isEven ? `<div class="span_even_green"> Ч </div>` : `<div class="span_even_red"> НЧ </div>`

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
                        ${number == "" ? "" : "<br>"}
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
    let even = EvenDeterminant(json);
    let table = CreateTable(json, even);
    let mainTable = document.getElementsByClassName("table")[0];
    mainTable.innerHTML += table;

    ScrollToWeekElement();
    EvenElementAdd(even);

    // ТЕСТ
    //TimeDetector();
}

function ScrollToWeekElement() {
    let week = getWeekDay();
    document.getElementsByClassName(week)[0].scrollIntoView();
}

function EvenElementAdd(isEven) {
    if (isEven) {
        document.getElementsByClassName("table")[0].innerHTML += `
        <div class="is_even" style="    margin-right: -14px;color: lightgreen">
            <div>Ч</div>
        </div>
        `
    } else {
        document.getElementsByClassName("table")[0].innerHTML += `
        <div class="is_even" style="color: tomato">
            <div>НЧ</div>
        </div>
        `
    }
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
        if (search.key != null)
            GetData(search.key);
        else
            ErrorPro();
    } else {
        ErrorPro();
    }
}

function GetData(key) {
    var xml = new XMLHttpRequest();
    xml.open("GET", "https://megum13.github.io/RSP/data.txt");
    xml.send();

    xml.onload = function() {
        try {
            let json = EncodeToJson(xml.response, key);
            AddTable(json);
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
    var mainTable = document.getElementsByClassName("table")[0];

    error.style["display"] = "block"
    mainTable.style["display"] = "none"

    console.log(e);
}

function EvenDeterminant(json) {

    let now = new Date();
    var day = now.getDate()
    var month = now.getMonth() + 1;
    var isEven;

    for (var i = 0; i < json.week.length; i++) {

        var start = json.week[i].start;
        var end = json.week[i].end;

        var startDay = parseInt(start.split(".")[0]),
            startMonth = parseInt(start.split(".")[1]),
            endDay = parseInt(end.split(".")[0]),
            endMonth = parseInt(end.split(".")[1]);

        if (startDay <= day && endDay >= day && startMonth <= month && endMonth >= month) {
            isEven = json.week[i].isEven;
            break;
        }
    }

    return isEven;
}

function TimeDetector() {
    let tableArray = document.getElementsByTagName("table");
    let tbody = tableArray[0];
    let date = new Date();

    tbody.innerHTML += `<div class="time_detector"></div>`

    setInterval(function() {

        let hour = date.getHours();
        let second = date.getSeconds();

    }, 1000 * 60);

}

Start();
