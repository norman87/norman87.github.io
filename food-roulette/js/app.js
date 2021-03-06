// let map

$(()=> {
    let padding = {top:5, right:40, bottom:0, left:0};
    let width = 600 - padding.left - padding.right;
    let height = 600 - padding.top  - padding.bottom;
    let radius = Math.min(width, height)/2;
    let rotation = 0;
    let picked = 0;

    let color = d3.scale.category20b();

    let restaurantData = [
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }},
        {restaurant: {
          name: "ANYTHING LAH!",
        }}
    ];

    let svg = createSVG(restaurantData, width, padding, height);

    let container = createContainer(svg, width, padding, height);

    let vis = container
        .append("g")
        .attr("id", "wheelCon");

    let pie = d3.layout.pie().value( (d) =>{
        return 1;
    });

    let arc = d3.svg.arc().innerRadius(0).outerRadius(radius);

    let arcs = vis.selectAll()
        .data(pie)
        .enter()
        .append("g")
        .attr("class", "slice");

    function spinningAnimation(vis, rotTween, picked, restaurantData) {
        vis.transition()
            .duration(3000)
            .attrTween("transform", rotTween)
            .each("end", function () {
                console.log(restaurantData[picked].restaurant.name);
            });
    }

    function appendTextToWheel(arcs, radius, restaurantData) {
        arcs.append("text").attr("transform", function (d) {
            d.innerRadius = 0;
            d.outerRadius = radius;
            d.angle = (d.startAngle + d.endAngle) / 2;
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
        })
            .attr("text-anchor", "end")
            .text(function (d, i) {
                return restaurantData[i].restaurant.name;
            });
    }

    function drawWheel(arcs, color, arc) {
        arcs.append("path")
            .attr("fill", function (d, i) { return color(i); })
            .attr("d", function (d) { return arc(d); })
            .attr("stroke", "white")
            .style("stroke-width", "2px");
    }

    function createContainer(svg, width, padding, height) {
        return svg.append("g")
            .attr("transform", "translate(" + (width / 2 + padding.left) + "," + (height / 2 + padding.top) + ")");
    }

    function createSVG(restaurantData, width, padding, height) {
        return d3.select('#chart').append("svg").data([restaurantData])
            .attr("width", width + padding.left + padding.right)
            .attr("height", height + padding.top + padding.bottom);
    }

    function drawSpinningWheel () {
        drawWheel(arcs, color, arc);
        appendTextToWheel(arcs, radius, restaurantData);

    };

    function checkIfImageAvailable (imageUrl) {
        if (imageUrl === "") {
            return "https://tfkru2exl1c11xfih48h8lmg6y-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/image-coming-soon.jpg";
        }
        else {
            return restaurantData[picked].restaurant.featured_image;
        }
    }

    drawSpinningWheel();

    function checkIfNull (value) {
        if(value === "") {
            return "Not Available"
        }
        else {
            return value;
        };
    }

    function rotTween(to) {
        let i = d3.interpolate(0, rotation);
        return function(t) {
        return "rotate(" + i(t) + ")";
        };
    }

    function spin(d){
        let pieSlice = 360/restaurantData.length;
        let rng = Math.floor((Math.random() * 1440) + 360);

        rotation = (Math.round(rng / pieSlice) * pieSlice);
        console.log(rng);
        picked = Math.round((restaurantData.length) - (rotation % 360)/pieSlice);
        if (picked === 10) {
            picked = 0;
        }

        console.log(picked);
        rotation += 90 - Math.round(pieSlice/2);

        spinningAnimation(vis, rotTween, picked, restaurantData);

        soundEffect('sounds/spinning_soundeffect.wav');

        $('#modalTitle').text(restaurantData[picked].restaurant.name).css("font-size", "60px");


        $('#restaurantTiming').remove();
        $('#popUpContent > .row').eq(0).append($('<h3>').attr("id", "restaurantTiming").text("Opening Hours: "+ checkIfNull(restaurantData[picked].restaurant.timings)));

        $('#phoneNumber').remove();
        $('#popUpContent > .row').eq(1).append($('<h3>').attr("id", "phoneNumber").text("Contact Number: "+ checkIfNull(restaurantData[picked].restaurant.phone_numbers)));

        $('#webSiteLink').remove();
        $('#popUpContent > .row').eq(2).append($('<a>').attr({"id": "webSiteLink", "href": restaurantData[picked].restaurant.url, "target": "_blank"}).text("Check out our website!"));

        $('#goThere').remove();
        $('#popUpContent > .row').eq(3).append($('<a>').attr({"id": "goThere", "href": "http://maps.google.com/?q="+ restaurantData[picked].restaurant.location.latitude +", "+ restaurantData[picked].restaurant.location.longitude, "target": "_blank"}).text("Check out our location!"));

        $('.row > img').remove();
        $('#popUpContent > .row').eq(4).append($('<img>').attr("src", checkIfImageAvailable(restaurantData[picked].restaurant.featured_image)));

        // $('#map').remove();
        // $('#popUpContent > .row').eq(4).append($('<div>').attr('id','map'))

        // initMap(parseFloat(restaurantData[picked].restaurant.location.latitude), parseFloat(restaurantData[picked].restaurant.location.longitude));

        // initMap();

        setTimeout(function() {
            $('#popUpModal').modal('show');
            soundEffect('sounds/tada.flac');
        }, 3000);


    }

    // cretae spin logo and triangle pointer
        svg.append("g")
        .attr("transform", "translate(" + (width + padding.left + padding.right) + "," + ((height /2)+padding.top) + ")")
        .append("path")
        .attr("d", "M-" + (radius*.15) + ",0L0," + (radius*.05) + "L0,-" + (radius*.05) + "Z")
        .style({"fill":"black"});
        container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 60)
        .style({"fill":"white","cursor":"pointer"});
        container.append("text")
        .attr("x", 0)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("SPIN")
        .style({"font-weight":"bold", "font-size":"30px"});

// API portion
    let geoData = getCurrentGeoData();

    function shuffle(array) {
    for (let i= array.length - 1; i>0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    };

    function getCurrentGeoData() {
        let geoData = {
            currentLatitude: null,
            currentLongitude: null
         }
        navigator.geolocation.getCurrentPosition( (position)=> {
            geoData.currentLatitude = position.coords.latitude;
        });

        navigator.geolocation.getCurrentPosition( (position)=> {
            geoData.currentLongitude = position.coords.longitude;
        });

        return geoData;
    };

    // function appendRestaurantNamesIntoTable (restaurant) {
    //     $('#restaurantList > tbody').append($('<tr>').append($('<td>').text(restaurant)));
    // }

    function appendRestaurantNamesIntoTable (restaurant) {
        $('#restaurantList > tbody').append($('<tr>').append($('<td>').append($('<a>').attr({"href": restaurant.url, "target": "_blank"}).text(restaurant.name))));
    }

    //tried to show an embedded google maps but can't get it to work. used an alternative method to bring user to google maps in a new browser tab

    // let map;

    // function initMap (latitude, longitude) {
    //     map = new google.maps.Map($('#map'), {
    //         center: {lat: latitude, lng: longitude},
    //         zoom: 8
    //     });
    // }

    // function initMap (latitude, longitude) {
    //     map = new google.maps.Map(document.getElementById('map'), {
    //         center: {lat: -34.397, lng: 150.644},
    //         zoom: 8
    //     });
    // }

    function soundEffect (soundUrl) {
        let sound = new Audio(soundUrl);
        sound.play();
    }

    $('#updateWheel').on("click", (event)=> {

        event.preventDefault();

        soundEffect('sounds/button_click.wav');

        container.on("click", spin);

        console.log(geoData);

        let nearestSelect = 0;

        if ($('#nearestSelect').val() === 'Nearest 10!') {
            nearestSelect = 10;
        }
        else if ($('#nearestSelect').val() === 'Nearest 15!') {
            nearestSelect = 15;
        }
        else if ($('#nearestSelect').val() === 'Nearest 20!') {
            nearestSelect = 20;
        }

        $.ajax({
            url:'https://developers.zomato.com/api/v2.1/search?start=0&count='+ nearestSelect +'&lat='+geoData.currentLatitude+'&lon='+geoData.currentLongitude+ '&sort=real_distance&order=asc',
            //for testing at anson road location

            beforeSend: function(request) {
                request.setRequestHeader("user-key", 'cb619e24ebc6119757f84903365decbd');
            }
        }).then(
            (data)=>{
                restaurantData = [];
                console.log(data);

                shuffle(data.restaurants);

                $('tbody > tr').remove();

                for (let i=0; i<10; i++) {
                    restaurantData.push(data.restaurants[i]);
                    console.log(restaurantData[i].restaurant.name);
                    appendRestaurantNamesIntoTable(restaurantData[i].restaurant);
                };
                console.log(restaurantData);

                $('.slice > path').remove();
                $('.slice > text').remove();
                drawSpinningWheel();

            },

            ()=>{
                console.log('bad');
            }
        );

    });
});

