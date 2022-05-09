$(function() {
    //page init
    $(".calendar-button button").click(saveScheduleEvent);

    //start the program
    loadScheduleEvents();
    updateScheduleColors();
});

function loadScheduleEvents() {
    let planner = loadPlanner();
    for (let hour in planner) {
        $("div[data-hour="+hour+"] .calendar-event").html(planner[hour]);
    }
}

function updateScheduleColors() {
    //use moment libary to set the colors for the calendar
    let hour = moment().format('H');
    hour = 12;
    for (let i = 9; i <= 17; i++) {
        switch (true) {
            case (i < hour):
                $("div[data-hour="+i+"] .calendar-event").css('background-color', 'lightgray');
                break;
            case (i == hour):
                $("div[data-hour="+i+"] .calendar-event").css('background-color', 'salmon');
                break;
            case (i > hour):
                $("div[data-hour="+i+"] .calendar-event").css('background-color', 'lightgreen');
                break;
        }
    }
}

function saveScheduleEvent() {
    //get all the stuff we need to save this properly
    let parent = $(this).parent().parent();
    let hour = $(parent).data('hour');
    let event = $(parent).find(".calendar-event").html();

    //update planner for that time slot with current event detail
    let planner = loadPlanner();
    planner[hour] = event;
    return savePlanner(planner);
}

function loadPlanner() {
    //get planner from local storage
    let planner = localStorage.getItem('planner');
    
    //return blank object if nothing stored yet
    if (planner === null) {
        planner = {};
    } else {
        //decode the data that came from local storage
        planner = JSON.parse(planner);
    }

    return planner;
}

function savePlanner(planner) {
    return localStorage.setItem('planner', JSON.stringify(planner));
}
