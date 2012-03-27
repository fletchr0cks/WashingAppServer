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

        public void savenew(string lat, string lval)
        {

            User user = new User();
            user.Lat = Convert.ToDecimal(lat);
            user.Long = Convert.ToDecimal(lval);
            user.PID = "222fefr";
            //mark.Timestamp = DateTime.Now;
            db.Users.InsertOnSubmit(user);

            db.SubmitChanges();

        }
    }
}
