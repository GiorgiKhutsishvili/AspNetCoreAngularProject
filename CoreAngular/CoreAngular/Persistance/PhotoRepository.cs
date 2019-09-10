using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreAngular.Persistance;
using CoreAngular.Core;
using CoreAngular.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreAngular.Persistance
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;

        public PhotoRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await
                context.Photos.Where(x => x.VehicleId == vehicleId).ToListAsync();
        }
    }
}
