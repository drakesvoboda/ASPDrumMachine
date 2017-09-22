using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DrumMachine;


namespace DrumMachine.Controllers
{

	public class AjaxController : Controller
	{
		[HttpPost]
		public ActionResult SavedMachines()
		{
			using (drummachineEntities db = new drummachineEntities())
			{
				var result = db.machines.Select(x => new { x.id, x.name });
				return Json(result);
			}
		}

		[HttpPost]
		public ActionResult Machine(int machineID)
		{
			using (Helpers.Data<machine> DataHelper = new Helpers.Data<machine>())
			{
				machine machine = DataHelper.Get(machineID);

				return Json(machine);
			}
		}

		[HttpPost]
		public ActionResult SaveMachine(string name, int gridLength, int tempo, int machineID = 0)
		{
			using (Helpers.Data<machine> DataHelper = new Helpers.Data<machine>())
			{
				machine dm = new machine()
				{
					id = machineID,
					name = name,
					gridLength = gridLength,
					tempo = tempo
				};

				dm = DataHelper.InsertOrUpdate(dm);

				return Json(dm);
			}
		}

		[HttpPost]
		public ActionResult CreateMachine(string name, int gridLength, int tempo)
		{
			using (Helpers.Data<machine> DataHelper = new Helpers.Data<machine>())
			{
				machine dm = new machine()
				{
					name = name,
					gridLength = gridLength,
					tempo = tempo
				};

				dm = DataHelper.Insert(dm);

				return Json(dm);
			}			
		}

		[HttpPost]
		public ActionResult SaveGrid(IDictionary<string, object> model)
		{

			return Json("");
		}

	}
}