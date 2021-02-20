using GamePart.Api.Models.HubCommands;
using GamePart.Api.Models.HubEvents;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GamePart.Api.Hubs
{
    public partial class GameHub
    {
        public async Task MoveObject(HubCommand<MoveObject> command)
        {
            ObjectMoved moved = new ObjectMoved(command.Data.ObjectId, command.Data.LayerId, command.Data.NewX, command.Data.NewY);

            var @event = new HubEvent<ObjectMoved>(moved);

            await Clients.Group(command.Data.PlaygroundId.ToString()).SendAsync("ObjectMoved", @event);
        }
    }
}
