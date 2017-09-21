using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DrumMachine.Controllers
{
	public class AjaxController : Controller
	{
		[HttpGet]
		public JsonResult SavedMachines()
		{
			return new JsonResult();
		} 

		[HttpPost]
		public ActionResult Machine(int machineID)
		{
			return Json(new { gridLength = 16 });
		}

		[HttpPost]
		public JsonResult SaveMachine(string name)
		{

			return new JsonResult();
		}


	}
}