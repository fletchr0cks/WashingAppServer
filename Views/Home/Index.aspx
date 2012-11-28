<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	Front
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PageTitleContent" runat="server">
<h1>uks</h1>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">

       <div id="map_msg" class="ui-bar ui-bar-b"></div>   
		<div id="map_overlay" style="z-index:5000;position:absolute;display:none;background-color:Gray;opacity:0.8;height:300px"><h4 style="text-align:center;padding-top:100px">Loading sites....</h4></div>
		<div id="map_canvas" style="height:300px;"></div>
       <div id="place_name" class="ui-bar ui-bar-b">&nbsp</div> 
       <div id="place_name2" class="ui-bar ui-bar-b" style="display:none"><div style="display:inline" id="comments_ct"></div></div> 
       <div id="place_comments" data-theme="b" ></div>
       <div id="addcomm" class="ui-bar ui-bar-c" style="display:none">
       <div class="ui-grid-a">
	<div class="ui-block-a"><input type="text" name="addcomment" id="addcommentid" value="" /></div>
	<div class="ui-block-b"><a href="index.html#two" data-role="button" data-icon="delete" data-iconpos="left" data-mini="true" data-theme="b" data-inline="true" onclick="SaveComment()">Add Comment</a>
	<a href="index.html#two" data-role="button" data-icon="delete" data-iconpos="left" data-mini="true" data-theme="b" data-inline="true" onclick="HideComments()">Hide Comments</a>
	</div>
	</div>
	</div>
<div data-role="collapsible" data-theme="a" data-inset="true" data-content-theme="a">
		<h4>Hourly Weather<div style="display:inline" id="snowfall"></div></h4>
	<canvas id="canvhere" width="450" height="2000">text here eq no canvas</canvas>
	 </div>

<ul data-role="listview" data-inset="true">
<li><p class="ui-li-aside"><a href="#my_details" data-rel="dialog" data-transition="flip" data-inline="true" data-icon="gear" data-theme="b" data-role="button" data-mini="true">Edit</a></p>
<h3>My Details</h3>
<p>My Location: <span id="loc_here">ssd</span></p>
<p>Phone ID: <span id="uuid"></span></p>
<p>Name: <span id="phone_name"></span></p>
</li>
</ul>

<ul data-role="listview" data-inset="true">
<li><p class="ui-li-aside"></p>
<h2 style="color:#F2EDA2">Status</h2>
<h3 style="color:#B6CEF2">Total sites: nn (nn added in the last 24 hours)</h3>
<h4 style="color:#486B73">Total users: nn</h4>
</li>
</ul>

<h6 id="data_status">Data Connection: </h6>
		<p onclick="nuke()">Nuke</p>
    
</asp:Content>
