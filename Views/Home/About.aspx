<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	Front
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PageTitleContent" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">


	
<div data-role="content" data-theme="a">

<div><h3>Location: <div style="display:inline" id="gps_results"></div></h3></div>
<div data-theme="b" data-role="button" onclick="refreshGPSLocation()">Get position from GPS</div>
<p></p>
<div class="ui-grid-a">
	<div class="ui-block-a"><h5>Or, enter your UK postcode:</h5></label><div id="pc_results"></div></div>
	<div class="ui-block-b" id="pc_search_btn"><input data-theme="c" type="search" name="pc" id="postcode" value=""/><div data-theme="b" id="set_pc" data-role="button" onclick="setPC()"> Search </div></div>
</div>

<p></p>
		<p><a href="/Home/Index" onclick="showmap()" data-theme="b" data-rel="back" data-role="button" data-inline="true" data-icon="back" onclick="closeDetails()" >Close</a></p>	
	</div><!-- /content -->


</asp:Content>
