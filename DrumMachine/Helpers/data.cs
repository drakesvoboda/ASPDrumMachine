using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Data.Entity;

namespace DrumMachine.Helpers
{
	public class Data<T> : IDisposable where T : class
	{
		public Data()
		{
			var type = typeof(drummachineEntities);
			foreach (PropertyInfo field in db.GetType().GetProperties(System.Reflection.BindingFlags.Public
	| System.Reflection.BindingFlags.Instance
	| System.Reflection.BindingFlags.DeclaredOnly))
			{
				System.Diagnostics.Debug.WriteLine(field.Name);
				System.Diagnostics.Debug.WriteLine(field.GetType());

				if (field.PropertyType.GenericTypeArguments.Contains(typeof(T)))
				{
					System.Diagnostics.Debug.WriteLine(field.PropertyType.GenericTypeArguments[0].Name);
				}
			}
		}

		public void InsertOrUpdate(T model)
		{

		}

		public void Insert(T model) { }

		public void Update(T model)
		{

		}

		public void Get(int id)
		{

		}

		public void Dispose()
		{
			db.Dispose();
		}

		public drummachineEntities db = new drummachineEntities();
		public DbSet<T> dbSet;
	}
}