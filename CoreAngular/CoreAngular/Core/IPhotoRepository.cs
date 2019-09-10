using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreAngular.Core.Models;

namespace CoreAngular.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}
