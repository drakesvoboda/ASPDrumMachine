using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Objects;

namespace DrumMachine.Helpers
{
	public class Data<T> : IDisposable where T : class
	{
		public T InsertOrUpdate(T entity)
		{
			db.AddOrAttach<T>(entity);
			db.SaveChanges();
			return entity;
		}

		public T Insert(T entity)
		{
			db.Set<T>().Add(entity);
			db.SaveChanges();

			return entity;
		}

		public T Update(T entity, int key)
		{
			if (entity == null)
				return null;

			T existing = db.Set<T>().Find(key);

			if (existing != null)
			{
				db.Entry(existing).CurrentValues.SetValues(entity);
				db.SaveChanges();
			}

			return existing;

		}

		public T Get(int key)
		{
			return db.Set<T>().Find(key);
		}

		public void Dispose()
		{
			db.Dispose();
		}

		public drummachineEntities db = new drummachineEntities();
	}
}