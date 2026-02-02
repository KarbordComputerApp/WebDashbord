using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebDashbord.Controllers.Unit;

namespace WebDashbord.Controllers.AFI
{
    public class AFISanadController : Controller
    {
        // GET: AFISanad
        public ActionResult Index()
        {
            return View();
        }

        // GET: AFISanad
        public ActionResult AddAdoc()
        {
            ViewBag.apiAddress = UnitPublic.apiAddress;
            return View();
        }

        public ActionResult AddAdoc_New()
        {
            ViewBag.apiAddress = UnitPublic.apiAddress;
            return View();
        }

    }
}