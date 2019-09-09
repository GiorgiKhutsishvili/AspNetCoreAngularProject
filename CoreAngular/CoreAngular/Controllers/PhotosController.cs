﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CoreAngular.Core;
using CoreAngular.Core.Models;
using CoreAngular.Resources;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CoreAngular.Controllers
{
    [Route("api/vehicles/{vehicleId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
       
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;

        public PhotosController(IHostingEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            this.host = host;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.photoSettings = options.Value;
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            if (file == null)
                return BadRequest("null file");

            if (file.Length == 0)
                return BadRequest("Empty file");

            if (file.Length > photoSettings.MaxBytes)
                return BadRequest("Max file size is exceeded");

            if (!photoSettings.IsSupported(file.FileName))
                return BadRequest("Invalid File Type");


            var uploadsFolderPath = Path.Combine(host.WebRootPath, "Uploads");

            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo
            {
                FileName = fileName
            };

            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}