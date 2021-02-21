using GamePart.Api.Commands.Hub;
using GamePart.Api.Events;
using GamePart.Api.Models.HubCommands;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace GamePart.Api.Hubs
{
    public partial class GameHub
    {
        public async Task ConnectToPlayground(HubCommand<ConnectToPlayground> command)
        {
            var playground = await _playgroundReader.GetPlaygroundById(command.Data.PlaygroundId);

            if (command.Data.OldPlaygroundId.HasValue)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, command.Data.OldPlaygroundId.Value.ToString());
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, command.Data.PlaygroundId.ToString());

            var @event = new HubEvent<PlaygroundChanged>(new PlaygroundChanged(playground));
            await Clients.Client(Context.ConnectionId).SendAsync("PlaygroundChanged", @event);
        }
    }
}
