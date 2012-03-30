<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="indexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Home Page
</asp:Content>

<asp:Content ID="indexContent" ContentPlaceHolderID="MainContent" runat="server">
<script language="javascript" type="text/javascript">
   $(document).ready(function() {
   $('#map_canvas').gmap().bind('init', function(event, map) { 
        // This URL won't work on your localhost, so you need to change it
        // see http://en.wikipedia.org/wiki/Same_origin_policy
        $.getJSON('/Home/GetAllUsers', function(data) {
            $.each(data.markers, function(i, marker) {
                $('#map_canvas').gmap('addMarker', {
                    'position': new google.maps.LatLng(marker.latitude, marker.longitude),
                    'bounds': true
                    
                }).click(function() {
                $('#map_canvas').gmap('openInfoWindow', { 'content': '<div class=strong_blue>' + marker.title + '</div><div class=strong_blue_sml>' + marker.content + '</div><div class=strong_blue_sml>' + marker.timestamp + '</div>' }, this);
            });
                
            });
        });
    });
});
</script>


    <h2><%= Html.Encode(ViewData["Message"]) %></h2>
    <p>
        To learn more about ASP.NET MVC visit <a href="http://asp.net/mvc" title="ASP.NET MVC Website">http://asp.net/mvc</a>.
    </p>
    
    <div id="map_canvas" class="map rounded"></div>
    
</asp:Content>
