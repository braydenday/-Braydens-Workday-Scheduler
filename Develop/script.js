// moment.format should bring the current time in from the js
$(document).ready(function () {
    let saveButton = $(".save-btn");
    let currentDay = $("#currentDay");
    let currentHour = moment().format("H");
    let allHours = $(".time-block");
    // shows todays date
    function displayToday() {
        let todaysDate = moment().format("MMMM DD, YYYY");
        currentDay.text(todaysDate);
    }
    displayToday();

    $("#clearFieldsBtn").click(function (event) {
        event.preventDefault;
        $("textarea").val("");
        localStorage.clear();
      });

    // loops through the allhours time-block defined above
    function timeComparison() {
        $.each(allHours, function (i) {
            var hourId = parseInt($(this).attr("id"));
            if (hourId === currentHour) {
                $(this).next().addClass("present");
            } else if (hourId < currentHour) {
                $(this).next().addClass("past");
            } else if (hourId > currentHour) {
                $(this).next().addClass("future");
            }
        });
    }
    timeComparison();

    // saves user inputs to local storage 
    function saveToStorage(event) {
        let userInput = $(event.target).parent().find(".form-control").val();
        // sets the time slot like above but sources value with id for each text
        let timeSlot = $(event.target).parent().find(".form-control").attr("id");
        // commits both of the values to local storage
        localStorage.setItem(timeSlot, userInput);
    }

    function getLocalStorage() {
        var hoursId = [];
        $('.form-control').each(function () {
            var id = $(this).attr('id');
            hoursId.push(id);
        });

        // loops through local storage and the array
        for (let i = 0; i < localStorage.length; i++) {
            for (j = 0; j < hoursId.length; j++) {
                if (localStorage.key(i) !== null && localStorage.key(i) !== undefined) {
                    if (localStorage.key(i) === hoursId[j]) {
                        let storedText = localStorage.getItem(localStorage.key(i));
                        $('#' + localStorage.key(i)).html(storedText);
                    }
                }
            }
        }
    }
    getLocalStorage();

    // save text to localstorage
    saveButton.on("click", saveToStorage);
});