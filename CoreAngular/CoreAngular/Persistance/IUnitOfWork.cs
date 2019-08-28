using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreAngular.Persistance
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
