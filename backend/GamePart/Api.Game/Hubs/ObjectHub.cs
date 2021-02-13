using GamePart.Api.Models.HubCommands;
using GamePart.Api.Models.HubEvents;
using GamePart.Api.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Hubs
{
    public partial class GameHub
    {

        public async Task MoveObject(HubCommand<MoveObject> command)
        {
            var playerDetails = _jwtReader.GetPlayerDetails();

            ObjectMoved moved = new ObjectMoved
            {
                NewX = command.Data.NewX,
                NewY = command.Data.NewY,
                ObjectId = command.Data.ObjectId,
                LayerId = command.Data.LayerId
            };

            HubEvent<ObjectMoved> @event = new HubEvent<ObjectMoved>
            {
                Data = moved
            };

            await Clients.Group(playerDetails.GameId.ToString()).SendAsync("ObjectMoved", @event);
        }
    }
}
