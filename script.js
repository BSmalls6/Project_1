$("#go").on("click", function (event) {
    event.preventDefault();
    // get todays date

    // Here we grab the text from the input box
    var city = $("#cityInput").val();
    // The API key
    var apiKey = "166a433c57516f51dfab1f7edaed8413";


    // Here we construct our URL
    var WeatherqueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city +"&cnt=5"+ "&appid=" + apiKey;

    var Uvquery;
// Ajax call for current weather
    $.ajax({
        url: WeatherqueryURL,
        method: "GET"
    }).then(function (response) {
        var temp = Math.floor(JSON.stringify((response.main.temp) - 273.15) * 9 / 5 + 32);
        var humidity = JSON.stringify(response.main.humidity);
        var windSpeed = JSON.stringify(response.wind.speed);
        var latitude = JSON.stringify(response.coord.lat);
        var longitude = JSON.stringify(response.coord.lon);
        var weatherIcon = JSON.stringify(response.weather[0].main)
        // var UV = uvresult.value;
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (forecast) {
            // var forTemp = Math.floor(((forecast.main.temp) - 273.15) * 9 / 5 + 32);
            console.log(forecast);
        });
        // call the uv api, get the results 

        // $.ajax({
        //     url: Uvquery,
        //     method: "GET"
        // }).then(function (uvresult) {
        //     console.log(uvresult);
        // });


        // console.log(response);
        // console.log(temp);
        // console.log(humidity);
        // console.log(windSpeed);
        // console.log(latitude);
        // console.log(longitude);
        // console.log(weatherIcon);

        // query url to find the uv, which lives in it's own api call

        // Uvquery = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude + "";



        var today = new Date();
        var todate = (today.getMonth() + 1) + '/' + today.getDate(); +'/' + today.getFullYear();
        // console.log(response);
        
        // create a ul for the search history
        var historyBox = $("<div></div>");
        var searchHistory = $("<button>").text(city);
        historyBox.attr("class", "list-group");
        historyBox.append(searchHistory);
        $(".searchBox").append(historyBox);

       
    //    create div for weather numbers to fit in
        var weatherNums = $("<div></div>");

        var weatherIcon = JSON.stringify(response.weather[0].main)
        
        function chooseIcon(){
        if (weatherIcon === "clouds") {
           dateP.append('<i class="fas fa-cloud"></i>');
        } 
        else if (weatherIcon === "clear") {
            dateP.append('<i class="far fa-sun"></i>');
        }  
        else if (weatherIcon === "rain") {
            dateP.append('<i class="fas fa-cloud-rain"></i>');
        }      
        else if (weatherIcon === "sunny") {
            dateP.append('<i class="fas fa-sun"></i>');
        } 
        else {
            dateP.append('<i class="fas fa-poo-storm"></i>');
        }
    };

        // // Creating a paragraph tag with the result item's rating
        var dateP = $("<h2>").text("date: " + todate);
        var tempP = $("<p>").text("Temp: " + temp);
        var humP = $("<p>").text("Humidity: " + humidity);
        var windP = $("<p>").text("Wind Speed: " + windSpeed);
        // var uvP = $("<p>").text("UV: " + UV);
        // uvP.attr("id", "uvValue");


        // // need to add CSS classes to style.css
        weatherNums.attr("class", "weatherText");

        // // Appending the paragraph and image tag to the Div
        chooseIcon();
        weatherNums.append(dateP, tempP, humP, windP);
        console.log(weatherNums);

        //     Get the Date

        // // show the date
        // $(".results").html(date);

        // // Prependng the weatherNums to the HTML page in the "results" div
        $(".result").html(weatherNums);
    });
});