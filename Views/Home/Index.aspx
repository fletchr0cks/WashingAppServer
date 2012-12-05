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

		

</asp:Content>
