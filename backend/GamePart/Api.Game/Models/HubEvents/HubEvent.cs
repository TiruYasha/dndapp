using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Models.HubEvents
{
    public class HubEvent<T>
    {
        public T Data { get; set; }
    }
}
