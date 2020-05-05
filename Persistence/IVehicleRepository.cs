using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public interface IVehicleRepository
    {
         public Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         public void Add(Vehicle vehicle);
         public void Remove(Vehicle vehicle);
    }
}