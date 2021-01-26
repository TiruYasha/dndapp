using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Models.HubCommands
{
    public class MoveObjectCommand
    {
        public Guid ObjectId { get; set; }
        public int NewX { get; set; }
        public int NewY { get; set; }
    }
}
