using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Mvc.Ajax;
using HIO.Models;
using System.IO;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;
using System.Xml.Serialization;

namespace HIO.Controllers
{
    [HandleError]
    public class HomeController : Controller
    {

        DataRepository dataRepository = new DataRepository();
        private hioDataContext db = new hioDataContext();


        public ActionResult Index()
        {
            ViewData["Message"] = "Welcome to ASP.NET MVC!";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Save(string lat, string lval, string city, string country, string comment)
        {
            var dataContext = new hioDataContext();

            ViewData["Message"] = lat + "  " + lval;

            dataRepository.savenew(lat, lval, city, country, comment);

            return View();

        }

        [AcceptVerbs(HttpVerbs.Get)]
        public JsonResult GetAllUsers()
        {
            var dataContext = new hioDataContext();

            var data = from ev in dataContext.Users
                       orderby ev.UserID descending
                       select new
                       {
                           latitude = ev.Lat,
                           longitude = ev.Long,
                           title = ev.Comment,
                           content = ev.City,
                           timestamp = Convert.ToString(ev.Timestamp)

                       };
            //new { gloss_list = GlossaryList, answer = desc }
            return Json(new { markers = data.Distinct() });
        }
        
        public JsonResult GetAllUsersPlain()
        {
            var dataContext = new hioDataContext();

            var data = from ev in dataContext.Users
                       orderby ev.UserID descending
                       select new
                       {
                           latitude = ev.Lat,
                           longitude = ev.Long,
                           title = ev.Comment,
                           content = ev.City,
                           timestamp = Convert.ToString(ev.Timestamp)

                       };
            //new { gloss_list = GlossaryList, answer = desc }
            return Json(new { markers = data.Distinct() });
        }
        
        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult GetAllUsersPost()
        {
            var dataContext = new hioDataContext();

            var data = from ev in dataContext.Users
                       orderby ev.UserID descending
                       select new
                       {
                           latitude = ev.Lat,
                           longitude = ev.Long,
                           title = ev.Comment,
                           content = ev.City,
                           timestamp = Convert.ToString(ev.Timestamp)

                       };
            //new { gloss_list = GlossaryList, answer = desc }
            return Json(new { markers = data.Distinct() });
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllUsersNew()
        {
            var dataContext = new hioDataContext();

            var data = from ev in dataContext.Users
                       orderby ev.UserID descending
                       select new
                       {
                           latitude = ev.Lat,
                           longitude = ev.Long,
                           title = ev.Comment,
                           content = ev.City,
                           timestamp = Convert.ToString(ev.Timestamp)

                       };

         
            //new { gloss_list = GlossaryList, answer = desc }
            return new JsonpResult(data.Distinct());
        }

 
    }
}
