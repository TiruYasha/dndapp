using GamePart.Api.Commands.Hub;
using GamePart.Api.Models.HubCommands;
using System.Threading.Tasks;

namespace GamePart.Api.Hubs
{
    public partial class GameHub
    {

        public async Task ConnectToPlayground(HubCommand<ConnectToPlayground> command)
        {
            if (command.Data.oldPlaygroundId.HasValue)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, command.Data.oldPlaygroundId.Value.ToString());
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, command.Data.playgroundId.ToString());

            await base.OnConnectedAsync();
        }
    }
}
