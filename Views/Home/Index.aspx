<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	UK Sledge
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PageTitleContent" runat="server">
<div style="text-align:center;padding-top:5px"><img  src="../../Content/headerlogo.png" /></div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
  <script type="text/javascript">
      $(document).bind("pageinit", function() {
          $(function() {
              FTLcheck();
          });
      });
    </script>
       <div id="map_msg" class="ui-bar ui-bar-b"></div>   
		<div id="map_overlay" style="z-index:5000;position:absolute;display:none;background-color:Gray;opacity:0.8;height:300px"><h4 style="text-align:center;padding-top:100px">Loading sites....</h4></div>
		<div id="map_canvas" style="height:300px;"></div>
       <div id="place_name" class="ui-bar ui-bar-b">&nbsp</div> 
       <div id="place_name2" class="ui-bar ui-bar-b" style="display:none"><div style="display:inline" id="comments_ct"></div></div> 
       <div id="place_comments" data-theme="b" ></div>
       
<div data-role="collapsible" data-theme="a" data-inset="true" data-content-theme="a">
		<h4>Hourly Weather<div style="display:inline" id="snowfall"></div></h4>
	<canvas id="canvhere" width="450" height="2000">text here eq no canvas</canvas>
	 </div>

<ul data-role="listview" data-inset="true">
<li><p class="ui-li-aside"><a href="/Home/About" data-rel="page" data-transition="flip" data-inline="true" data-icon="gear" data-theme="b" data-role="button" data-mini="true">Edit</a></p>
<h3>My Details</h3>
<p>&nbsp;</p>
<p>My Location: <span id="loc_here">ssd</span></p>
</li>
</ul>


<ul data-role="listview" id="status" data-inset="true">
<li><p class="ui-li-aside"><a href="#" data-role="button" data-inline="true" data-icon="gear" data-theme="b" data-role="button" data-mini="true" onclick="load_data_db()">Refresh</a></p>
<h3>Status</h3>
<div id="statustxt"><p>Total sites: <span id="total_sites"></span></p>
<p>Latest site added by <span id="lat_nm"></span> in <span id="lat_tn"></span></p></div>
</li>
</ul>

<a class="twitter-timeline" href="https://twitter.com/uksledge" data-widget-id="273815461060284417">Tweets by @uksledge</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<h6 id="data_status">Data Connection: </h6>
		<p onclick="nuke()">Nuke</p>
		
		
	

</asp:Content>
