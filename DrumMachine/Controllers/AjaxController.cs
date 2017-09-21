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

		[HttpGet]
		public JsonResult Machine(int machineID)
		{
			
			return new JsonResult();
		}

		[HttpPost]
		public JsonResult Machine(string name)
		{

			return new JsonResult();
		}


	}
}