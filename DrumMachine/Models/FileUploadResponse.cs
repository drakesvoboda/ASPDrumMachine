using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DrumMachine.Models
{
	public class FileUploadResponse
	{
		public string FileUrl { get; set; }
		public string ErrorMessage { get; set; }
	}
}