﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Models.HubEvents
{
    public record ObjectMoved(Guid ObjectId, Guid LayerId, int NewX, int NewY);

}
