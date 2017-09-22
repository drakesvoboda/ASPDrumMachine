using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace DrumMachine.Helpers
{
	public static class DbContextExtensions
	{
		public static void AddOrAttach<T>(this DbContext context, T entity)
			where T : class
		{
			#region leave conditions
			if (entity == null) return;

			var entry = context.Entry(entity);

			var leaveStates = new[]
			{
			EntityState.Deleted,
			EntityState.Modified,
			EntityState.Unchanged
		};
			if (leaveStates.Contains(entry.State)) return;
			#endregion

			var entityKey = context.GetEntityKey(entity);
			if (entityKey == null)
			{
				entry.State = EntityState.Modified;
				entityKey = context.GetEntityKey(entity);
			}
			if (entityKey.EntityKeyValues == null
				|| entityKey.EntityKeyValues.Select(ekv => (int)ekv.Value).All(v => v <= 0))
			{
				entry.State = EntityState.Added;
			}
		}

		public static EntityKey GetEntityKey<T>(this DbContext context, T entity)
			where T : class
		{
			var oc = ((IObjectContextAdapter)context).ObjectContext;
			if (null != entity && oc.ObjectStateManager
									.TryGetObjectStateEntry(entity, out ObjectStateEntry ose))
			{
				return ose.EntityKey;
			}
			return null;
		}
	}
}