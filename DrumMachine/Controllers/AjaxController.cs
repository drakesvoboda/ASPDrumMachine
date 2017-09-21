using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace DrumMachine.Controllers
{

	public class AjaxController : Controller
	{
		drummachineEntities db = new drummachineEntities();
		[HttpGet]
		public ActionResult SavedMachines()
		{


			return new JsonResult();
		}

		[HttpPost]
		public ActionResult Machine(int machineID)
		{
			using (DrumMachine.Helpers.Data<DrumMachine.machine> DataHelper = new DrumMachine.Helpers.Data<DrumMachine.machine>())
			{
				DrumMachine.machine machine = db.machines.Where(x => x.id == machineID).FirstOrDefault();

				return Json(machine);
			}
		}

		[HttpPost]
		public ActionResult SaveMachine(int machineID, string name, int gridLength, int tempo)
		{
			using (DrumMachine.Helpers.Data<DrumMachine.machine> DataHelper = new DrumMachine.Helpers.Data<DrumMachine.machine>())
			{
				DrumMachine.machine machine = db.machines.SingleOrDefault(x => x.id == machineID);
				if (machine == null)
				{
					return CreateMachine(name, gridLength, tempo);
				}
				else
				{
					machine.gridLength = gridLength;
					machine.name = name;
					machine.tempo = tempo;
				}

				db.SaveChanges();

				return Json(machine);
			}
		}

		[HttpPost]
		public ActionResult CreateMachine(string name, int gridLength, int tempo)
		{

			var machine = new DrumMachine.machine()
			{
				name = name,
				gridLength = gridLength,
				tempo = tempo
			};

			db.machines.Add(machine);
			db.SaveChanges();

			return Json(machine);
		}

		[HttpPost]
		public ActionResult SaveGrid(IDictionary<string, object> model)
		{
			DrumMachine.instrument instrument = db.instruments.Where(x => x.id == 0).FirstOrDefault();
			if (instrument == null)
			{

			}
			else
			{
			}



			return Json(instrument);
		}

	}
}