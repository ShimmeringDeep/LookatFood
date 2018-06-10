$(document).ready(function () {

    var food = ["cookies", "pizza", "powdered toast", "fried chicken", "fried rice", "fried pizza", "tacos", "cheeseburger", "grilled cheese", "beef wellington", "peanut butter", "steak", "cotton candy", "turkey", "bolognese"]
    var lastClick;
    var APIkey = "aAYJseJflOLR5xFquBltYRe3VAttG2ad";
    var keepClick = 10;

    for (i = 0; i < food.length; i++) {
        var foodButton = $(`<button type="button" class="btn btn-secondary foodBtn">`)
        foodButton.text(food[i]);
        foodButton.val(food[i]);
        $("#btnPlace").append(foodButton);
    }

    $("#add-gif").on("click", function(event) {
        
        event.preventDefault();
        console.log("please");
        var gifText = $("#giftext").val().trim();
        console.log(gifText);
        var newBtn = $(`<button type="button" class="btn btn-secondary foodBtn">`)
        newBtn.text(gifText);
        newBtn.val(gifText);
        $("#btnPlace").append(newBtn);

    });

    $("body").unbind().on("click", ".foodBtn", function (e) {

        var btnClick = $(this).val()
        if (btnClick !== lastClick) {
            $("#gifPlace").empty();
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + btnClick + "&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data
                console.log(results)
                for (i = 0; i < results.length; i++) {
                    var gifDiv = $(`<div>`);
                    var gifImg = $("<img>").addClass("gifImg");
                    gifImg.attr("src", results[i].images.fixed_height_still.url);
                    gifImg.attr("data-moving", "no");
                    gifImg.attr("data-still", results[i].images.fixed_height_still.url)
                    gifImg.attr("data-animate", results[i].images.fixed_height.url)
                    gifDiv.append(gifImg);
                    $("#gifPlace").append(gifDiv)

                }
            });
            lastClick = btnClick;
            keepClick = 10
        }
        else {
            $("#gifPlace").empty();
            keepClick = keepClick + 10;
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + btnClick + "&limit=" + keepClick;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data
                console.log(results)
                for (i = 0; i < results.length; i++) {
                    var gifDiv = $(`<div>`);
                    var gifImg = $("<img>").addClass("gifImg");
                    gifImg.attr("src", results[i].images.fixed_height_still.url);
                    gifImg.attr("data-moving", "no");
                    gifImg.attr("data-still", results[i].images.fixed_height_still.url)
                    gifImg.attr("data-animate", results[i].images.fixed_height.url)
                    gifDiv.append(gifImg);
                    $("#gifPlace").append(gifDiv)

                }
            });
        }

    })

    $(document).on("click", ".gifImg", function(){
        var animated = $(this).attr("data-moving");
        var animatedGif = $(this).attr("data-animate");
        var stillGif = $(this).attr("data-still");
        console.log(animated);
        if (animated === "no"){
            $(this).attr("data-moving", "yes");
            $(this).attr("src", animatedGif);
        }
        else{
            $(this).attr("data-moving", "no")
            $(this).attr("src", stillGif)
        }
    })
});