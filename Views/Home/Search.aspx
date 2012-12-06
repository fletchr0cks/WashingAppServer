<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	Front
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PageTitleContent" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">


	
<div data-role="content" data-theme="a">

	<div data-role="header">
	<a href="/Home/Index"  onclick="showmap()" data-direction="reverse" data-icon="arrow-l" data-theme="b">Menu</a>		
	<h1>Search</h1>
	</div><!-- /header -->

	<div data-role="content" data-theme="c">
  <div class="ui-grid-a">
	<div class="ui-block-a"><input type="text" name="search" id="searchid" value="" /></div>
	<div class="ui-block-b"><div data-role="button" data-icon="search" data-iconpos="left" data-mini="true" data-theme="b" data-inline="true" onclick="doSearch()">Search</div></div>
	</div>
	 <div id="sites_search_msg" class="ui-bar ui-bar-b" style="display:none"></div>   
       <div id="sites_search_list"></div>
		</div>
		
		


</asp:Content>
