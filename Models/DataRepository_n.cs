using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using HIO.Models;
using System.IO;

namespace HIO.Models
{
    public class DataRepository
    {

        private hioDataContext db = new hioDataContext();

        public void savenew(string lat, string lval, string city, string country, string comment)
        {

            User user = new User();
            user.Lat = Convert.ToDecimal(lat);
            user.Long = Convert.ToDecimal(lval);
            user.PID = "222fe9";
            user.City = city;
            user.Country = country;
            user.Comment = comment;
            user.Timestamp = DateTime.Now;
            db.Users.InsertOnSubmit(user);

            db.SubmitChanges();

        }
        
        public void updateUser(int userID)
        {

            var user = db.Users
                .Where(u => u.UserID == userID)
                .First();

            user.Timestamp = DateTime.Now;
            db.SubmitChanges();

        }

        public void updatePhonename(int userID, string phonename)
        {

            var user = db.Users
                .Where(u => u.UserID == userID)
                .First();

            user.Comment = phonename;
            db.SubmitChanges();

        }

        public string SiteCount(int userID)
        {

            int sitecount = db.places
                .Where(u => u.UserID == userID)
                .Count();

            return Convert.ToString(sitecount);
        }

        public void AddLogin(int userID, string type)
        {
            hio_event newevent = new hio_event();
            newevent.UserID = userID;
            newevent.Event = type;
            newevent.Datetime = DateTime.Now;
            db.hio_events.InsertOnSubmit(newevent);
            db.SubmitChanges();
        }

        public void APIcall(int userID)
        {
            hio_event newevent = new hio_event();
            newevent.UserID = userID;
            newevent.Event = "API";
            newevent.Datetime = DateTime.Now;
            db.hio_events.InsertOnSubmit(newevent);
            db.SubmitChanges();
        }

        public void UserLoc(int userID, string latval, string longval)
        {
            user_location newloc = new user_location();
            newloc.UserID = userID;
            newloc.LatVal = Convert.ToDecimal(latval);
            newloc.LongVal = Convert.ToDecimal(longval);
            db.user_locations.InsertOnSubmit(newloc);
            db.SubmitChanges();
        }



        public int AddUser(User user)
        {
            db.Users.InsertOnSubmit(user);
            db.SubmitChanges();
            return user.UserID;
        }

        public void AddComment(comment comment)
        {
            db.comments.InsertOnSubmit(comment);
            
        }

        public int AddPlace(place place)
        {
            db.places.InsertOnSubmit(place);
            db.SubmitChanges();
            return place.PID;
        }

        public void Add(hio_event ev)
        {
            db.hio_events.InsertOnSubmit(ev);
        }

        public void Add(user_location loc)
        {
            db.user_locations.InsertOnSubmit(loc);
        }
    }
}
