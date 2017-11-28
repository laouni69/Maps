var map;

$(document).ready(function(){
  initialize();
  addMarker();
})

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(0,0),
    zoom:1,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
   map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function addMarker(){
  $('form').submit(function(){
    var myLatLng = new google.maps.LatLng(getLatitude(),getLongitude());
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: getMessage(),
    });
    setInfoWindow(marker);
    map.panTo( marker.getPosition() );
    return false;
  });
}


function getLatitude(){
  var latitude = parseInt($('input[name="latitude"]').val(),10);
  return restrict(latitude,85)|| 0;
}

function getLongitude(){
  var longitude = parseInt($('input[name="longitude"]').val(),10);
  return  longitude || 0;
}

function getMessage(){
  return  $('input[name="message"]').val();
}


function setInfoWindow(marker){
  var infoWindow = new google.maps.InfoWindow({
    content: marker.title
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
  });
}

function restrict(x,max){
  if (x>max)
    return max;
  if (x<-max)
    return -max
  return x;
}