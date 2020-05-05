using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public interface IVehicleRepository
    {
         public Task<Vehicle> GetVehicle(int id);
    }
}