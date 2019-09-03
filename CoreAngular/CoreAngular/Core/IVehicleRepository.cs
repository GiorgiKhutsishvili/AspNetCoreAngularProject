using System.Collections.Generic;
using System.Threading.Tasks;
using CoreAngular.Core.Models;
using CoreAngular.Models;

namespace CoreAngular.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);

        Task<IEnumerable<Vehicle>> GetVehicles(Filter filter);

        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}