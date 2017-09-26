using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DrumMachine.Models;


namespace DrumMachine.Helpers
{
	public class FileHelper
	{

		public FileUploadResponse UploadFile(HttpPostedFileBase file, bool overwite = false)
		{

			try
			{

			}
			catch (Exception e)
			{
				return new FileUploadResponse() { ErrorMessage = e.Message };
			}

			return new FileUploadResponse() { };
		}
	}
}