using System.Collections.Generic;
using System.Threading.Tasks;
using CoreAngular.Core.Models;
using CoreAngular.Models;
using vega.Core.Models;

namespace CoreAngular.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}