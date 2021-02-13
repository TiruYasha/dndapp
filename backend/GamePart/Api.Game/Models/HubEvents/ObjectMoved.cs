using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Models.HubEvents
{
    public class ObjectMoved
    {
        public Guid ObjectId { get; set; }
        public Guid LayerId { get; set; }
        public int NewX { get; set; }
        public int NewY { get; set; }
    }
}
