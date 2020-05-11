using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
         public Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         public void Add(Vehicle vehicle);
         public void Remove(Vehicle vehicle);
         public Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}