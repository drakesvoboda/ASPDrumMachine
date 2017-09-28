using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DrumMachine;
using DrumMachine.Helpers;
using Newtonsoft.Json;

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
			using (DataHelper<machine> dataHelper = new DataHelper<machine>())
			{
				machine machine = dataHelper.Get(machineID);

				return Content(JsonConvert.SerializeObject(machine, new JsonSerializerSettings
				{
					ReferenceLoopHandling = ReferenceLoopHandling.Ignore
				}), "application/json");
			}
		}

		[HttpPost]
		public ActionResult SaveMachine(string name, int gridLength, int tempo, int machineID = 0)
		{
			using (DataHelper<machine> dataHelper = new DataHelper<machine>())
			{
				machine dm = new machine()
				{
					id = machineID,
					name = name,
					gridLength = gridLength,
					tempo = tempo
				};

				dm = dataHelper.InsertOrUpdate(dm);

				return Content(JsonConvert.SerializeObject(dm, new JsonSerializerSettings
				{
					ReferenceLoopHandling = ReferenceLoopHandling.Ignore
				}), "application/json");

			}
		}

		[HttpPost]
		public ActionResult CreateMachine(string name, int gridLength, int tempo)
		{
			using (DataHelper<machine> dataHelper = new DataHelper<machine>())
			{
				machine dm = new machine()
				{
					name = name,
					gridLength = gridLength,
					tempo = tempo
				};

				dm = dataHelper.Insert(dm);

				return Json(dm);
			}
		}

		[HttpPost]
		public ActionResult SaveGrid(int machineID, string data)
		{
			List<instrument> insturmentsToSave = JsonConvert.DeserializeObject<List<instrument>>(data);

			using (drummachineEntities db = new drummachineEntities())
			{

				foreach(var item in insturmentsToSave)
				{				
					item.machineID = machineID;

					db.AddOrAttach<sound>(item.sound);
					db.AddOrAttach<instrument>(item);
					
				}

				db.SaveChanges();

				return Content(JsonConvert.SerializeObject(insturmentsToSave, new JsonSerializerSettings
				{
					ReferenceLoopHandling = ReferenceLoopHandling.Ignore
				}), "application/json");
			}
		}
	}
}