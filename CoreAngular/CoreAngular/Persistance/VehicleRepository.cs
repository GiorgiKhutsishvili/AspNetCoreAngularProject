using AspNetCoreAngular.Persistance;
using CoreAngular.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreAngular.Core;
using CoreAngular.Core.Models;

namespace CoreAngular.Persistance
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;

        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(Filter filter)
        {
            var query = context.Vehicles
                .Include(v => v.Model)
                  .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                  .ThenInclude(vf => vf.Feature).AsQueryable();

            if (filter.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == filter.MakeId.Value);

            return await query.ToListAsync();
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
    }
}
